import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/profile.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });
  const [changePasswordSection, setChangePasswordSection] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async ({ oldPassword, newPassword }) => {
    try {
      const response = await fetch("api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          oldPassword,
          newPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setChangePasswordSection(false);
        reset();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  if (status === "loading") {
    return <Layout>Loading...;</Layout>;
  }

  return (
    <Layout>
      <h1>{session.user.name}</h1>
      <div className={styles.container}>
        <p className={styles.personalTitle}>Personal Information</p>
        <div className={styles.personalInformationContainer}>
          <div className={styles.nameContainer}>
            <p className={styles.sectionTitle}>Name</p>
            <p className={styles.userDetails}>{session.user.name}</p>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.emailContainer}>
            <p className={styles.sectionTitle}>Email</p>
            <p className={styles.userDetails}>{session.user.email}</p>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.passwordContainer}>
            <p className={styles.sectionTitle}>Password</p>
            {changePasswordSection ? (
              <div>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className={styles.passwordContainer}>
                    <label htmlFor="oldPassword">Old Password</label>
                    <div>
                      <input
                        className={styles.passwordForm}
                        type="password"
                        {...register("oldPassword", {
                          required: "Please enter your old password",
                        })}
                        id="oldPassword"
                      />
                    </div>
                  </div>
                  <div className={styles.passwordContainer}>
                    <label htmlFor="newPassword">New Password</label>
                    <div>
                      <input
                        className={styles.passwordForm}
                        type="password"
                        {...register("newPassword", {
                          required: "Please enter your new password",
                          validate: value => value != getValues("oldPassword"),
                          minLength: {
                            value: 8,
                            message:
                              "Password must be 8 or more characters long",
                          },
                        })}
                        id="newPassword"
                      />
                    </div>
                    {errors.newPassword && (
                      <span className={styles.missingMessage}>
                        {errors.newPassword.message}
                        {errors.newPassword &&
                          errors.newPassword.type === "validate" && (
                            <div>New password can not match old password</div>
                          )}
                      </span>
                    )}
                  </div>
                  <div className={styles.passwordContainer}>
                    <label htmlFor="confirmPassword">
                      Confirm Password &nbsp;
                    </label>
                    <div>
                      <input
                        className={styles.passwordForm}
                        type="password"
                        {...register("confirmPassword", {
                          required: "Please enter a confirmed password.",
                          validate: value => value === getValues("newPassword"),
                          minLength: {
                            value: 8,
                          },
                        })}
                      />
                    </div>

                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "validate" && (
                        <div>Passwords do not match</div>
                      )}
                  </div>
                  <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveButton}>
                      Save
                    </button>
                    <button
                      className={styles.cancelButton}
                      type="button"
                      onClick={() => {
                        setChangePasswordSection(false);
                        reset();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className={styles.passwordStarsContainer}>
                <p className={styles.passwordStars}>******</p>
                <div className={styles.passwordUpdateButtonContainer}>
                  <button
                    className={styles.passwordUpdateButton}
                    onClick={() => setChangePasswordSection(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

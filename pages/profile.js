import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/profile.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  } = useForm();

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
                <form onSubmit={handleSubmit(data => console.log(data))}>
                  <div>
                    <label htmlFor="oldPassword">Old password &nbsp;</label>
                    <div>
                      <input
                        type="password"
                        {...register("oldPassword", {
                          required: "Please enter your old password",
                        })}
                        id="oldPassword"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="newPassword">New password &nbsp;</label>
                    <div>
                      <input
                        type="password"
                        {...register("newPassword", {
                          required: "Please enter your new password",
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
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword">
                      Confirm Password &nbsp;
                    </label>
                    <div>
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "Please enter a confirmed password.",
                          validate: value => value === getValues("password"),
                          minLength: {
                            value: 8,
                          },
                        })}
                        id="confirmPassword"
                      />
                    </div>

                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "validate" && (
                        <div>Password do not match</div>
                      )}
                  </div>
                  <div>
                    <button>Save</button>
                  </div>
                </form>
                <button onClick={() => setChangePasswordSection(false)}>
                  Cancel
                </button>
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

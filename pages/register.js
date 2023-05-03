import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "styles/signin.module.css";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout pageTitle="Sign In">
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>Sign Up</h1>
        <div className={styles.inputSections}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Please enter full name",
              pattern: /^[A-Za-z]+$/i,
            })}
            className={styles.inputBox}
            id="name"
            autoFocus
          />
          {errors.name && (
            <span className={styles.missingMessage}>{errors.name.message}</span>
          )}
        </div>
        <div className={styles.inputSections}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter a valid email",
              },
            })}
            className={styles.inputBox}
            id="email"
          />
          {errors.email && (
            <span className={styles.missingMessage}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles.inputSections}>
          <label htmlFor="password">Password &nbsp;</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 8,
                message: "Password must be 8 or more characters long",
              },
            })}
            id="password"
          />
          {errors.password && (
            <span className={styles.missingMessage}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={styles.inputSections}>
          <label htmlFor="confirmPassword">Confirm Password &nbsp;</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please enter confirmPassword",
              validate: value => value === getValues("password"),
              minLength: {
                value: 8,
              },
            })}
            id="confirmPassword"
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <div className={styles.missingMessage}>Password do not match</div>
            )}
        </div>
        <div>
          <button className={styles.signInButton}>Sign Up</button>
        </div>
      </form>
    </Layout>
  );
}

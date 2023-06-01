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
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout pageTitle="Sign in">
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.detailContainer}>
          <div className={styles.nameInputSection}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.formInput}
              type="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter a valid email",
                },
              })}
              id="email"
              autoFocus
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
              className={styles.formInput}
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
          <div>
            <button className={styles.signInButton}>Login</button>
          </div>
          <div className={styles.inputSections}>
            don&apos;t have an account? &nbsp;
            <Link className={styles.register} href="register">
              Register
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
}

import Layout from "@/components/layout";
import Link from "next/link";
import styles from "styles/login.module.css";
import { useForm } from "react-hook-form";

export default function SignInPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout pageTitle="Sign In">
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputSections}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className={styles.inputBox}
            id="email"
            autoFocus
          />
          {errors.email && (
            <span className={styles.emailMissingMessage}>
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
            autoFocus
          />
          {errors.password && (
            <span className={styles.emailMissingMessage}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
          <button className={styles.signInButton}>Login</button>
        </div>
        <div className={styles.inputSections}>
          dont&apos;t have an account? &nbsp;
          <Link href="register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}

import Layout from "@/components/layout";
import Link from "next/link";
import styles from "styles/login.module.css";

export default function SignInPage() {
  return (
    <Layout pageTitle="Sign In">
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputSections}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" autoFocus />
        </div>
        <div className={styles.inputSections}>
          <label htmlFor="password">Password &nbsp;</label>
          <input type="password" id="password" autoFocus />
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

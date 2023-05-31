import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/profile.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [changePasswordSection, setChangePasswordSection] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
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
                <div>form</div>
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

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Profile({ user }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
  }
  return (
    <Layout>
      <h1>{session.user.name}</h1>
      <div>
        <h3>Personal Information</h3>
        <div>
          <div>
            <p>Name</p>
            <p>{session.user.name}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{session.user.email}</p>
          </div>
          <div>
            <button>Update</button>
          </div>
          <div>
            <p>Password</p>
            <p>******</p>
          </div>
          <div>
            <button>Update</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

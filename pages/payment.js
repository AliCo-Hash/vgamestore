import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Payment() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Layout>Loading...</Layout>;
  }

  if (!session) {
    router.push("/signin");
  }

  return <Layout pageTitle="Payment">Payment Page</Layout>;
}

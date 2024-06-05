// Dashboard.js
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Account from "../components/Account";
import Products from "../components/Products";
import { useSession, getSession } from "next-auth/react";
import LoginForm from "./LoginForm";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { tab } = router.query;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <LoginForm />;
  }

  let content;
  switch (tab) {
    case "account":
      content = <Account />;
      break;
    case "products":
      content = <Products />;
      break;
    case "home":
    default:
      content = <Home />;
  }

  return <Layout>{content}</Layout>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/LoginForm",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

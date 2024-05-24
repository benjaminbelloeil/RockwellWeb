// Dashboard.js
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Home from "../components/Home";
import Account from "../components/Account";
import Products from "../components/Products";

export default function Dashboard() {
  const router = useRouter();
  const { tab } = router.query;

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

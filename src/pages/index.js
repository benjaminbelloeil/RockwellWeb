// index.js
import { getSession } from "next-auth/react";

export default function Home() {
  return null;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/Dashboard",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/LoginForm",
      permanent: false,
    },
  };
}

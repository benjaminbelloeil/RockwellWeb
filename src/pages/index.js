import { useSession, getSession } from "next-auth/react";
import LoginForm from './LoginForm';
import Layout from "../components/Layout";


export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      {session ? User({ session }) : Guest()}
    </div>
  );
}

function Guest() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

function User({ session }) {
  return (
    <Layout>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>
      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
        <div className="rounded bg-white h-40 shadow-sm"></div>
      </div>
      <div className="grid col-1 bg-white h-96 shadow-sm"></div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

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

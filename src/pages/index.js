import { useSession, getSession } from "next-auth/react";
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      {session ? <User session={session} /> : <Guest />}
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
  return <Dashboard session={session}/>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/LoginForm", // Redirect to login form if not authenticated
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

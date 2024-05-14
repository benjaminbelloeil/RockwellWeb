import { Inter } from "next/font/google";
import MainForm from './MainForm';
import LoginForm from './LoginForm';
//import Token from './Token';



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    
  <home>
    <div className="flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <MainForm />
    </div>
  </home>
  );
}

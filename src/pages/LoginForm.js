import Image from 'next/image';
import { FaLinkedin, FaGithub, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "../../lib/validate.js";
import { useRouter } from 'next/router'; // Import useRouter

export default function LoginForm() {
  const router = useRouter(); // Initialize useRouter

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          router.push('/Dashboard');
        } else {
          const data = await response.json();
          console.error(data);
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.'); 
      }
    },
    validate: login_validate,
  });

  const handleGoogleSignin = () => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  const handleGithubSignin = () => {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <Image src="/RockwellLogo.svg" alt="Logo" width={150} height={100} />
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Access your Account</h2>
              <div className="border-2 w-10 border-red-600 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <button onClick={handleGithubSignin} className="border-2 border-gray-300 rounded-full p-3 mx-1 hover:scale-110">
                  <FaGithub className="text-sm" />
                </button>
                <button onClick={handleGoogleSignin} className="border-2 border-gray-300 rounded-full p-3 mx-1 hover:scale-110">
                  <FaGoogle className="text-sm" />
                </button>
              </div>
              <p className="text-gray-400 text-sm my-3">or use your email instead</p>
              <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex flex-col mb-3 rounded-lg">
                  <div className="flex items-center">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input {...formik.getFieldProps('email')} type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                    <span className="bg-red-100 text-red-600 text-xs p-2 rounded-md mt-1">{formik.errors.email}</span>
                  ) : null}
                </div>
                
                <div className="bg-gray-100 w-64 p-2 flex flex-col mb-3 rounded-lg">
                  <div className="flex items-center">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input {...formik.getFieldProps('password')} type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <span className="bg-red-100 text-red-600 text-xs p-2 rounded-md mt-1">{formik.errors.password}</span>
                  ) : null}
                </div>
                
                <div className="flex justify-between w-64 mb-5">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    Remember Me
                  </label>
                  <a href="#" className="text-xs ml-auto">Forgot Password?</a>
                </div>
                <button type="submit" className="border-red-600 text-red-600 border-2 px-12 py-2 rounded-full inline-block font-semibold hover:scale-110">Log In</button>
              </form>
            </div>
          </div>
          <div className="w-2/5 bg-red-600 text-white rounded-tr-2xl rounded-br-2xl py-40 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome, User!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-5"><b>Don't have an account?</b> Sign Up for personalized access to our services.</p>
            <Link href="/SignupForm">
              <p className="border-white border-2 px-12 py-2 rounded-full inline-block font-semibold hover:scale-110">Sign Up</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

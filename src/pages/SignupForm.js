// SignupForm.js
import Image from 'next/image';
import Link from 'next/link';
import { FaLock, FaRegEnvelope, FaUser, FaGithub, FaGoogle } from 'react-icons/fa';
import { useFormik } from 'formik';
import signup_validate from "../../lib/validate.js";

export default function SignupForm() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cPassword: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const data = await response.json();
        console.log(data); // Log response from the server
        window.location.href = '/LoginForm'; // Redirect to login form after successful signup
      } catch (error) {
        alert(error.message); // Display error message
      }
    },
    validate: signup_validate,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Sign-up Section */}
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <Image src="/RockwellLogo.svg" alt="Logo" width={150} height={100} />
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Welcome to Rockwell!</h2>
              <div className="border-2 w-10 border-red-600 inline-block mb-2"></div>
              <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex flex-col mb-3 rounded-lg">
                  <div className="flex items-center">
                    <FaUser className="text-gray-400 m-2" />
                    <input {...formik.getFieldProps('username')} type="text" name="username" placeholder="Username" className="bg-gray-100 outline-none text-sm flex-1" />
                  </div>
                  {formik.errors.username && formik.touched.username ? (
                    <span className="bg-red-100 text-red-600 text-xs p-2 rounded-md mt-1">{formik.errors.username}</span>
                  ) : null}
                </div>
                
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
                    <FaLock className="text-gray-400 m-2" />
                    <input {...formik.getFieldProps('password')} type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <span className="bg-red-100 text-red-600 text-xs p-2 rounded-md mt-1">{formik.errors.password}</span>
                  ) : null}
                </div>
                
                <div className="bg-gray-100 w-64 p-2 flex flex-col mb-3 rounded-lg">
                  <div className="flex items-center">
                    <FaLock className="text-gray-400 m-2" />
                    <input {...formik.getFieldProps('cPassword')} type="password" name="cPassword" placeholder="Confirm Password" className="bg-gray-100 outline-none text-sm flex-1" />
                  </div>
                  {formik.errors.cPassword && formik.touched.cPassword ? (
                    <span className="bg-red-100 text-red-600 text-xs p-2 rounded-md mt-1">{formik.errors.cPassword}</span>
                  ) : null}
                </div>
              
                <button type="submit" className="border-red-600 text-red-600 border-2 px-14 py-2 rounded-full inline-block font-semibold hover:scale-110 transition-transform duration-300">Sign Up</button>
                  
              </form>
            </div>
          </div>
          {/* Right Side Section */}
          <div className="w-2/5 bg-red-600 text-white rounded-tr-2xl rounded-br-2xl py-40 px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-2">Welcome, User!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-5"><b>Already have an account?</b> Login for personalized access to your profile.</p>
            <Link href="/LoginForm">
              <p className="border-white border-2 px-12 py-2 rounded-full inline-block font-semibold hover:scale-110 transition-transform duration-300">Log In</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

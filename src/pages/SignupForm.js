import Image from 'next/image';
import Link from 'next/link';
import {FaLock,  FaDiscord, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa';

export default function SignupForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-full p-5">
            <div className="text-left font-bold">
                  <Image src="/RockwellLogo.svg" alt="Logo" width={150} height={100} />
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-red-600 mb-2">Wecome to Rockwell !</h2>
              <div className="border-2 w-10 border-red-600 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1 hover:scale-110">
                  <FaDiscord className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1 hover:scale-110">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-300 rounded-full p-3 mx-1 hover:scale-110">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2"/>
                  <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none text-sm flex-1" />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaLock className="text-gray-400 m-2"/>
                  <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none text-sm flex-1" />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaLock className="text-gray-400 m-2"/>
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" className="bg-gray-100 outline-none text-sm flex-1" />
                </div>
                <a href="#" className="border-red-600 text-red-600 border-2 px-14 py-2 rounded-full inline-block font-semibold hover:scale-110">Sign Up</a>
                <Link href="/MainForm">
                  <p className="bg-red-600 text-white border-2 border-red-600 px-16 py-2 rounded-full inline-block font-semibold mt-3 hover:scale-110">Back</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

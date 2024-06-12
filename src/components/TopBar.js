import { Fragment, useEffect, useState } from "react";
import { Bars3CenterLeftIcon, ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function TopBar({ showNav, setShowNav }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/getUserInfo');
        const data = await response.json();
        if (data.user) {
          setUsername(data.user.username);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  function handleSignOut() {
    signOut({ callbackUrl: "/LoginForm" });
  }

  return (
    <div className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${showNav ? "pl-56" : ""} bg-white backdrop-filter backdrop-blur-md bg-opacity-70 z-10`}>
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon className="h-8 w-8 text-gray-700 cursor-pointer" onClick={() => setShowNav(!showNav)} />
      </div>
      <div className="flex-1 px-4 md:px-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:bg-white focus:shadow-md"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a6 6 0 105.292 3.708l3.571 3.572a1 1 0 01-1.414 1.414l-3.572-3.571A6 6 0 008 4zM2 8a6 6 0 1110.581 4.002L16.992 18l-.003.003a1 1 0 01-1.415-1.415l.003-.003-4.41-4.41A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <UserCircleIcon className="h-8 w-8 text-gray-700" />
              <span className="hidden md:block font-medium text-gray-700 ml-2">{username}</span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition duration-75 ease-in"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link href="/Dashboard?tab=account" className="flex hover:bg-gray-100 text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a4 4 0 118 0 4 4 0 01-8 0zM2 10a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z" clipRule="evenodd" />
                    </svg>
                    View Profile
                  </Link>
                </Menu.Item>
                {session?.user.isAdmin && (
                  <Menu.Item>
                    <Link href="/Dashboard?tab=admin" className="flex hover:bg-gray-100 text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                      <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v4a1 1 0 01-2 0v-4zM9 7a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Admin
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <button onClick={handleSignOut} className="flex hover:bg-gray-100 text-gray-700 rounded p-2 text-sm group transition-colors items-center w-full">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 4a3 3 0 116 0v3h2.5A1.5 1.5 0 0117 8.5v7a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 15.5v-7A1.5 1.5 0 015.5 7H8V4zM5 10v5.5A.5.5 0 005.5 16H15a.5.5 0 00.5-.5V10H5zm3-6a2 2 0 104 0V7H8V4z" clipRule="evenodd" />
                    </svg>
                    Sign Out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

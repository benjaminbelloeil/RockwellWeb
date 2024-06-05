import { Fragment, useEffect, useState } from "react";
import { Bars3CenterLeftIcon, ChevronDownIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopBar({ showNav, setShowNav }) {
  const router = useRouter();
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
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
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
                    <UserCircleIcon className="h-4 w-4 mr-2" />
                    View Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={handleSignOut} className="flex hover:bg-gray-100 text-gray-700 rounded p-2 text-sm group transition-colors items-center w-full">
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
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

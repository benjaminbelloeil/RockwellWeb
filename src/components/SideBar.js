import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, BuildingStorefrontIcon, UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/LoginForm" });
  };

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm flex flex-col justify-between backdrop-filter backdrop-blur-md bg-opacity-70 z-10">
      <div>
        <div className="flex justify-center mt-6 mb-14">
          <picture>
            <img className="w-32 h-auto" src="/Rockwell.png" alt="company logo" />
          </picture>
        </div>

        <div className="flex flex-col">
          <Link href={{ pathname: '/Dashboard', query: { tab: 'home' } }} passHref>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.query.tab === "home" || !router.query.tab
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <div className="mr-2">
                <HomeIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Home</p>
              </div>
            </div>
          </Link>
          <Link href={{ pathname: '/Dashboard', query: { tab: 'products' } }} passHref>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.query.tab === "products"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <div className="mr-2">
                <BuildingStorefrontIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Products</p>
              </div>
            </div>
          </Link>
          <Link href={{ pathname: '/Dashboard', query: { tab: 'account' } }} passHref>
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.query.tab === "account"
                  ? "bg-red-100 text-red-600"
                  : "text-gray-400 hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <div className="mr-2">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <p>Account</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mb-6 mx-5">
        <button
          onClick={handleSignOut}
          className="w-full py-3 rounded text-center cursor-pointer flex items-center justify-center transition-colors text-white bg-red-500 hover:bg-red-700"
        >
          <div className="mr-2">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </div>
          <div>
            <p>Sign Out</p>
          </div>
        </button>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;

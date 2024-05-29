// SideBar.js
import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
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
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;

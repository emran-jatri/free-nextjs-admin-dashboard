import { sidebarData } from "@/js/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import LeftArrow from "../Svgs/LeftArrow";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const sidebarItems = sidebarData;

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      // console.log("🚀 ~ file: index.tsx:26 ~ clickHandler ~ target:", target);
      // console.log("🚀 ~ file: index.tsx:27 ~ clickHandler ~ sidebar:", sidebar);
      // console.log("🚀 ~ file: index.tsx:27 ~ clickHandler ~ sidebar:", sidebar.current.contains(target));
      // console.log("🚀 ~ file: index.tsx:27 ~ clickHandler ~ trigger:", trigger);
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <LeftArrow />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          {sidebarItems.map((sidebarItem) => (
            <div key={sidebarItem.key}>
              <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                {sidebarItem.title}
              </h3>
              <ul className="mb-6 flex flex-col gap-1.5">
                {sidebarItem.levelOneItems.map((levelOneItem) => (
                  <Fragment key={levelOneItem.key}>
                    {levelOneItem.levelTwoItems?.length ? (
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === levelOneItem.path ||
                          (levelOneItem.path !== "/" &&
                            pathname.includes(levelOneItem.path))
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <Fragment>
                              <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  (pathname === levelOneItem.path ||
                                    (levelOneItem.path !== "/" &&
                                      pathname.includes(levelOneItem.path))) &&
                                  "bg-graydark dark:bg-meta-4"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                <levelOneItem.leftIcon />
                                {levelOneItem.title}
                                <levelOneItem.rightIcon open={open} />
                              </Link>
                              {/* <!-- Dropdown Menu Start --> */}
                              <div
                                className={`translate transform overflow-hidden ${
                                  !open && "hidden"
                                }`}
                              >
                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                  {levelOneItem.levelTwoItems?.map(
                                    (levelTwoItem) => (
                                      <li key={levelTwoItem.key}>
                                        <Link
                                          href={levelTwoItem.path}
                                          className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                            pathname === levelTwoItem.path &&
                                            "text-white"
                                          } `}
                                        >
                                          {levelTwoItem.title}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                              {/* <!-- Dropdown Menu End --> */}
                            </Fragment>
                          );
                        }}
                      </SidebarLinkGroup>
                    ) : (
                      <li>
                        <Link
                          href={levelOneItem.path}
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            pathname.includes(
                              levelOneItem.title?.toLowerCase()
                            ) && "bg-graydark dark:bg-meta-4"
                          }`}
                        >
                          <levelOneItem.leftIcon />
                          {levelOneItem.title}
                        </Link>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;

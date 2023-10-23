import { sidebarData } from "@/js/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import LeftArrow from "../Svgs/LeftArrow";
import SidebarLinkGroup from "./SidebarLinkGroup";
import FramerMotion from "../new/transitions";

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
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white transition-transform duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/" className="hidden dark:block">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
          />
        </Link>
        <Link href="/" className="dark:hidden">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo-dark.svg"}
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
              <h3 className="mb-4 ml-4 text-sm font-semibold text-black-2 dark:text-white">
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
                                className={`rounded-r-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black dark:text-bodydark1 duration-300 ease-in-out hover:text-bodydark1 hover:bg-primary  ${
                                  (pathname === levelOneItem.path ||
                                    (levelOneItem.path !== "/" &&
                                      pathname.includes(levelOneItem.path))) &&
                                  "text-bodydark1 bg-primary"
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
                                className={`translate transform overflow-hidden`}
                              >
                                {open && (
                                  <FramerMotion
                                    variantsData={{
                                      start: { opacity: 0, x: 0, y: -100 },
                                      stop: { opacity: 1, x: 0, y: 0 },
                                    }}
                                  >
                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                      {levelOneItem.levelTwoItems?.map(
                                        (levelTwoItem) => (
                                          <li key={levelTwoItem.key}>
                                            <Link
                                              href={levelTwoItem.path}
                                              className={`group relative flex items-center gap-2.5 px-4 font-medium text-body dark:text-bodydark2 duration-300 ease-in-out hover:border-l-2 hover:text-boxdark dark:hover:text-whiten ${
                                                pathname ===
                                                  levelTwoItem.path &&
                                                "border-l-2 text-boxdark dark:text-whiten"
                                              } `}
                                            >
                                              {levelTwoItem.title}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </FramerMotion>
                                )}
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
                          className={`rounded-r-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black dark:text-whiten duration-300 ease-in-out hover:text-whiten hover:bg-primary  ${
                            pathname.includes(
                              levelOneItem.title?.toLowerCase()
                            ) && "text-whiten bg-primary"
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

"use client";
import Loader from "@/components/common/Loader";
import { use, useEffect, useRef, useState } from "react";
import "./data-tables-css.css";
import "./globals.css";
import "./satoshi.css";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FramerMotion from "@/components/new/transitions";
import { useScroll, motion, useSpring } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   container: ref,
  // });
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 200,
  //   damping: 50,
  // });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className=" dark:bg-boxdark dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <>
              {/* <motion.div
                className="h-3 bg-primary fixed top-0 left-0 right-0 origin-[0%] z-999999"
                style={{ scaleX }}
              /> */}
              <FramerMotion>
                <div className="flex h-screen overflow-hidden">
                  {/* <!-- ===== Sidebar Start ===== --> */}
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Sidebar End ===== --> */}

                  {/* <!-- ===== Content Area Start ===== --> */}
                  <div className="relative flex flex-1 flex-col overflow-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                      <div
                        // ref={ref}
                        className=" h-[calc(100vh_-_80px)] bg-whiten dark:bg-boxdark-2 lg:rounded-tl-3xl shadow-inner file:mx-auto p-4 md:p-6 2xl:p-10 overflow-hidden overflow-y-auto scrollbar lg:scrollbar-w-3 lg:scrollbar-thumb-rounded-full lg:scrollbar-thumb-boxdark dark:lg:scrollbar-thumb-whiter"
                      >
                        {children}
                      </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                  </div>
                  {/* <!-- ===== Content Area End ===== --> */}
                </div>
              </FramerMotion>
            </>
          )}
        </div>
      </body>
    </html>
  );
}

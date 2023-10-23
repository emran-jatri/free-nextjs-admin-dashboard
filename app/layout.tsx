"use client";
import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";
import "./data-tables-css.css";
import "./globals.css";
import "./satoshi.css";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FramerMotion from "@/components/new/transitions";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

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
                    <div className=" h-[calc(100vh_-_80px)] bg-whiten dark:bg-boxdark-2 rounded-tl-3xl shadow-inner file:mx-auto p-4 md:p-6 2xl:p-10 overflow-hidden overflow-y-auto">
                      {children}
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
            </FramerMotion>
          )}
        </div>
      </body>
    </html>
  );
}

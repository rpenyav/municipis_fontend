import React, { PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

interface LayoutProps {}

const Layout = ({ children }: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <Header />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer /> <ToastContainer />
    </div>
  );
};

export default Layout;

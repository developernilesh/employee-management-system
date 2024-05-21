import React from "react";
import { Employees, Layout, Navbar } from "../components";

const Home = () => {
  console.log("In the home page");
  return (
    <Layout>
      <Navbar/>
      <div className="w-full h-full">
        <Employees/>
      </div>
    </Layout>
  );
};

export default Home;

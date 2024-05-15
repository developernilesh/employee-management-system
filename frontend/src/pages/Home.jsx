import React from "react";
import { Employees, Layout, Navbar } from "../components";

const Home = () => {
  return (
    <Layout>
      <Navbar/>
      <Employees/>
    </Layout>
  );
};

export default Home;

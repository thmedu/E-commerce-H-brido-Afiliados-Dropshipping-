import React from "react";
import UserDashboard from "../components/UserDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isLoggedIn={true} userName="John Doe" />
      <main className="flex-grow py-8">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;

import React, { useEffect, useState } from "react";
import UserDashboard from "../components/UserDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    // Check if user is logged in (in a real app, this would check a token or session)
    // For demo purposes, we'll just simulate a logged-in state
    const simulateAuthCheck = () => {
      // Simulate checking local storage for user info
      const storedUserName = localStorage.getItem("userName");

      if (storedUserName) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
      } else {
        // For demo purposes, we'll set a fake user
        setIsLoggedIn(true);
        setUserName("John Doe");
        localStorage.setItem("userName", "John Doe");
      }
    };

    simulateAuthCheck();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />
      <main className="flex-grow py-8">
        <UserDashboard
          userName={userName}
          email={`${userName.toLowerCase().replace(" ", ".")}@example.com`}
          onLogout={handleLogout}
        />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;

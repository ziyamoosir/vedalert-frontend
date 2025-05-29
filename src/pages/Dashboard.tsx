import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";

type DashboardProps = {
  user: any;
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [backendMessage, setBackendMessage] = useState("");
  const [verifiedRole, setVerifiedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { role: routeRole } = useParams(); // Read role from URL

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) throw new Error("User token not found");

        const response = await fetch("http://127.0.0.1:5000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error calling backend");
        }

        const data = await response.json();
        setBackendMessage(data.message);
        setVerifiedRole(data.role.toLowerCase());

        // If routeRole doesn't match verified role, redirect to correct one
        if (data.role.toLowerCase() !== routeRole) {
          navigate(`/dashboard/${data.role.toLowerCase()}`, { replace: true });
        }

      } catch (err: any) {
        setBackendMessage(`Backend says: ${err.message}`);
      }
    };

    fetchUserRole();
  }, [routeRole, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");  // Redirect to Home page
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout, please try again.");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Your verified role: {verifiedRole}</p>
      <p>{backendMessage}</p>

      {/* Role-based UI */}
      {verifiedRole === "admin" && <p>Admin dashboard features...</p>}
      {verifiedRole === "user" && <p>User dashboard features...</p>}
      {verifiedRole === "govt" && <p>Govt dashboard features...</p>}
      {verifiedRole === "hospital" && <p>Hospital dashboard features...</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

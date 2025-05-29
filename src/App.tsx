import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RoleRouter from "./components/RoleRouter";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Home /> : <RoleRouter />} />
        <Route path="/login" element={!user ? <Login /> : <RoleRouter />} />
        <Route path="/signup" element={!user ? <Signup /> : <RoleRouter />} />

        {/* Role-based dashboards */}
        <Route path="/dashboard/admin" element={<Dashboard user={user} />} />
        <Route path="/dashboard/user" element={<Dashboard user={user} />} />
        <Route path="/dashboard/govt" element={<Dashboard user={user} />} />
        <Route path="/dashboard/hospital" element={<Dashboard user={user} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

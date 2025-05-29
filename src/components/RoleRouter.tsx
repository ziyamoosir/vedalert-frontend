import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const RoleRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoleAndRedirect = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return navigate("/login");

        const token = await user.getIdToken();
        const res = await fetch("http://127.0.0.1:5000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const role = data.role.toLowerCase(); // Make URL-safe
        navigate(`/dashboard/${role}`);
      } catch (err) {
        console.error("Role fetch error:", err);
        navigate("/login");
      }
    };

    fetchRoleAndRedirect();
  }, [navigate]);

  return <div>Loading role-based dashboard...</div>;
};

export default RoleRouter;

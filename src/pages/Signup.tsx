import { useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created with UID:", user.uid);

      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        role: role,
      });
      console.log("User document written to Firestore:", user.uid);

      navigate("/dashboard");
    } catch (err) {
      console.error("Signup or Firestore write error:", err);
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Govt">Govt</option>
        <option value="Hospital">Hospital</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        const res = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // save display name
        await updateProfile(res.user, {
          displayName: name
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");

    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="auth-page">
      {user ? (
        <div className="auth-logged">
          <h2>Hello, {user.displayName || "Friend"} 🐺</h2>
          <p>Do you want to log out?</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <>
          <h2>{isRegister ? "Create Account" : "Login"}</h2>

          {isRegister && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
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

          <button onClick={handleSubmit}>
            {isRegister ? "Register" : "Login"}
          </button>

          <p
            className="auth-toggle"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Create account"}
          </p>
        </>
      )}
    </div>
  );
}

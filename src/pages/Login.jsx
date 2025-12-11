// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/email-already-in-use":
        return "Email already in use. Try logging in instead.";
      case "auth/weak-password":
        return "Password must be at least 6 characters";
      case "auth/invalid-email":
        return "Invalid email address";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
    setLoading(false);
  };

  const signup = async () => {
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
    setLoading(false);
  };

  return (
    <div className="login-container flow-circular-regular" >
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password 6 char or longer"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && login()}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="btn" onClick={login} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <button className="btn" onClick={signup} disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import Planet from "../../assets/planet-bg.webp";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        isLoggedIn: true
      };
      authLogin(userData);
      navigate("/chat");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
  
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      }
      
      const userData = {
        uid: user.uid,
        email: user.email,
        name: userDoc.exists() ? userDoc.data().name : user.displayName,
        isLoggedIn: true
      };
      
      authLogin(userData);
      navigate("/chat");
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError("");
    } catch (error) {
      setError("Failed to send reset email");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 md:py-28">
      <img src={Planet} alt="Planet Background" className="absolute top-0 right-0 w-[600px] opacity-40 pointer-events-none select-none" />

     
      <div className=" z-10 bg-white bg-opacity-5 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-xl border border-purple-800 w-full max-w-md mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
          />
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-purple-400 hover:text-purple-300"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-purple-400 hover:underline"
            >
              {resetEmailSent ? "Reset email sent!" : "Forgot Password?"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 hover:bg-purple-600 transition rounded-lg font-semibold"
          >
            Sign In
          </button>
        </form>

        <button 
          className="w-full py-3 bg-white text-black rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={24} />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-400">
          New to InfinityChat?{" "}
          
          <a href="/register" className="text-purple-500 hover:underline cursor-pointer">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

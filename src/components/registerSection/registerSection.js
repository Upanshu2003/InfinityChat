import { useState } from "react";
import Planet from "../../assets/planet-bg.webp";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../backend/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
      });

      await sendEmailVerification(user);
      setIsEmailSent(true);       
    } catch (error) {
      console.error("Registration Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 md:py-28">
          <img src={Planet} alt="Planet Background" className="absolute top-0 right-0 w-[600px] opacity-40 pointer-events-none select-none" />

      <div className=" z-10 bg-white bg-opacity-5 backdrop-blur-lg p-6 md:p-10 rounded-2xl shadow-xl border border-purple-800 w-full max-w-md mx-auto space-y-6">
        {!isEmailSent ? (
          <>
            <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-300 text-white"
              />
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-700 hover:bg-purple-600 transition rounded-lg font-semibold disabled:bg-purple-900 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <button className="w-full py-3 bg-white text-black rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <FcGoogle size={24} />
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href= "/login" className="text-purple-500 hover:underline cursor-pointer">
                Sign In
              </a>
            </p>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Verification Email Sent</h2>
            <p className="text-gray-300">
              Verification link sent to your email. Please verify to continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
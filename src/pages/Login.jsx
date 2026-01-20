import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://sardor-s-shop-beckent-5.onrender.com/api/auth/login",
        { email, password }
      );

      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));

      navigate("/dashboard");
      toast.success("Login successful");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md border border-white/20">
        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Welcome Back
        </h2>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-cyan-300" />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 py-3 rounded-xl bg-white/10 text-white outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-cyan-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white outline-none"
            />
            <button
              className="absolute right-3 top-3 text-cyan-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"} <ArrowRight />
          </button>

          <p className="text-center text-cyan-200">
            No account?{" "}
            <Link to="/register" className="text-white font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

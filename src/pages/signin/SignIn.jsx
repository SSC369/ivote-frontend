import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import "./style.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, email, password } = formData;
    if (!username) {
      toast.error("username is required!", { duration: 1000 });
      return false;
    } else if (!email) {
      toast.error("Email is required", { duration: 1000 });
      return false;
    } else if (!password) {
      toast.error("Password is required", { duration: 1000 });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const host = "";
      toast.success("Registered Successfully", { duration: 1000, icon: "🔥" });
      setTimeout(() => {
        navigate("/community/elections");
      }, 1000);
      // if (res.ok) {
      //   toast.success("Registered Successfully");
      //   setFormData({
      //     username: "",
      //     email: "",
      //     password: "",
      //   });
      // }
    }
  };

  return (
    <>
      <div className="loginContainer">
        <form onSubmit={handleSubmit} className="LoginForm">
          <div className="heading">
            <h1>Login</h1>
            <CgProfile />
          </div>

          <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter your name"
              type="text"
              id="username"
              name="username"
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email"
              type="email"
              id="email"
              name="email"
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter your password"
              type={showPass ? "text" : "password"}
              id="password"
              name="password"
            />
          </div>

          <div className="checkboxContainer">
            <input
              onChange={() => setShowPass(!showPass)}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">Show Password</label>
          </div>

          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account?
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
        <p>
          Want to create a community?
          <span onClick={() => navigate("/community/register")}>Create</span>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Login;

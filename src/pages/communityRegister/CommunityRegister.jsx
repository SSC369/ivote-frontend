import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdGroups } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CommunityRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { name, email, password } = formData;
    if (!name) {
      toast.error("Community name is required!", { duration: 1000 });
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
        navigate("/community");
      }, 1000);
      //send organisation id and admin email in jwt token as a result
      // if (res.ok) {
      //   toast.success("Registered Successfully");
      //   setFormData({
      //     name: "",
      //     email: "",
      //     password: "",
      //   });
      // }
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="communityForm">
          <div className="heading">
            <h1>Community Register</h1>
            <MdGroups />
          </div>

          <div className="inputContainer">
            <label htmlFor="community">Community</label>
            <input
              onChange={handleChange}
              value={formData.name}
              placeholder="Enter community name"
              type="text"
              id="community"
              name="name"
            />
          </div>

          <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter your username"
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
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default CommunityRegister;

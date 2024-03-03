import React, { useState } from "react";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [organisations, setOrganisations] = useState([
    { value: "IIT Bombay", label: "IIT Bombay", name: "organisation" },
    {
      value: "MIT",
      label: "MIT",
      name: "organisation",
    },
  ]);
  //fetch organisations from db

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",

    organisation: "",
  });

  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.name]: e.value });
  };

  // const roleOptions = [
  //   { value: "admin", label: "Admin", name: "role" },
  //   { value: "organisation", label: "Organisation", name: "role" },
  //   { value: "user", label: "User", name: "role" },
  // ];

  const handleValidation = () => {
    const { username, email, password, organisation } = formData;
    if (!username) {
      toast.error("username is required!", { duration: 1000 });
      return false;
    } else if (!email) {
      toast.error("Email is required", { duration: 1000 });
      return false;
    } else if (!password) {
      toast.error("Password is required", { duration: 1000 });
      return false;
    } else if (!organisation) {
      toast.error("organisation is required", { duration: 1000 });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const host = "";
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/community/elections");
      }, 1000);
      // if (res.ok) {
      //   toast.success("Registered Successfully");
      //   setFormData({
      //     username: "",
      //     email: "",
      //     password: "",
      //     role: "",
      //     organisation: "",
      //   });
      // }
    }
  };

  return (
    <>
      <div className="registerContainer">
        <form onSubmit={handleSubmit} className="registerForm">
          <div className="heading">
            <h1>Register</h1>
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
          {/* 
          <div className="selectContainer">
            <label>Choose a role</label>
            <Select
              onChange={handleSelect}
              placeholder="Select your role"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: "none",
                  fontSize: "14px",
                }),
              }}
              id="role"
              options={roleOptions}
            />
          </div> */}

          <div className="selectContainer">
            <label>Choose an organisation</label>
            <Select
              onChange={handleSelect}
              placeholder="Select your organisation"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: "none",
                  fontSize: "14px",
                }),
              }}
              options={organisations}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
        <p>
          Already have an account?
          <span onClick={() => navigate("/login")}>Login</span>
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

export default Register;

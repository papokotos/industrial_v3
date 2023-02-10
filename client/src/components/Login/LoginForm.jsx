import React, { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/login", formData)
      .then((res) => {
        if (res.status === 200) {
          // Store userId in local storage
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("rank", res.data.rank);
          localStorage.setItem("loggedIn", true);
          if (
            signIn({
              token: res.data.token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: { username: res.data.username },
            })
          ) {
            navigate("/dashboard");
            window.location.reload();
            // Redirect or do-something
          }
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#16122b]">
      <form className="login_form-container" onSubmit={handleSubmit}>
        <h1 className="text-4xl uppercase cursor-default">Login</h1>
        <input className="login_form-input" type="username" placeholder="USERNAME" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <input className="login_form-input" type="password" placeholder="PASSWORD" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

        <button type="submit" className="login_form-button">
          Login
        </button>
        <div className="flex cursor-default">
          Cannot Login?&nbsp;
          <a className="font-bold hover:underline" href="https://github.com/papokotos/industrial_v2">
            Contact Us!
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../../services/auth.service";
import { Spin, Alert, Space } from "antd";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registerFailed, setRegisterFailed] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleEye = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      setShowPassword(true);
    } else {
      input.type = "password";
      setShowPassword(false);
    }
  };

  const handleEyeConfirm = () => {
    const input = document.getElementById("confirm_password");
    if (input.type === "password") {
      input.type = "text";
      setShowConfirm(true);
    } else {
      input.type = "password";
      setShowConfirm(false);
    }
  };

  const handleRegister = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      confirm_password: e.target.confirm_password.value,
    };
    register(data, (status, res) => {
      if (status) {
        console.log(res.message);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
        setIsLoading(false);
      } else {
        setRegisterFailed(res.response.data.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      {registerFailed && (
        <Space
          className="my-3"
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Alert className="text-sm tracking-tight leading-4" message={registerFailed} banner closable />
        </Space>
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            E-mail
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="text-sm shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            Password
          </label>
          <label
            htmlFor="password"
            className="flex items-center bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          >
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="text-sm w-full border-none focus:outline-none px-1"
            />
            {showPassword ? (
              <FaEye onClick={() => handleEye()} />
            ) : (
              <FaEyeSlash onClick={() => handleEye()} />
            )}
          </label>
        </div>
        <div className="mb-3">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-slate-200"
          >
            Confirm Password
          </label>
          <label
            htmlFor="confirm_password"
            className="flex items-center bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          >
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="********"
              className="text-sm w-full border-none focus:outline-none px-1"
            />
            {showConfirm ? (
              <FaEye onClick={() => handleEyeConfirm()} />
            ) : (
              <FaEyeSlash onClick={() => handleEyeConfirm()} />
            )}
          </label>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="bg-slate-500 text-white px-3 py-1 w-full hover:bg-slate-600"
          >
            {isLoading ? (
              <Spin />
            ) : (
              <span className="text-sm">Register</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
};
export default FormRegister;

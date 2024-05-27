import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../services/auth.service";
import { Alert, Space, Spin } from "antd";
const FormLogin = () => {
  const [show, setShow] = useState(false);
  const [loginFailed, setLoginFailed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleEye = () => {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      setShow(true);
    } else {
      input.type = "password";
      setShow(false);
    }
  };
  const handleLogin = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(data, (res) => {
      console.log(res.status);
      if (res.success === true) {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";
      } else {
        setLoginFailed(res.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      {loginFailed && (
        <Space
          className="my-3"
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Alert
            type="error"
            className="text-sm py-3 tracking-tight leading-4 rounded-sm"
            message={loginFailed}
            banner
          />
        </Space>
      )}
      <form onSubmit={handleLogin}>
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
            required
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
            className="text-sm flex items-center bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline placeholder:opacity-50"
          >
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="text-sm w-full border-none focus:outline-none px-1"
              required
            />
            {show ? (
              <FaEye onClick={() => handleEye()} />
            ) : (
              <FaEyeSlash onClick={() => handleEye()} />
            )}
          </label>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="bg-slate-500 text-white px-3 py-2 w-full hover:bg-slate-600"
          >
            {isLoading ? (
              <Spin className="text-white" />
            ) : (
              <span className="text-sm">Login</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;

import { Link } from "react-router-dom";
import FormLogin from "../fragments/formLogin";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[90%] bg-slate-400 p-10">
        <div className="flex flex-col justify-center">
          <div className="w-full flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="w-[100px]"
            />
          </div>
          <div className="w-full">
            <FormLogin />
          </div>
          <hr className="w-full bg-slate-300"/>
          <div className="mt-3">
            <p className="text-center text-sm">Don't have an account? <Link to={"/register"}>Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

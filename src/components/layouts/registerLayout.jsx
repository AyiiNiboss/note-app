import { Link } from "react-router-dom"
import FormRegister from "../fragments/formRegister"

const RegisterLayout = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-[90%] bg-slate-400 p-10">
                <div className="flex flex-col justify-center">
                    <div className="w-full flex justify-center">
                        <h1 className="text-xl">Register</h1>
                    </div>
                    <div className="w-full">
                        <FormRegister />
                    </div>
                    <hr className="w-full bg-slate-300 mt-5" />
                    <div className="mt-3">
                        <p className="text-center text-sm">Already have an account? <Link to={"/"}>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLayout
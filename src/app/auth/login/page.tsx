import { Link } from "react-router-dom";
import title from '@assets/logo.svg';
import background from '@assets/decorative_graphic.png';
import { LoginForm } from "@features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <div className="w-full lg:w-3/5 pl-30 p-8 flex flex-col justify-center items-start bg-white">
                <div className="mb-8 flex flex-row items-center gap-2">
                    <img src={title} alt="title" className="h-8" />
                </div>

                <div className="mb-4 text-left">
                    <h1 className="text-1xl font-semibold text-gray-800">Log in to Luma AI Enterprise Version</h1>
                </div>

                <div className="w-full lg:w-5/6 max-w-md" >
                    <LoginForm />
                </div>

                <div className="p-6 ml-7 items-center text-sm">
                    <span className="text-gray-600">Forgot Password?</span>
                    <Link to="/auth/reset-password" className="ml-1 text-blue-600 font-medium hover:text-blue-800 hover:underline">
                        RESET YOUR PASSWORD
                    </Link>
                </div>
            </div>

            <div className="hidden lg:block w-full lg:w-2/5">
                <img
                    src={background}
                    alt="Decorative pattern background"
                />
            </div>
        </div>
    );
};

export default LoginPage;

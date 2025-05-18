import { Link } from "react-router-dom";
import title from '@assets/login-title.svg';
import background from '@assets/login-background.svg';
import { LoginForm } from "@features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <div className="w-full lg:w-3/5 p-25 flex flex-col justify-center items-start bg-white">
                <div className="mb-8 flex flex-row items-center gap-2">
                    <img src={title} alt="title" className="h-8" />
                    <span className="text-lg font-medium text-gray-800">Luma AI</span>
                    <span className="text-xs text-gray-500 ml-1">Enterprise Version</span>
                </div>

                <div className="mb-8 text-left">
                    <p className="text-sm text-gray-600">WELCOME BACK 👋</p>
                    <h1 className="text-2xl font-semibold text-gray-800">Continue to your Account.</h1>
                </div>

                <LoginForm></LoginForm>

                <div className="flex items-center text-sm">
                    <span className="text-gray-600">Forgot Password?</span>
                    <Link to="/auth/reset-password" className="ml-1 text-gray-800 font-medium underline hover:text-gray-400">
                        RESET YOUR PASSWORD
                    </Link>
                </div>
            </div>

            <div className="hidden lg:block w-full lg:w-2/5">
                <img
                    src={background}
                    alt="Decorative pattern background"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default LoginPage;

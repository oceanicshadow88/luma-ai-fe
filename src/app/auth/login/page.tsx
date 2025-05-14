import { Link } from "react-router-dom";
import title from '@assets/login-title.svg';
import background from '@assets/login-background.svg';
import { LoginForm } from "@features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        // Wrapper container
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            {/* Left container */}
            <div className="w-full lg:w-3/5 p-8 flex flex-col justify-center items-start bg-white">
                {/* Logo and title section */}
                <div className="mb-8 flex flex-row items-center gap-2">
                    <img src={title} alt="title" className="h-8" />
                    <span className="text-lg font-medium text-gray-800">Luma AI</span>
                    <span className="text-xs text-gray-500 ml-1">Enterprise Version</span>
                </div>

                {/* Welcome message */}
                <div className="mb-8">
                    <p className="text-sm text-gray-600">WELCOME BACK 👋</p>
                    <h1 className="text-2xl font-semibold text-gray-800">Continue to your Account.</h1>
                </div>

                {/* Login Form */}
                <LoginForm></LoginForm>

                {/* Reset password link */}
                <div className="flex items-center text-sm">
                    <span className="text-gray-600">Forgot Password?</span>
                    <Link to="/auth/reset-password" className="ml-1 text-gray-800 font-medium hover:underline">
                        RESET YOUR PASSWORD
                    </Link>
                </div>
            </div>

            {/* Right container with background pattern */}
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
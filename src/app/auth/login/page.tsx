import { Link } from "react-router-dom";
import logo from '@assets/logo.svg';
import background from '@assets/decorative_graphic.png';
import { LoginForm } from "@features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <main className="w-full lg:w-3/5 pl-30 p-8 flex flex-col justify-center items-start bg-white">
                <header className="mb-8 flex flex-row items-center gap-2">
                    <img src={logo} alt="Luma AI Logo" className="h-8" />
                </header>

                <section className="mb-4 text-left">
                    <h1 className="text-xl font-semibold text-gray-800">Log in to Luma AI Enterprise Version</h1>
                </section>

                <section className="w-full lg:w-5/6 max-w-md">
                    <LoginForm />
                </section>

                <section className="p-6 ml-7 text-sm">
                    <p className="text-gray-600 inline">Forgot Password?</p>
                    <Link to="/auth/reset-password" className="ml-1 text-blue-600 font-medium hover:text-blue-900 hover:underline">
                        RESET YOUR PASSWORD
                    </Link>
                </section>
            </main>

            <aside className="hidden lg:block w-full lg:w-2/5" aria-hidden="true">
                <img
                    src={background}
                    alt="Decorative pattern background"
                />
            </aside>
        </div>
    );
};

export default LoginPage;
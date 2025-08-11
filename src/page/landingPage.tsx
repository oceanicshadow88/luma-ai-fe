import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="justify-center min-h-screen">
      <h1>Home Page</h1>
      <br />
      <div>
        <Link
          to="/auth/signup/admin"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up as Admin
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;

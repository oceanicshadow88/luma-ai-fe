export const UnavailablePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Unavailable</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you are trying to access is currently unavailable. <br />
          <br />
          Please check LumaAI Status for known problems. If there are no known problems and your
          page hasn't appeared again in 5-10 minutes then please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default UnavailablePage;

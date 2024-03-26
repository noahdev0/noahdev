import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">
        Oops! The page you are looking for does not exist.
      </p>
      <h3>Try again buddy</h3>
    </div>
  );
};

export default NotFoundPage;

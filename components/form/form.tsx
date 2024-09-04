'use client';
export const LoginForm = () => {
  const handleGitHubLogin = () => {
    // Handle GitHub login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="flex items-center justify-center">
      <h1 className="mb-4 font-bold">Login</h1>

      <button
        onClick={handleGitHubLogin}
        className="mb-2 rounded-md bg-gray-800 px-4 py-2 text-white"
      >
        Login with GitHub
      </button>
      <button
        onClick={handleGoogleLogin}
        className="rounded-md bg-red-500 px-4 py-2 text-white"
      >
        Login with Google
      </button>
    </div>
  );
};

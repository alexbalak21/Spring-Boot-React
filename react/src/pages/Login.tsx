import { useState } from "react";
import axios from "axios";
import { useCsrf } from "../hooks/useCsrf";
import { useAuthToken } from "../hooks/useAuthToken";

const LOGIN_URL = "/api/auth/login";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  useCsrf();
  const { setAccessToken } = useAuthToken();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loginResult, setLoginResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoginResult(null);

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(LOGIN_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      });

      const access_token = response.data?.access_token;
      if (access_token) {
        setAccessToken(access_token);
        setLoginResult("Login successful");
        console.log("JWT saved via hook:", access_token);
      } else {
        setError("No access token returned from server");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

        {error && <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded">{error}</div>}
        {loginResult && <div className="mb-4 text-sm text-green-800 bg-green-100 p-3 rounded">{loginResult}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3 text-base placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-60`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

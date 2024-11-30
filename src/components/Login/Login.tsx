import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services";
import { FaUser, FaLock } from "react-icons/fa";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate("/");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Errore durante il login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="p-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="ITAM Logo" className="h-12 w-auto" />
          </div>

          {/* Titolo */}
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Accedi al tuo account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Messaggio di Errore */}
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Campo Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                <FaUser className="inline mr-2" /> Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="Inserisci il tuo username"
                required
                aria-label="Username"
              />
            </div>

            {/* Campo Password */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                <FaLock className="inline mr-2" /> Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="Inserisci la tua password"
                required
                aria-label="Password"
              />
            </div>

            {/* Pulsante di Login */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors font-semibold"
            >
              Accedi
            </button>
          </form>

          {/* Link Registrazione */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Non hai un account?{" "}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Registrati qui
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Informativo */}
        <div className="bg-indigo-600 text-white py-4 text-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} ITAM. Tutti i diritti riservati.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

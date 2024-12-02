// src/pages/RegisterPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Department, departmentSchema, RegisterFormData, registerSchema } from "../../schemas";
import { useFetch } from "../../hooks/useFetch.ts";
import { register } from "../../services";

// Importazione delle icone da react-icons/fa
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaVenusMars
} from "react-icons/fa";

const GENDER_OPTIONS = [
  { value: "MAN", label: "Man" },
  { value: "WOMAN", label: "Woman" },
  { value: "NONE", label: "Non-specified" },
];

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Stato del form con valori predefiniti
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    password1: "",
    password2: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: undefined,
    telephone: "",
    department: null,
  });

  // Stato per gestire e visualizzare errori
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Stato di invio

  // Fetch dei dipartimenti utilizzando il custom hook useFetch
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useFetch<Department[]>(`/api/v1/accounts/departments/`, departmentSchema.array());

  /**
   * Gestisce i cambiamenti negli input del form.
   * @param e - Evento di cambiamento dell'input.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "department" ? Number(value) : value,
    }));
  };

  /**
   * Gestisce l'invio del form.
   * @param e - Evento di invio del form.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validazione dei dati del form usando lo schema Zod
    const parseResult = registerSchema.safeParse(formData);
    if (!parseResult.success) {
      const validationErrors = parseResult.error.errors
        .map((err) => err.message)
        .join(", ");
      setError(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Tenta di registrare l'utente
      await register(parseResult.data);
      // Reindirizza alla pagina di successo della registrazione
      navigate("/check-your-email");
    } catch (err: any) {
      // Visualizza il messaggio di errore se la registrazione fallisce
      setError(err.message || "Errore durante la registrazione");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        {/* Header del Modulo */}
        <div className="p-6 bg-indigo-600 text-white">
          <h2 className="text-2xl font-semibold text-center">Registrati a ITAM</h2>
        </div>

        {/* Corpo del Modulo */}
        <div className="p-6">
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  formData.username.length > 0 && formData.username.length < 3
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                required
                minLength={3}
                placeholder="Inserisci il tuo username"
              />
              {formData.username.length > 0 && formData.username.length < 3 && (
                <p className="text-red-500 text-sm mt-1">Username deve essere almeno di 3 caratteri.</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password1" className="text-gray-700 mb-1 flex items-center">
                <FaLock className="mr-2 text-gray-500" />
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password1"
                name="password1"
                value={formData.password1}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  formData.password1.length > 0 && formData.password1.length < 6
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                required
                minLength={6}
                placeholder="Inserisci la tua password"
              />
              {formData.password1.length > 0 && formData.password1.length < 6 && (
                <p className="text-red-500 text-sm mt-1">Password deve essere almeno di 6 caratteri.</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="password2" className="text-gray-700 mb-1 flex items-center">
                <FaLock className="mr-2 text-gray-500" />
                Conferma Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                  formData.password2 && formData.password2 !== formData.password1
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                required
                minLength={6}
                placeholder="Conferma la tua password"
              />
              {formData.password2 && formData.password2 !== formData.password1 && (
                <p className="text-red-500 text-sm mt-1">Le password non corrispondono.</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-gray-500" />
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
                required
                placeholder="Inserisci la tua email"
              />
            </div>

            {/* First Name Field */}
            <div>
              <label htmlFor="first_name" className="text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
                maxLength={30}
                placeholder="Inserisci il tuo nome"
              />
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="last_name" className="text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
                maxLength={150}
                placeholder="Inserisci il tuo cognome"
              />
            </div>

            {/* Gender Dropdown */}
            <div>
              <label htmlFor="gender" className="text-gray-700 mb-1 flex items-center">
                <FaVenusMars className="mr-2 text-gray-500" />
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender ?? ""}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
              >
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Telephone Field */}
            <div>
              <label htmlFor="telephone" className="text-gray-700 mb-1 flex items-center">
                <FaPhone className="mr-2 text-gray-500" />
                Telephone
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
                pattern="\d*"
                maxLength={20}
                placeholder="Inserisci il tuo numero di telefono"
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <label htmlFor="department" className="text-gray-700 mb-1 flex items-center">
                <FaBuilding className="mr-2 text-gray-500" />
                Department
              </label>
              {departmentsLoading ? (
                <div className="text-gray-500">Loading departments...</div>
              ) : departmentsError ? (
                <div className="text-red-500">Error loading departments</div>
              ) : (
                <select
                  id="department"
                  name="department"
                  value={formData.department ?? ""}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition border-gray-300"
                >
                  <option value="">Select Department</option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        {/* Footer Informativo */}
        <div className="bg-indigo-600 text-white py-4 text-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} ITAM. Tutti i diritti riservati.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

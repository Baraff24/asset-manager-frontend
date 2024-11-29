import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Department, departmentSchema, RegisterFormData, registerSchema } from "../../schemas";
import {useFetch} from "../../hooks/useFetch.ts";
import {register} from "../../services";


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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              formData.username.length > 0 && formData.username.length < 3 ? "border-red-500" : ""
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
        <div className="mb-4">
          <label htmlFor="password1" className="block mb-1">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              formData.password1.length > 0 && formData.password1.length < 6 ? "border-red-500" : ""
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
        <div className="mb-4">
          <label htmlFor="password2" className="block mb-1">
            Conferma Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              formData.password2 && formData.password2 !== formData.password1 ? "border-red-500" : ""
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
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            placeholder="Inserisci la tua email"
          />
        </div>
        {/* First Name Field */}
        <div className="mb-4">
          <label htmlFor="first_name" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            maxLength={30}
            placeholder="Inserisci il tuo nome"
          />
        </div>
        {/* Last Name Field */}
        <div className="mb-4">
          <label htmlFor="last_name" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            maxLength={150}
            placeholder="Inserisci il tuo cognome"
          />
        </div>
        {/* Gender Dropdown */}
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender ?? ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
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
        <div className="mb-4">
          <label htmlFor="telephone" className="block mb-1">
            Telephone
          </label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            pattern="\d*"
            maxLength={20}
            placeholder="Inserisci il tuo numero di telefono"
          />
        </div>
        {/* Department Dropdown */}
        <div className="mb-4">
          <label htmlFor="department" className="block mb-1">
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
              className="w-full border px-3 py-2 rounded"
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
          className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;

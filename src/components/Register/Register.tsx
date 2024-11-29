import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Department, departmentSchema, RegisterFormData, registerSchema} from "../../schemas";
import {useFetch} from "../../hooks/useFetch.ts";
import {register} from "../../services";

const GENDER_OPTIONS = [
  { value: "MAN", label: "Man" },
  { value: "WOMAN", label: "Woman" },
  { value: "NONE", label: "Non-specified" },
];

const Register: React.FC = () => {
  const navigate = useNavigate();

  // Initialize form state with default values
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

  // State to handle and display errors
  const [error, setError] = useState<string | null>(null);

  // Fetch departments data using the custom useFetch hook
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useFetch<Department[]>(`/api/v1/accounts/departments/`, departmentSchema.array());

  /**
   * Handles changes in form inputs.
   * @param e - The input change event.
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
   * Handles form submission.
   * @param e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form data using Zod schema
    const parseResult = registerSchema.safeParse(formData);
    if (!parseResult.success) {
      const validationErrors = parseResult.error.errors
        .map((err) => err.message)
        .join(", ");
      setError(validationErrors);
      return;
    }

    try {
      // Attempt to register the user
      await register(parseResult.data);
      // Navigate to home page upon successful registration
      navigate("/");
      // Reload the page to update authentication state
      window.location.reload();
    } catch (err: any) {
      // Display error message if registration fails
      setError(err.message || "Error during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={3}
          />
        </div>
        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password1" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={6}
          />
        </div>
        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="password2" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            minLength={6}
          />
        </div>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
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
            value={formData.gender}
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
          />
        </div>
        {/* Department Dropdown */}
        <div className="mb-4">
          <label htmlFor="department" className="block mb-1">
            Department
          </label>
          {departmentsLoading ? (
            <div>Loading departments...</div>
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

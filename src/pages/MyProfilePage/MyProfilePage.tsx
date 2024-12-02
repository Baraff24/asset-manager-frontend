import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaVenusMars, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import {RegisterFormData, Department, departmentSchema} from "../../schemas";
import { changeUserPassword, updateUserProfile } from "../../services";
import { useFetch } from "../../hooks/useFetch";
import {useAuthContext} from "../../context/authContext.tsx";

const GENDER_OPTIONS = [
  { value: "MAN", label: "Man" },
  { value: "WOMAN", label: "Woman" },
  { value: "NONE", label: "Non-specified" },
];

const MyProfilePage: React.FC = () => {
  const { user, isLoading } = useAuthContext();
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  // Fetch departments list
  const {
    data: departments,
    error: departmentsError,
    isLoading: departmentsLoading,
  } = useFetch<Department[]>(`/api/v1/accounts/departments/`, departmentSchema.array());

  if (isLoading || departmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">{"Profilo non disponibile."}</p>
      </div>
    );
  }

  if (departmentsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">Errore nel caricamento dei dipartimenti.</p>
      </div>
    );
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "department" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserProfile(user.id, formData);
      toast.success("Profilo aggiornato con successo!");
      setIsEditing(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Errore durante l'aggiornamento del profilo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await changeUserPassword(currentPassword, newPassword);
      toast.success("Password cambiata con successo!");
      setPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err.message || "Errore durante il cambio della password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-24">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
        {/* Header del Modulo */}
        <div className="p-6 bg-indigo-600 text-white">
          <h2 className="text-2xl font-semibold text-center">Il Mio Profilo</h2>
        </div>

        {/* Corpo del Modulo */}
        <div className="p-6">
          {/*{error && (*/}
          {/*  <div className="mb-4 text-red-600 text-sm text-center">*/}
          {/*    {error}*/}
          {/*  </div>*/}
          {/*)}*/}

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            {/* Username Field (Non Editabile) */}
            <div>
              <label htmlFor="username" className="text-gray-700 mb-1 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                disabled
                className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Email Field (Non Editabile) */}
            <div>
              <label htmlFor="email" className="text-gray-700 mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-gray-500" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                disabled
                className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
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
                value={formData.first_name ?? user.first_name ?? ""}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                value={formData.last_name ?? user.last_name ?? ""}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
                value={formData.gender ?? user.gender ?? ""}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">Select Gender</option>
                {GENDER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
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
                value={formData.telephone ?? user.telephone ?? ""}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              <select
                id="department"
                name="department"
                value={formData.department ?? user.department?.id ?? ""}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="">Select Department</option>
                {departments?.map((dept: Department) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Pulsanti di Azione */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting || !isEditing}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                  (isSubmitting || !isEditing) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Aggiornando..." : "Aggiorna Profilo"}
              </button>
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Cambia Password
              </button>
            </div>
          </form>

          {/* Pulsante Modifica Profilo */}
          {!isEditing && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Modifica Profilo
              </button>
            </div>
          )}

          {/* Modal per Cambiare la Password */}
          {passwordModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl mb-4 flex items-center">
                  <FaLock className="mr-2 text-gray-500" />
                  Cambia Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-gray-700 mb-1">
                      Password Attuale<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      required
                      placeholder="Inserisci la tua password attuale"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-700 mb-1">
                      Nuova Password<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      required
                      minLength={6}
                      placeholder="Inserisci la nuova password"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setPasswordModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Annulla
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Cambiando..." : "Cambia Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer Informativo */}
        <div className="bg-indigo-600 text-white py-4 text-center">
          <p className="text-xs">&copy; {new Date().getFullYear()} ITAM. Tutti i diritti riservati.</p>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default MyProfilePage;

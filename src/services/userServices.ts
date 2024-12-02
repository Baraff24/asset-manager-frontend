import {RegisterFormData, updateUserProfileSchema} from "../schemas";
import {fetcher} from "./fetcher.ts";

export const updateUserProfile = async (userId: number, data: Partial<RegisterFormData>): Promise<void> => {
  try {
    const response = await fetcher(`/api/v1/accounts/users/${userId}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    updateUserProfileSchema.parse(response);
  } catch (error: any) {
    throw new Error(error.message || "Errore durante l'aggiornamento del profilo.");
  }
};


export const changeUserPassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  try {
    await fetcher("/api/v1/accounts/change-password/", {
      method: "POST",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password1: newPassword,
        new_password2: newPassword,
      }),
    });

    // Gestione della risposta, se necessario
  } catch (error: any) {
    throw new Error(error.message || "Errore durante il cambio della password.");
  }
};
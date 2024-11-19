import useSWR from "swr";
import { getCurrentUser } from "../services";
import { z } from "zod";

// Defining the user schema
const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;

type UseAuthResult = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: unknown;
};

export const useAuth = (): UseAuthResult => {
  const { data, error, isValidating } = useSWR("/api/auth/user/", () => getCurrentUser());

  let parsedUser: User | null = null;
  if (data) {
    try {
      parsedUser = userSchema.parse(data);
    } catch (parseError) {
      console.error("Errore nel parsing dell'utente:", parseError);
      parsedUser = null;
    }
  }

  return {
    user: parsedUser,
    isLoading: !data && !error,
    isAuthenticated: !!parsedUser,
    error,
  };
};

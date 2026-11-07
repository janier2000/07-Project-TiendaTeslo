import type { User } from "@/interfaces/userInterface";

// Login, Register, CheckStatus
export interface AuthResponse {
  user: User;
  token: string;
}

import { env } from "@/env";

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
}

export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d" as const,
  },
};

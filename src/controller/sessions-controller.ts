import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { prisma } from "@/database/prisma";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError("Email ou senha inválido", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email ou senha inválido", 401);
    }

    const secret: Secret = authConfig.jwt.secret as Secret;

    const options: SignOptions = {
      subject: user.id.toString(),
      expiresIn: authConfig.jwt.expiresIn,
    };

    const token = jwt.sign(
      { role: user.role ?? "member" },
      secret,
      options
    );

    const { password: _, ...userWithoutPassword } = user;

    return res.json({ token, user: userWithoutPassword });
  }
}

export { SessionsController };

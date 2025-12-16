import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({
        error: (email) => email.input === undefined ? "Email es requerido"
                                                    : "Formato de email inválido"
    }),
    password: z
            .string('Contraseña requerida')
            .min(6, 'El password debe tener al menos 6 caracteres')
            .max(20, 'Password demaciado largo'),
});
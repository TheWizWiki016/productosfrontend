import { z } from "zod";

export const registerSchema = z.object({
    username: z
    .string('Nombre de usuario requerido')
    .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
    .max(20, 'El nombre de usuario no puede tener más de 20 carácteres')
    .regex(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras números y guiones bajos'),

    email: z.email({
        error: (email) => email.input === undefined ? "Email es requerido" : "Formato de email inválido"
    }),
    password: z
    .string('Contraseña requerida')
    .min(6, 'El password debe tener al menos 6 caracteres')
    .max(20, 'Password demaciado largo'),

    confirm: z
    .string('Confirma la contraseña')
    .min(6, 'La confirmación debe tener al menos 6 caracteres')
    .max(20, 'La confirmacion demaciado largo')
})
.refine( (data)=> data.password === data.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ["confirm"]
});
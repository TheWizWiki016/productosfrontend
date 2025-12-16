import { z } from 'zod';

export const addressSchema = z.object({
    name: z.string()
        .min(2, { message: 'El nombre debe tener al menos 2 caracteres' })
        .max(50, { message: 'El nombre no puede exceder 50 caracteres' })
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
            message: 'El nombre solo puede contener letras y espacios'
        }),

    address: z.string()
        .min(10, { message: 'La dirección debe tener al menos 10 caracteres' })
        .max(200, { message: 'La dirección no puede exceder 200 caracteres' })
        .regex(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,#-]+$/, {
            message: 'La dirección contiene caracteres no válidos'
        }),

    phone: z.string()
        .min(10, { message: 'El teléfono debe tener al menos 10 dígitos' })
        .max(15, { message: 'El teléfono no puede exceder 15 dígitos' })
        .regex(/^[\d\s+\-()]+$/, {
            message: 'Formato de teléfono inválido. Use solo números, espacios, +, -, (, )'
        })
        .transform((val) => val.replace(/\s+/g, ''))
        .refine((val) => {
            const digitsOnly = val.replace(/\D/g, '');
            return digitsOnly.length >= 10;
        }, { message: 'El teléfono debe contener al menos 10 dígitos' })
});

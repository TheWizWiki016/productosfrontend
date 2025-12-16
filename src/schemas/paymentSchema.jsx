import {z} from 'zod';

//Funcion para validar algoritmo de Luhn
export const validateCard = (numero) => {
    const cleanNum = numero.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;

    for (let i = cleanNum.length - 1; i >= 0; i--){
        let digit = parseInt(cleanNum.charAt(i), 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
}; //Fin de validar 

//Esquema para recoger en tienda 
const pickupSchema = z.object({
    paymentMethod : z.literal('pickup'),
    userName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre es demasiado largo'),
}); //Fin de pickUpSchema

const cardSchema = z.object({
    paymentMethod : z.literal('card'), 
    cardName: z.string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener sl menos 2 caracteres')
    .max(50, 'El nombre es demasiado largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),

    cardNumber: z.string()
    .min(1, 'El numro de tarjeta es requerido')
    .transform(val => val.replace(/\s/g, ''))
    .refine(val => /^\d+$/.test(val), 'Solo se permiten numeros')
    .refine(val => val.length >= 13 && val.length <=19, 'Longitud invalida')
    .refine(val => validateCard(val), 'Numero de tarjeta invalido'),


    //Validacion de fecha de expiracion (MM/YY)
    expirationDate: z.string()
    .min (1, 'La fecha de expiracion es requerida')
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Formato invalido (MM/YY)')
    .refine((date) => {
        const [month, year] = date.split('/');
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;


    // Convertir a numeros 
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    //Validar que no sea una fecha pasada 
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
    }, 'La tarjeta esta expirada o la fecha es invalida'),


    //Validacion de CCV 
    ccv: z.string()
    .min(1, 'El CCV es requerido')
    .regex(/^\d+$/, 'Solo se permiten numeros')
    .refine(val => val.length === 3, 'CCV debe tener 3 digitos '),

}); //Fin de cardSchema

//Esquema combinado con union discriminada
export const paymentSchema = z.discriminatedUnion('paymentMethod',[
    pickupSchema,
    cardSchema
]); 
import {object, z} from "zod";

export const LoginSchema = object({
    email: z.string().email({
        message: "Введите адрес электронной почты"
    }),
    password: z.string().min(1, {
        message: "Введите пароль"
    })
})

export const RegisterSchema = object({
    email: z.string().email({
        message: "Введите адрес электронной почты"
    }),
    password: z.string().min(6, {
        message: "Пароль должен содердать не менее 6 символов"
    }),
    name: z.string().min(1, {
        message: "Введите имя"
    })
})
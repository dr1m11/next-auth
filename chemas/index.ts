import {object, z} from "zod";

export const LoginSchema = object({
    email: z.string().email({
        message: "Введите адрес электронной почты"
    }),
    password: z.string().min(1, {
        message: "Введите пароль"
    })
})

export const ResetSchema = object({
    email: z.string().email({
        message: "Введите адрес электронной почты"
    }),
})

export const NewPasswordSchema = object({
    password: z.string().min(6, {
        message: "Пароль должен содержать не менее 6 символов"
    }),
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
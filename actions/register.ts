'use server'
import * as z from 'zod'
import {RegisterSchema} from "@/chemas";
import bcrypt from "bcrypt"
import {db} from "@/lib/db";
import {getUserByEmail, getUserById} from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success)
        return {error: "Invalid fields"}

    const { email, name, password} = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser)
        return {error: "Адрес электронной почты занят"}

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })



    return {success: "Аккаунт создан!"}
}
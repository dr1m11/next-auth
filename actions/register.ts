'use server'
import * as z from 'zod'
import {RegisterSchema} from "@/chemas";
import bcrypt from "bcrypt"
import {db} from "@/lib/db";
import {getUserByEmail, getUserById} from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

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

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: "Письмо с подтверждением отправлено на ваш Email!"}
}
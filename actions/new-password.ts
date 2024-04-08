"use server"
import * as z from 'zod'
import {NewPasswordSchema} from "@/chemas";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";
import bcrypt from "bcryptjs";
import {getUserByEmail} from "@/data/user";
import {db} from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return {error: "Токен отсутствует"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Неверные данные!"}
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        return {error: "Неверный токен!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired) {
        return {error: "Время действия токена вышло!"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return {error: "Email отсутствует"}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id }
    })

    return {success: "Пароль обновлен!"}
}
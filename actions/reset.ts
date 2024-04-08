"use server"

import * as z from 'zod'
import {ResetSchema} from "@/chemas";
import {getUserByEmail} from "@/data/user";
import {generatePasswordResetToken} from "@/lib/tokens";
import {sendPasswordResetEmail} from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Неверный Email"}
    }

    const { email } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {error: "Email не найден"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return {success: "Сообщение с восстановлением отправлено на ваш Email"}
}
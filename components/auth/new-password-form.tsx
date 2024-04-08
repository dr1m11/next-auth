"use client"

import {CardWrapper} from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import * as z from 'zod'
import {NewPasswordSchema} from "@/chemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {newPassword} from "@/actions/new-password";
import {useState, useTransition} from "react";
import {useSearchParams} from "next/navigation";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }


    return (
        <CardWrapper
            headerLabel={'Введите новый пароль?'}
            backButtonLabel={"Войти в аккаунт"}
            backButtonHref={"/auth/login"}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                    <div className={"space-y-4"}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"******"} type={"password"} disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} name={"password"} control={form.control}/>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type={"submit"} className={'w-full'} disabled={isPending}>
                        Сбросить пароль
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
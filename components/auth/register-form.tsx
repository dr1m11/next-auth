"use client"

import {CardWrapper} from "@/components/auth/card-wrapper";
import {useForm} from "react-hook-form";
import * as z from 'zod'
import {RegisterSchema} from "@/chemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";
import {useState, useTransition} from "react";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }


    return (
        <CardWrapper
        headerLabel={'Создайте аккаунт!'}
        backButtonLabel={"Уже есть аккаунт?"}
        backButtonHref={"/auth/login"}
        showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
                    <div className={"space-y-4"}>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Имя</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"Иван Иванов"} disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} name={"name"} control={form.control}/>
                        <FormField render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder={"example@email.com"} type={"email"} disabled={isPending}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} name={"email"} control={form.control}/>
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
                        Создать аккаунт
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

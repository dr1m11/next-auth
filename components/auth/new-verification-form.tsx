"use client"
import {CardWrapper} from "@/components/auth/card-wrapper";
import {BeatLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/actions/new-verification";
import {FormSuccess} from "@/components/form-success";
import {FormError} from "@/components/form-error";

const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const searchParams = useSearchParams()

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Токен входа отсутствует")
            return
        }

        newVerification(token).then((data) => {
            setSuccess(data.success)
            setError(data.error)
        }).catch(() => {
            setError("Упс.. Что-то пошло не так :(")
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <CardWrapper headerLabel={"Подвердите вашу регистрацию"} backButtonHref={'/auth/login'} backButtonLabel={'Войдите в ваш аккаунт'}>
            <div className={'flex items-center w-full justify-center'}>
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    );
};

export default NewVerificationForm;
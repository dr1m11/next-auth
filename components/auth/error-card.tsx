import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Header} from "@/components/auth/header";
import {BackButton} from "@/components/auth/back-button";

const ErrorCard = () => {
    return (
        <Card className={'w-[400px] shadow-md'}>
            <CardHeader>
                <Header label={"Упс! Кажется что-то пошло не так :("} />
            </CardHeader>
            <CardFooter>
                <BackButton href={"/auth/login"} label={"Вернуться к авторизации"} />
            </CardFooter>
        </Card>
    );
};

export default ErrorCard;
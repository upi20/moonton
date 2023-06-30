import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (<>
        <Head title="Sign In" />
        <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
            <div className="fixed top-[-50px] hidden lg:block">
                <img src="/assets/images/signup-image.png" className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]" alt="" />
            </div>
            <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                <div>
                    <img src="/assets/images/moonton-white.svg" alt="" />
                    <div className="my-[70px]">
                        <div className="font-semibold text-[26px] mb-3">
                            Welcome Back
                        </div>
                        <p className="text-base text-[#767676] leading-7">
                            Explore our new movies and get <br />
                            the better insight for your life
                        </p>
                    </div>
                    <form className="w-[370px]" onSubmit={submit}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label
                                    forInput="email"
                                    value="Email Address"
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="input-primary"
                                    placeholder="Email Address"
                                    handleChange={(e) => setData('email', e.target.value)}
                                    value={data.email}
                                    isError={errors.email}
                                />
                            </div>
                            <div>
                                <Label
                                    forInput="password"
                                    value="Password"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="input-primary"
                                    placeholder="Password"
                                    handleChange={(e) => setData('password', e.target.value)}
                                    value={data.password}
                                    isError={errors.password}
                                />
                            </div>
                        </div>
                        <div className="grid space-y-[14px] mt-[30px]">
                            <Button type="submit" variant="primary" processing={processing}>
                                <span className="text-base font-semibold">
                                    Start Watching
                                </span>
                            </Button>

                            <Link href={route('register')}>
                                <Button type="button" variant="light-outline">
                                    <span className="text-base font-semibold">
                                        Create New Account
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import dotenv from "dotenv";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import CustomFormField from "./CustomFormField";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authSchema } from "@/app/validation";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
dotenv.config();

interface AuthFormType {
  type: "sign-up" | "sign-in" | "reset-password" | "change-password";
  title: string;
  description: string;
}

const AuthForm = ({ type, title, description }: AuthFormType) => {
  const authFormSchema: any = authSchema(type);
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      rememberMe: false,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useUserContext();
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [emaillAddress, setEmaillAddress] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isCheckedRemember, setIsCheckedRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Define a submit handler.
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("remember_me") === "true";
    const savedEmail = JSON.parse(localStorage.getItem("email") || '""');
    const savedPassword = JSON.parse(localStorage.getItem("password") || '""');

    setIsCheckedRemember(savedRememberMe);
    setEmail(savedEmail);
    setPassword(savedPassword);

    if (savedRememberMe) {
      form.setValue("email", savedEmail, { shouldValidate: true });
      form.setValue("password", savedPassword);
    }
  }, []);
  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true);
    let data = {};
    data =
      type === "change-password"
        ? {
            token,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
          }
        : values;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/${type}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    const body = await response.json();
    if (response.ok) {
      setIsCheckedRemember(body.data.user.rememberMe);
      if (type === "sign-in" || type === "sign-up") {
        if (JSON.stringify(body.data.user.rememberMe) && type === "sign-in") {
          localStorage.setItem("email", JSON.stringify(body.data.user.email));
          localStorage.setItem("password", JSON.stringify(body.data.user.password));
          localStorage.setItem("auth_token", JSON.stringify(body.data.token));
          localStorage.setItem("remember_me", JSON.stringify(isCheckedRemember));
          localStorage.setItem("user", JSON.stringify(body.data.user));
        } else {
          sessionStorage.setItem("auth_token", JSON.stringify(body.data.token));
          sessionStorage.setItem("user", JSON.stringify(body.data.user));
        }
        const token = localStorage.getItem("auth_token");
        const user = localStorage.getItem("user");
        login(token!, user);
        router.push("/");
      }
      if (type === "reset-password") {
        setEmaillAddress(values.email);
        setIsSendEmail(true);
      }

      setIsLoading(false);
      setTimeout(() => {
        toast.success(body.message || `${type === "sign-up" ? "Signed up" : type === "sign-in" ? "Signned in" : type === "reset-password" ? "Send email" : "changed password"} successfully`);
      }, 3000);
      if (values.rememberMe === false) {
        form.reset();
      }
    } else {
      setEmaillAddress("");
      setIsSendEmail(false);
      setIsLoading(false);
      setTimeout(() => {
        toast.warning(body.error || "Something went wrong");
      }, 3000);
      if (values.rememberMe === false) {
        form.reset();
      }
    }
    return body;
  }

  let submitButton = "";
  type === "sign-in" ? (submitButton = "Sign In") : type === "sign-up" ? (submitButton = "Sign Up") : type === "change-password" ? (submitButton = "Reset Now") : (submitButton = "Send");

  const handleAuthenticationWithGoogle = async () => {
    setIsAuthenticating(true);
    window.location.href = "http://localhost:5500/api/v1/auth/google";
    setIsAuthenticating(false);
  };

  return (
    <div className="auth-form">
      <div className="header-form">
        <h1 className=" font-semibold text-[28px] lg:text-[38px] xl:text-[48px] text-center text-[rgb(38,38,38)]">{title}</h1>
        <p className="font-normal text-sm lg:text-[16px] xl:text-[18px] text-center text-[#4C4C4D] ">{description}</p>
      </div>
      <div className="content-form">
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <div className="form-sign-up">
                  <CustomFormField control={form.control} name="fullname" />
                  <CustomFormField control={form.control} name="email" />
                  <CustomFormField control={form.control} name="password" />
                  <div className="flex items-center space-x-2">
                    <Checkbox required id="terms" />
                    <label htmlFor="terms" className="text-sm xl:text-[16px] 2xl:text-[18px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <p className=" text-wrap">
                        I agree with{" "}
                        <Link href={"/term-of-use"} className=" underline hover:opacity-75 hover:text-blue-500">
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link href={"/privacy-policy"} className=" underline hover:opacity-75 hover:text-blue-500">
                          Privacy Policy
                        </Link>
                      </p>
                    </label>
                  </div>
                </div>
              )}
              {type === "sign-in" && (
                <div className="form-sign-in">
                  <CustomFormField control={form.control} name="email" isChecked={isCheckedRemember} value={email} onChange={(value) => setEmail(value as string)} />
                  <div className="flex flex-col gap-[10px]">
                    <CustomFormField control={form.control} name="password" isChecked={isCheckedRemember} value={password} onChange={(value) => setPassword(value as string)} />
                    <Link href={"/reset-password"} className="hover:text-blue-500 hover:underline flex justify-end mt-0">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="2xl:space-y-4 space-y-3">
                          <FormControl>
                            <div className="flex gap-2 items-center">
                              <Checkbox
                                checked={isCheckedRemember}
                                onCheckedChange={(checked: boolean) => {
                                  field.onChange(checked);

                                  setIsCheckedRemember(checked);
                                }}
                                id="remember-me"
                              />
                              <label htmlFor="remember-me" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Remember Me
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              {type === "reset-password" && (
                <div className={`form-sign-in `}>
                  <CustomFormField control={form.control} name="email" />
                  {isSendEmail && (
                    <div className="flex gap-2">
                      <BadgeCheck color="green" />
                      <div className="flex">
                        <span className=" text-[16px] font-normal">
                          Send email successfully and check
                          <span className=" font-semibold italic"> {emaillAddress}</span>
                          <span> to change password</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {type === "change-password" && (
                <div className="form-sign-in">
                  <CustomFormField control={form.control} name="password" />
                  <CustomFormField control={form.control} name="passwordConfirm" />
                </div>
              )}

              <Button disabled={isLoading} className="bg-[rgb(255,149,0)] h-[56px] w-full py-[16px] px-[24px] rounded-[8px] text-white text-sm font-medium hover:bg-opacity-75" type="submit">
                {isLoading ? (
                  <>
                    <Loader2 /> Loading...
                  </>
                ) : (
                  submitButton
                )}
              </Button>
            </form>
          </Form>
        </div>
        {type !== "reset-password" && type !== "change-password" && (
          <div className="flex justify-center items-center gap-3">
            <hr className="text-[#E4E4E7] border w-full" />
            <span className="text-[#98989A]">OR</span>
            <hr className="text-[#E4E4E7] border w-full" />
          </div>
        )}
        {type !== "reset-password" && type !== "change-password" && (
          <div className="authentication-social">
            <Button
              onClick={() => handleAuthenticationWithGoogle()}
              className=" flex gap-[14px] text-center justify-center w-full rounded-[8px] py-[16px] px-[24px] bg-[#F7F7F8] border border-[#F1F1F3] h-[56px] hover:bg-opacity-75"
            >
              {isAuthenticating ? (
                <>
                  <Loader2 /> Loading...
                </>
              ) : (
                <>
                  <img src="/assets/icons/google-icon.svg" alt="google-icon" />
                  {`${type === "sign-up" ? "Sign Up" : "Sign In"} with Google`}
                </>
              )}
            </Button>
          </div>
        )}
        {type === "sign-up" && (
          <div className="flex gap-[6px] justify-center items-center text-[16px] font-normal">
            <div className="flex gap-1">
              <p className=" text-[16px] font-normal ">Already have an account?</p>
              <span className="text-[16px] font-medium underline">Login</span>
            </div>
            <img className="hover:opacity-75 hover:text-blue-600 cursor-pointer w-[20px] h-[20px]" onClick={() => router.push("/sign-in")} src="/assets/icons/arrow-icon.svg" alt="arrow-icon" />
          </div>
        )}
        {type === "sign-in" && (
          <div className="flex gap-[6px] justify-center items-center text-[16px] font-normal">
            <div className="flex gap-1">
              <p className=" text-[16px] font-normal ">Don’t have an account? </p>
              <span className="text-[16px] font-medium underline">Sign Up</span>
            </div>
            <img className="hover:bg-opacity-75 hover:text-blue-600 cursor-pointer" onClick={() => router.push("/sign-up")} src="/assets/icons/arrow-icon.svg" alt="arrow-icon" />
          </div>
        )}
      </div>
    </div>
  );
};
const AuthFormPage = ({ type, title, description }: AuthFormType) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm type={type} title={title} description={description} />
    </Suspense>
  );
};

export default AuthFormPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/hooks/use-store';
import { loginUser } from '@/store/slices/auth.actions';
import { setAuthorizationHeader } from '@/lib/api/handler';
import axios from 'axios';
import { __config } from '@/lib/config';

export function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isSignEnabled, setIsSignEnabled] = useState(false)
  const [isDisbled, setIsDisbled] = useState(false)
  const { toast } = useToast();
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm<{ email: string; password: string, name?: string }>();
  const handleLogin = async (value: { email: string; password: string }) => {
    try {
      const { data } = await axios.post(__config.API_URL+"/api/v1/login", { data: value })
      if (!data.success) {
        throw new Error(data.message)
      }
      toast({ title: data.message, variant: "default" })
      localStorage.setItem("token", data.result.access_token)
      dispatch(loginUser(data.result.user, data.result.access_token))
      setAuthorizationHeader(data.result.access_token)
      return navigate("/")
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    } finally {
      setIsDisbled(false)
    }
  }
  const handleRegister = async (value: { email: string; password: string, name: string }) => {
    try {
      const { data } =  await axios.post(__config.API_URL+"/api/v1/login", { data: value })
      if (!data.success) {
        throw new Error(data.message)
      }
      toast({ title: data.message, variant: "default" })
      setIsSignEnabled(false)
      reset()
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" })
    } finally {
      setIsDisbled(false)
    }
  }
  const onSubmit = async (value: { email: string; password: string, name?: string }) => {
    setIsDisbled(true)
    if (isSignEnabled) {
      handleRegister({ ...value, name: value.name! })
      return
    }
    handleLogin(value)
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {
              isSignEnabled && <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
            }
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <NavLink to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </NavLink>
              </div>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button disabled={isDisbled} type="submit" className="w-full">
              {isDisbled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignEnabled ? "Sign up" : "Login"}

            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {!isSignEnabled ? (<>
              Don&apos;t have an account?{" "}
              <span onClick={() => setIsSignEnabled(true)} className="underline cursor-pointer">
                Sign up
              </span></>) : (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsSignEnabled(false)} className="underline cursor-pointer">
                  Login
                </span>
              </>
            )}

          </div>
        </form>
      </CardContent>
    </Card>
  );
}

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEmailLoginMutation, useGoogleSignupMutation } from "../store";
import { useNavigate } from "react-router-dom";
import { IUserSignInData } from "../types/interface";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const initialState: IUserSignInData = {
    email: "khondokoralam@gmail.com",
    password: "1234567",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [emailLogin] = useEmailLoginMutation();
  const [googleSignup] = useGoogleSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(emailLogin(data).unwrap(), {
        pending: "Logging in...",
        success: "Login successful",
        error: "Login failed",
      })
      .then(() => setData(initialState))
      .then(() => navigate("/profile"))
      .catch((err) => toast.error(err));
  };

  const GoogleAuth = async () =>
    await toast
      .promise(googleSignup(null).unwrap(), {
        pending: "Creating user...",
        success: "Successfully created user!",
        error: "Could not create user!",
      })
      .then(() => navigate("/profile"))
      .catch((err) => toast.error(err));

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Please provide email & password to Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                  placeholder="john doe"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="******"
                  value={data?.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="button"
                variant="link"
                size="sm"
                className="text-xs"
                onClick={()=>navigate("/forgot-password")}
              >
                Forgot Password
              </Button>
              <Button variant="secondary" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Separator className="h-[2px] w-24" />
            <p>or</p>
            <Separator className="h-[2px] w-24" />
          </div>
          <Button onClick={GoogleAuth} variant="default" className="w-full">
            Google Login
          </Button>
          <Link to="/signup" className="text-xs my-2 text-primary">
            Don't have account ? Signup
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;

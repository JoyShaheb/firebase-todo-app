import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEmailSignupMutation, useGoogleSignupMutation } from "../store";
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

const Signup = () => {
  const initialState: IUserSignInData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [data, setData] = useState(initialState);

  const [emailSignup] = useEmailSignupMutation();
  const [googleSignup] = useGoogleSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(emailSignup(data).unwrap(), {
        pending: "Creating user...",
        success: "User created successfully",
        error: "Error creating user",
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
      .then((res) => console.log(res))
      .then(() => navigate("/profile"))
      .catch((err) => toast.error(err));

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup for a new profile</CardTitle>
          <CardDescription>
            Please provide email & password to Signup
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
                  placeholder="johndoe@gmail.com"
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
              <Button variant="secondary" className="w-full">
                Signup
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
            Google Signup
          </Button>
          <Link to="/login" className="text-xs my-2 text-primary">
            Already have an account ? Login
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Signup;

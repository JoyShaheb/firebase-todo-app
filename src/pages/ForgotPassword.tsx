import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSendResetPassWordEmailMutation } from "../store";
import { IUserSignInData } from "../types/interface";
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

const ForgotPassword = () => {
  const initialState: Pick<IUserSignInData, "email"> = {
    email: "khondokoralam@gmail.com",
  };

  const [data, setData] = useState(initialState);

  const [sendResetPassWordEmail] = useSendResetPassWordEmailMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast
      .promise(
        sendResetPassWordEmail({
          email: data.email,
        }).unwrap(),
        {
          pending: "Sending email...",
          success: "Email Sent! Please Check your Mail",
          error: "Failed to send email!",
        }
      )
      .then(() => setData(initialState))
      .catch((err) => console.log(err));
  };

  return (
    <section className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Please provide Email to Reset password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 my-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                  placeholder="johndoe@gmail.com"
                />
              </div>
            </div>
            <Button type="submit" variant="secondary" className="w-full">
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPassword;

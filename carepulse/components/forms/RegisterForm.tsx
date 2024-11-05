"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormFeild from "../CustomFormFeild";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation as formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { FormFieldType } from "./PatientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone:user.phone
    }
  });

  // 2. Define a submit handler.
  const onSubmit = async ({
    name,
    email,
    phone
  }: z.infer<typeof formSchema>) => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="mb-12 space-y-4">
          <h1 className="header ">Welcome👨🏻‍⚕️</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        {/* name */}
        <CustomFormFeild
          fieldType={FormFieldType.INPUT}
          placeholder="Kratos"
          name="name"
          control={form.control}
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormFeild 
        fieldType={FormFieldType.INPUT}
        label="Email"
        placeholder="Kratos@gmail.com"
        name="email"
        control={form.control}
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <CustomFormFeild 
        fieldType={FormFieldType.PHONE_INPUT}
        label="Phone No."
        placeholder="2476809"
        name="phone"
        control={form.control}
        />  
        </div>
        


        <SubmitButton isLoading={isLoading}>Get Started </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;

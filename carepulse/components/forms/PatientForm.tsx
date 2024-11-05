"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormFeild from "../CustomFormFeild"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation as formSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"

//Using an enum rather than a simple string type in the customFormField 
//component interface provides stricter type checking. With a plain string,
// incorrect values (e.g., fieldType="intp") won’t raise an error.
// However, using an enum enforces specific allowable values at compile-time,
// catching any invalid assignment immediately.
export enum FormFieldType{
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton"
}
 



 
const PatientForm = () => {

  const[isLoading, setIsLoading] = useState(false);
  const router = useRouter() ;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email:"",
      phone:""
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async ({name, email, phone}: z.infer<typeof formSchema>) => {

    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
      }
      // const user = await createUser(userData);
      // if(user) router.push(`/patients/${user.$id}/register`)
      const newUser = await createUser(userData);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
      
    } catch (error) {
      console.log(error)
    }


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header ">Hii There 👩🏻‍⚕️</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormFeild 
        fieldType={FormFieldType.INPUT}
        label="Full Name"
        placeholder="Kratos"
        name="name"
        description="This is your public UserName"
        control={form.control}
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
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

        <SubmitButton isLoading={isLoading}>Get Started </SubmitButton>

      </form>
    </Form>
  )
}

export default PatientForm

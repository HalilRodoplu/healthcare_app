"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {useRouter} from "next/navigation";
import {useState} from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"


import {Form, FormControl} from "@/components/ui/form";
import {createUser} from "@/lib/actions/patient.actions";
import {UserFormValidation} from "@/lib/validation";

import "react-phone-number-input/style.css"
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import {FormFieldType} from "@/components/forms/PatientForm";
import {RadioGroup} from "@/components/ui/radio-group";
import {genderOptions} from "@/constants";
import {RadioGroupItem} from "@radix-ui/react-radio-group";
import {Label} from "@/components/ui/label";




const RegisterForm = ({user}: {user: User}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {

        setIsLoading(true);

        try {

            const userData = {name, email, phone}
            const user = await createUser(userData)

            if (user) router.push(`/patients/${user.$id}/register`)

        } catch (error){
            console.log(error)
        }
    }
    return(
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                    <section className="space-y-4">
                        <h1 className="header">Welcome 👋</h1>
                        <p className="text-dark-700">Let us know more about yourself.</p>
                    </section>

                    <section className="space-y-4">
                        <div className="mb-9 space-y-1">
                            <h2 className="sub-header">Personal Information</h2>
                        </div>
                    </section>

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="example@example.ex"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={form.control}
                            name="phone"
                            label="Phone Number"
                            placeholder="(333) 333-3333"

                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name="birthDate"
                            label="Date of Birth"
                            placeholder="example@example.ex"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="Gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {genderOptions.map((option) => (
                                            <div
                                                key={option}
                                                className="radio-group"
                                            >
                                                <RadioGroupItem value={option} id={option}/>
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}

                        />
                    </div>


                    <SubmitButton
                        isLoading={isLoading}

                    >
                        Get Started
                    </SubmitButton>
                </form>
            </Form>
        </div>
    )
};

export default RegisterForm;
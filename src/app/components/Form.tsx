"use client";

import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { create } from "../action";

// ------------------------------------
export default function FormElement() {

    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction] = useFormState(create, null)

    function SubmitButton() {
        const { pending } = useFormStatus();  

        return (
            <button
                type="submit"
                className="bg-green-500 rounded-lg mt-2 text-white py-2"
            >
                {pending ? "Saving..." : "Save"}
            </button>
        )
    }

    return (
        <form 
            className="flex flex-col"
            // action={create} 
            action={async (formData: FormData) => {
                // await create(formData)
                formAction(formData)
                formRef.current?.reset()
            }}
            ref={formRef}
        >
            <label className="text-lg font-bold">Todo: </label>
            <input 
            type="text" 
            name="input" 
            className="border p-1 border-gray-800"
            placeholder="topic anything..."
            />
            <SubmitButton />

            <p className="text-red-5000">{state as string}</p>
        </form>        
    )
}
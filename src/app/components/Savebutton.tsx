"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton() {
  
    const { pending } = useFormStatus();
  
  return (
    // <button type="submit" className="border bg-green-400 rounded-md">Save</button>
    <button type="submit" className="border bg-green-400 rounded-md">
        {pending ? "Saving..." : "Save"}
    </button>
  );
}

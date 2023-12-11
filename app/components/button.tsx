'use client'

import { useFormStatus } from "react-dom";

export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="text-white text-sm bg-[#005FA8] hover:bg-[#EF403A] px-4 py-2 rounded-md my-8 font-bold disabled:cursor-not-allowed disabled:bg-gray-700 disabled:bg-gradient-to-r disabled:from-gray-700'"
      type="submit"
    >
      {pending ? "Sending message ..." : "Send Message"}
    </button>
  );
}
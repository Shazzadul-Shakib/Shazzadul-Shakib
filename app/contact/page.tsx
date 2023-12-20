'use client'
import { Submit } from "@/actions/contact";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/button";

export default function Contact() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <main id="contact" className="mt-16">
      <div className="w-[90%] mx-auto pb-4 my-14 rounded-md text-white ">
        <h1 className="w-[40%] mx-auto text-center text-2xl font-bold pb-2 mb-4 border-b-2 border-[#EF403A] md:w-[20%]">
          Let's Talk.
        </h1>
        <p className="text-center">About new project, work or technology</p>
      </div>
      <section>
        <form
          ref={ref}
          action={async (FormData) => {
            await Submit(FormData);
            toast.success("Message Sent !", {
              position: toast.POSITION.TOP_CENTER,
            });

            ref.current?.reset();
          }}
          className=" w-[70%] mx-auto md:w-[30%]"
        >
          <div>
            <label className=" text-sm text-white" htmlFor="name">
              Name*
            </label>
            <div>
              <input
                className="w-full p-1 border-b-2 outline-none bg-inherit text-white focus:border-[#005FA8] text-xs"
                autoComplete="off"
                name="name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="my-5">
            <label className=" text-sm text-white" htmlFor="email">
              Email*
            </label>
            <div>
              <input
                className="w-full p-1 border-b-2 outline-none bg-inherit text-white focus:border-[#005FA8] text-xs"
                autoComplete="off"
                name="email"
                type="email"
                required
              />
            </div>
          </div>
          <div>
            <label className=" text-sm text-white" htmlFor="message">
              Message *
            </label>
            <div>
              <textarea
                className="w-full p-1 border-b-2 outline-none bg-inherit text-white focus:border-[#005FA8] text-xs"
                autoComplete="off"
                name="message"
                cols={30}
                rows={8}
                required
              />
            </div>
          </div>
          <Button />
        </form>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}

export default function Contact() {
  return (
    <main id="contact">
      <div className="w-[90%] mx-auto pb-4 my-14 rounded-md text-white ">
        <h1 className="w-[20%] mx-auto text-center text-2xl font-bold pb-2 mb-10 border-b-2 border-[#EF403A] ">
          Let's Talk.
        </h1>
      </div>
      <section>
        <form className=" w-[70%] mx-auto md:w-[30%]">
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
              />
            </div>
          </div>
          <input
            className="text-white text-sm bg-[#005FA8] hover:bg-[#EF403A] px-4 py-2 rounded-md my-8 font-bold"
            type="submit"
            value="Send Message"
          />
        </form>
      </section>
    </main>
  );
}

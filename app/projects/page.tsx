import Image from "next/image";

export default function Projects() {
  return (
    <main
      id="projects"
      className=" w-[90%] mx-auto min-h-screen mb-10 text-white md:w-[70%] "
    >
      <h1 className="w-[40%] mx-auto text-center text-2xl font-bold pb-2 mb-10 border-b-2 border-[#EF403A] md:w-[15%]">
        Projects
      </h1>
      <section>
        {/* Project-1 */}
        <div className="flex flex-col gap-3 my-5 md:my-10 md:flex-row-reverse md:gap-10">
          <div className=" h-[250px] border-2 relative overflow-hidden rounded-md md:w-[35%]">
            <Image
              src="/petplanetoid.png"
              width={450}
              height={750}
              className="h-full object-contain hover:scale-150 ease-in-out duration-300"
              priority={true}
              alt="Project2"
            />
          </div>
          <div className=" min-h-[250px] flex flex-col justify-center items-center md:w-[60%]">
            <div>
              <div>
                <h1 className="text-[#EF403A] text-xl font-bold">
                  Pet-Planetoid
                </h1>
                <p className="text-white text-sm my-3">
                  This web application is fully responsive and functional. You
                  can effortlessly add posts featuring images of your pets and
                  engage with them through likes and comments. Access to certain
                  routes is protected, requiring sign-in and email verification.
                  Within these protected routes, you can create posts, view
                  others' content, and interact with them by liking and
                  commenting. Additionally, you can explore users' profiles to
                  see the posts and personal information they have shared.
                </p>
              </div>
              <div className="text-center flex flex-col gap-3 justify-end items-center mt-5 md:flex-row">
                <div className=" w-full flex flex-col gap-3 md:flex-row md:w-auto">
                  <a
                    href="https://github.com/Shazzadul-Shakib/Pet-Planetoid-Client"
                    target="_blank"
                    className=" font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Client Side Code
                  </a>
                  <a
                    href="https://github.com/Shazzadul-Shakib/Pet-Planetoid-Server"
                    target="_blank"
                    className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Server Side Code
                  </a>
                </div>
                <div className="flex w-full md:w-auto">
                  <a
                    href="https://pet-planetoid.web.app/"
                    target="_blank"
                    className="flex-1 font-bold text-white text-sm bg-[#EF403A] px-4 py-2 rounded-md mx-2"
                  >
                    Live Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Project-2 */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-10">
          <div className=" h-[250px] border-2 relative overflow-hidden rounded-md md:w-[35%]">
            <Image
              src="/dobotdone.png"
              width={450}
              height={750}
              className="h-full object-contain hover:scale-150 ease-in-out duration-300"
              priority={true}
              alt="Project1"
            />
          </div>
          <div className=" min-h-[250px] flex flex-col justify-center items-center md:w-[60%]">
            <div>
              <div>
                <h1 className="text-[#EF403A] text-xl font-bold">
                  Do-Bot-Done
                </h1>
                <p className="text-white text-sm my-3">
                  Do-Bot-Done is an amaizing web application that efficiently tracks your daily to-dos,
                  allowing you to seamlessly add, update, and delete tasks as
                  needed. It provides a convenient way to monitor your daily
                  activities. Please note that this version is still in
                  development and not yet stable; I am actively working on
                  enhancements to ensure a more reliable and robust version in
                  the future.
                </p>
              </div>
              <div className="text-center flex flex-col gap-3 justify-end items-center mt-5 md:flex-row">
                <div className=" w-full flex flex-col gap-3 md:flex-row md:w-auto">
                  <a
                    href="https://github.com/Shazzadul-Shakib/Do-Bot-Done-Client"
                    target="_blank"
                    className=" font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Client Side Code
                  </a>
                  <a
                    href="https://github.com/Shazzadul-Shakib/Do-Bot-Done-Server"
                    target="_blank"
                    className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Server Side Code
                  </a>
                </div>
                <div className="flex w-full md:w-auto">
                  <a
                    href="https://do-bot-done.web.app/"
                    target="_blank"
                    className="flex-1 font-bold text-white text-sm bg-[#EF403A] px-4 py-2 rounded-md mx-2"
                  >
                    Live Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

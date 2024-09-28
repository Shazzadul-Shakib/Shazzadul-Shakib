import Image from "next/image";

export default function Projects() {
  return (
    <main
      id="projects"
      className=" w-[90%] mx-auto mb-10 text-white md:w-[70%] "
    >
      <h1 className="w-[40%] mx-auto text-center text-2xl font-bold pb-2 mb-10 border-b-2 border-[#EF403A] md:w-[15%]">
        Projects
      </h1>
      <section className="grid gap-10">
        {/* Project-1 */}
        <div className="flex flex-col gap-3 my-5 md:my-10 md:flex-row justify-center items-center md:gap-10">
          <div className=" h-[250px] border-2 relative overflow-hidden rounded-md md:w-[35%]">
            <Image
              src="/zbotdashboard.png"
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
                <h1 className="text-[#EF403A] text-xl font-bold">Z-BOT</h1>
                <p className="text-white mt-3 text-lg">
                  This web application allows users to efficiently manage both
                  projects and financial records. Users can create, track, and
                  update project details, manage income, expenses, and savings
                  to monitor monthly financial performance. The system features
                  secure user authentication with JWT and bcrypt, email
                  verification, project and task management, and the ability to
                  delete unnecessary tasks. It also offers wallet management,
                  allowing users to categorize and track expenses by wallet and
                  filter them by month for detailed insights. Automatic wallet
                  updates ensure accurate balances, while savings and debt
                  history can be archived for better record keeping.
                </p>
                <p className=" text-[#EF403A] my-2">
                  Technology used :{" "}
                  <span className="text-sm text-white">
                    React · Tailwind · Shadcn · Redux · Node.js · Express.js ·
                    TypeScript · MongoDB · Mongoose · RTK Query · JSON Web
                    Token(JWT)
                  </span>
                </p>
              </div>
              <div className="text-center flex flex-col gap-3 justify-end items-center mt-5 md:flex-row">
                <div className=" w-full flex flex-col gap-3 md:flex-row md:w-auto">
                  <a
                    href="https://github.com/Shazzadul-Shakib/Z-BOT_Client"
                    target="_blank"
                    className=" font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Client Side Code
                  </a>
                  <a
                    href="https://github.com/Shazzadul-Shakib/Z-BOT_Server"
                    target="_blank"
                    className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Server Side Code
                  </a>
                </div>
                <div className="flex w-full md:w-auto">
                  <a
                    href="https://z-bot-client.vercel.app/"
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
        <div className="flex flex-col gap-3 my-5 md:my-10 md:flex-row-reverse md:gap-10">
          <div className=" h-[250px] border-2 relative overflow-hidden rounded-md md:w-[35%]">
            <Image
              src="/bookswaphub.jpg"
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
                  Bookswap Hub
                </h1>
                <p className="text-white mt-3 text-lg">
                  This web application allows users to share their book
                  collections with others who have a certain condition, without
                  involving money. Users can easily add books to their
                  collection, borrow books by receiving a confirmation code from
                  the owner, bookmark books of interest, and manage borrow
                  requests by rejecting and deleting them.Again user can manage
                  uploaded books individually. Additionally, users can
                  seamlessly update their profiles.
                </p>
                <p className=" text-[#EF403A] my-2">
                  Technology used :{" "}
                  <span className="text-sm text-white">
                    React · Tailwind · Firebase · Node.js · Express.js ·
                    TypeScript · MongoDB · Mongoose · RTK Query · JSON Web
                    Token(JWT) · Cloudinary
                  </span>
                </p>
              </div>
              <div className="text-center flex flex-col gap-3 justify-end items-center mt-5 md:flex-row">
                <div className=" w-full flex flex-col gap-3 md:flex-row md:w-auto">
                  <a
                    href="https://github.com/Shazzadul-Shakib/BookswapHub"
                    target="_blank"
                    className=" font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Client Side Code
                  </a>
                  <a
                    href="https://github.com/Shazzadul-Shakib/BookswapHub-Server"
                    target="_blank"
                    className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                  >
                    Server Side Code
                  </a>
                </div>
                <div className="flex w-full md:w-auto">
                  <a
                    href="https://bookswap-hub.vercel.app/"
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

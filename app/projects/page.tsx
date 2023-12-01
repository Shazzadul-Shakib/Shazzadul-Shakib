import Image from "next/image";

export default function Projects() {
  return (
    <main className="py-10 w-[70%] mx-auto">
      <h1 className="w-[15%] mx-auto text-center text-white text-2xl font-bold pb-2 mb-10 border-b-2 border-[#EF403A]">
        Projects
      </h1>
      <section>
        <div className="flex gap-10">
          <div className="w-[35%] h-[250px] border-2 relative overflow-hidden rounded-md">
            <Image
              src="/dobotdone.png"
              width={450}
              height={750}
              className="h-full object-contain hover:scale-150 ease-in-out duration-300"
              priority={true}
              alt="Project1"
            />
          </div>
          <div className="w-[60%] h-[250px] flex flex-col justify-center items-center">
            <div>
              <div>
                <h1 className="text-[#EF403A] text-xl font-bold">
                  Do-Bot-Done
                </h1>
                <p className="text-white text-sm my-3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Error et ipsa magni beatae illo cumque alias tenetur fugit
                  aperiam odio autem consectetur repellat perspiciatis
                  doloribus, incidunt itaque nostrum. Quam perferendis eaque
                  repellat dignissimos earum nostrum minima esse perspiciatis
                  fugiat explicabo.
                </p>
              </div>
              <div className=" flex justify-end mt-5">
                <a
                  href="https://github.com/Shazzadul-Shakib/Do-Bot-Done-Client"
                  target="_blank"
                  className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
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
                <a
                  href="https://do-bot-done.web.app/"
                  target="_blank"
                  className="font-bold text-white text-sm bg-[#EF403A] px-4 py-2 rounded-md mx-2"
                >
                  Live Site
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-10 my-10">
          <div className="w-[35%] h-[250px] border-2 relative overflow-hidden rounded-md">
            <Image
              src="/petplanetoid.png"
              width={450}
              height={750}
              className="h-full object-contain hover:scale-150 ease-in-out duration-300"
              priority={true}
              alt="Project1"
            />
          </div>
          <div className="w-[60%] h-[250px] flex flex-col justify-center items-center">
            <div>
              <div>
                <h1 className="text-[#EF403A] text-xl font-bold">
                  Pet-Planetoid
                </h1>
                <p className="text-white text-sm my-3">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Error et ipsa magni beatae illo cumque alias tenetur fugit
                  aperiam odio autem consectetur repellat perspiciatis
                  doloribus, incidunt itaque nostrum. Quam perferendis eaque
                  repellat dignissimos earum nostrum minima esse perspiciatis
                  fugiat explicabo.
                </p>
              </div>
              <div className=" flex justify-end mt-5">
                <a
                  href="https://github.com/Shazzadul-Shakib/Pet-Planetoid-Client"
                  target="_blank"
                  className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                >
                  Client Side code
                </a>
                <a
                  href="https://github.com/Shazzadul-Shakib/Pet-Planetoid-Server"
                  target="_blank"
                  className="font-bold px-4 py-2 text-[#EF403A] text-sm border border-[#EF403A] rounded-md mx-2"
                >
                  Server Side Code
                </a>
                <a
                  href="https://pet-planetoid.web.app/"
                  target="_blank"
                  className="font-bold text-white text-sm bg-[#EF403A] px-4 py-2 rounded-md mx-2"
                >
                  Live Site
                </a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </section>
    </main>
  );
}

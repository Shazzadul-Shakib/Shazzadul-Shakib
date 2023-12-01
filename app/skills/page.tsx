import { FrontEnd,BackEnd,Tools } from "@/utils/skillIcons";

export default function Skills() {
  return (
    <main id="skills">
      <div className="w-[90%] min-h-screen mx-auto pb-4 my-10 rounded-md text-white ">
        <h1 className="w-[10%] mx-auto text-center text-2xl font-bold pb-2 mb-10 border-b-2 border-[#EF403A] ">
          Skills
        </h1>
        <section className=" w-full md:w-[80%] mx-auto">
          <div className="border rounded-md m-3 p-4 ">
            <h1 className="text-xl font-bold text-center text-[#EF403A] pb-2">
              Front-end
            </h1>
            <div className="w-full py-3 flex flex-wrap gap-7 md:gap-10 md:w-[80%] md:mx-auto">
              {FrontEnd.map((skill) => (
                <div className="flex flex-col justify-center items-center ">
                  <div>{skill.icon}</div>
                  <p className="text-sm">{skill.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col  md:flex-row md:justify-center">
            <div className="border rounded-md m-3 p-4 ">
              <h1 className="text-xl font-bold text-center text-[#EF403A] pb-2">
                Back-end
              </h1>
              <div className="w-full py-3 flex flex-wrap gap-7 md:gap-10 md:w-[80%] md:mx-auto">
                {BackEnd.map((skill) => (
                  <div className="flex flex-col justify-center items-center ">
                    <div>{skill.icon}</div>
                    <p className="text-sm">{skill.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border rounded-md m-3 p-4 ">
              <h1 className="text-xl font-bold text-center text-[#EF403A] pb-2">
                Tools
              </h1>
              <div className="w-full py-3 flex flex-wrap gap-7 md:gap-10 md:w-[80%] md:mx-auto">
                {Tools.map((skill) => (
                  <div className="flex flex-col justify-center items-center ">
                    <div>{skill.icon}</div>
                    <p className="text-sm">{skill.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

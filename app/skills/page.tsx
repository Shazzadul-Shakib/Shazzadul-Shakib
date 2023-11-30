import { FrontEnd } from "@/utils/skillIcons";

export default function Skills() {
  return (
    <main id="skills">
      <div className="w-[90%] h-screen mx-auto p-4 my-10 rounded-md text-white ">
        <h1 className="text-center text-2xl font-bold">Skills</h1>
        <section className=" w-[80%] mx-auto">
          <div className="border rounded-md m-3 p-4 ">
            <h1 className="text-xl text-center text-[#EF403A]">Front-end</h1>
            <div className="w-[70%] mx-auto py-2 flex flex-wrap gap-10">
              {FrontEnd.map((skill) => (
                <p className="flex flex-col justify-center items-center">
                  {skill.icon}
                  {skill.title}
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="border rounded-md m-3 p-4 ">
              <h1 className="text-xl text-center text-[#EF403A]">Back-end</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, ab!
              </p>
            </div>
            <div className="border rounded-md m-3 p-4 ">
              <h1 className="text-xl text-center text-[#EF403A]">Tools</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, ab!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-950 text-white h-[44vh]">
        <div className="flex font-bold md:text-5xl text-2xl justify-center items-center">Get Me a chai <span><img src="/transparent_cup.gif" alt="TEA" width={88} /></span></div>
        <p className="text-gray-200 mt-2 text-center text-sm md:text-lg">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="text-gray-200 mt-2 text-center text-sm md:text-lg">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>

        <div className="mt-4">
          <Link href={"/login"}><button type="button" className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start now!</button></Link>
          <Link href="/about"><button type="button" className="text-white cursor-pointer bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>


      <div className="bg-gray-800 opacity-55 h-1"></div>


      <div className="text-white">
        <div className="flex flex-col items-center">
          <h1 className="md:text-3xl text-2xl font-bold text-center my-10 mb-7">
            Your fans can buy you a Chai
          </h1>
          <div className="flex md:gap-28 gap-2 py-10 mb-14">
            <div className="item space-y-1 flex flex-col items-center text-center">
              <img src="/working_man.gif" alt="Working man" className="w-20 h-20 rounded-full bg-gray-800 opacity-90 object-cover" />
              <p className="font-bold">Fund Yourself</p>
              <p>Your fans are available for you to help!</p>
            </div>

            <div className="item space-y-1 flex flex-col items-center text-center">
              <img src="/coin.gif" alt="Coin" className="w-20 h-20 rounded-full bg-gray-800 opacity-90 object-cover" />
              <p className="font-bold">Fund Yourself </p>
            </div>
            <div className="item space-y-1 flex flex-col items-center text-center">
              <img src="/transparent_world.gif" alt="Globe" className="w-20 h-20 rounded-full bg-gray-800 opacity-90 object-cover" />
              <p className="font-bold">Fans want to help </p>
              <p>Your fans are available for you to help!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 opacity-55 h-1"></div>

      <div className="text-white">
        <div className="flex flex-col items-center">
          <h2 className="md:text-3xl text-2xl font-bold text-center my-10 mb-10">
            Learn more about us
          </h2>
          {/* <div className="video mb-7">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/KT1r1qk_SWY?si=bZGgaQurZIkwK-E-"
              title="YouTube video player"
              frameBorder="0"                // <-- Correct in JSX/React
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div> */}
          <div className="video mb-7 mx-auto w-full max-w-2xl aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/KT1r1qk_SWY?si=bZGgaQurZIkwK-E-"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>


        </div>
      </div>

    </>
  );
}

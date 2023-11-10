"use client";
import { useState, useEffect } from "react";
import { GitHub, LinkedIn } from "@/components/icons/socials";

export default function Confirm() {
  const [confirmationStatus, setConfirmationStatus] = useState<boolean>(false);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    const backendURL = "https://innerspace-newsletter-production.up.railway.app/confirm/" + id;

    console.log(id)
    console.log(backendURL)
    const fetchData = async () => {
      try {
        if (id) {
          const response = await fetch(backendURL);
          const data = await response.json();

          // Assuming your backend sends a property like 'subscriber' in the response
          if (data.subscriber === 'Subscription confirmed') {
            setConfirmationStatus(true);
          } else {
            setConfirmationStatus(false);
          }
        } else {
          console.error('No ID parameter found in the URL.');
        }
      } catch (error) {
        console.error('Error fetching confirmation status:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="absolute z-30 top-0 left-0 w-screen h-screen bg-transparent p-10 inline-flex flex-col justify-start pointer-events-none">

      <div className="pb-10 flex-row w-full items-center mix-blend-difference justify-start">
        <p className="fixed flex-1 h-8 text-4xl font-bold leading-8 text-white tracking-tighter">
          SB
        </p>
      </div>

      <div className={`pt-5 md:pt-10 flex-row items-start justify-start transition-opacity duration-700 opactiy-300`}>
        <p className="flex-1 h-full text-12 leading-6 text-white">
          <b>FULLSTACK ENGINEER</b>
          <br />
          <b className="invisible md:visible">🂠 🂡 🂠 🂱 🂠</b>
          <br />
          <b className="invisible md:visible">—</b>
        </p>
      </div>
    </div>
    <div className="absolute z-20 top-5 left-1/2 -translate-x-1/2 w-[95%] overflow-hidden border border-gray-300 rounded-lg">
      <div className="w-screen h-screen bg-purple-300 p-10 inline-flex flex-row items-center justify-center mix-blend-difference">
        <div className="p-10 inline-flex flex-row items-center justify-center">
          <div className="pt-10 w-5/6 md:w-11/12 flex-row items-center justify-center">
            <hr className="w-full pb-10" />
            <div className="flex w-full">
              <div className="relative z-30 w-1/3 flex flex-col space-y-3">
                <a href={"https://www.github.com/solomonbaez"} target="_blank" rel="noopener noreferrer"><GitHub /></a> 
                <a href={"https://www.linkedin.com/in/solomonbaez"} target="_blank" rel="noopener noreferrer"><LinkedIn /></a> 
              </div>
              <div className="pl-10 pb-2 w-2/3">
                { confirmationStatus ? (
                  <>
                    <p className="pb-10 whitespace-normal text-lg md:text-5xl text-white">
                      Thanks for subscribing!
                    </p>
                    <p className="w-full text-sm">
                      🂠 more content coming soon 🃟
                    </p>
                  </>
                ) : (
                    <p className="pb-10 whitespace-normal text-lg md:text-5xl text-white">
                      What are you doing here?
                    </p>
                )}
                <br />
                <hr className="bg-white translate-y-10 md:translate-y-20"/>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </>
  )
}
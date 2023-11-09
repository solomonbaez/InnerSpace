import { useState } from "react";
import { motion } from "framer-motion";
import { GitHub, LinkedIn } from "@/components/icons/socials";

const animate = {
  initial: {
      opacity: 0
  },
  open: {
      opacity: 1,
  },
  exit: {
      opacity: 0,
      transition: {duration: 0, delay: 0}
  }
}

export default function Index({isActive}) {
  const [email, setEmail] = useState('');
  const [subscriptionResult, setSubscriptionResult] = useState('');

  const handleSubscribe = async () => {
    const backendURL = process.env.GO_URL;
    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "name": "newUser"}),
      });

      if (response.ok) {
        console.log(response)
        console.log('Subscription successful!');
        setSubscriptionResult("Success!")
      } else {
        console.log(response)
        console.error('Subscription failed.');
        setSubscriptionResult("Failed!")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEmailChange = (e) => {
    if (isActive) {
      setEmail(e.target.value);
    }
  };

  return (
    <>
    { isActive &&
      <motion.div variants={animate} initial="initial" animate={isActive ? "open" : "exit"}
        className="h-[90vh] w-full z-30 fixed flex flex-col items-center justify-center mix-blend-difference uppercase"
      >
        <div className="p-10 inline-flex flex-row items-center justify-center">
          <div className="pt-10 w-5/6 md:w-11/12 flex-row items-center justify-center">
            <hr className="w-full pb-10" />
            <div className="flex w-full">
              <div className="relative z-30 w-1/3 flex flex-col space-y-3">
                <a href={"https://www.github.com/solomonbaez"} target="_blank" rel="noopener noreferrer"><GitHub /></a> 
                <a href={"https://www.linkedin.com/in/solomonbaez"} target="_blank" rel="noopener noreferrer"><LinkedIn /></a> 
              </div>
              <div className="pl-10 pb-2 w-2/3">
                <p className="pb-10 whitespace-normal text-sm md:text-5xl text-white">
                  Subscribe to my newsletter!
                </p>
                <input
                  className="w-full outline-none text-center text-red-500"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <button
                  className="w-full hover:bg-red-500 on hover:text-black bg-black text-white"
                  onClick={handleSubscribe}
                >
                  🂠 confirm 🂡
                </button>
                <br />
                <hr className="bg-white translate-y-10 md:translate-y-20"/>
                {subscriptionResult && (
                  <>
                  <br />
                  <br />
                  <p className={subscriptionResult.includes('failed') ? 'text-red-500 uppercase' : 'text-green-500 uppercase'}>
                    {subscriptionResult}
                  </p>
                  </>
                )}
                <br />
                <br />
                <small className="translate-y-10 text-xs md:translate-y-20">!BLOG COMING SOON!</small>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    }
    </>
  )
}
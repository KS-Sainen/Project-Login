import pb from "./database/pb.js";
import { useState } from "react";
import NavBar from "./HomePageComp/NavBar.jsx";

export default function SignIn() {
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidEmailAddress, setInvalidEmailAddress] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const isLoggedIn = pb.authStore.isValid;

  const signIn = async (Email, Password) => {
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    !emailRegex.test(Email)
      ? setInvalidEmailAddress(true)
      : setInvalidEmailAddress(false);

    Password.length < 5 || Password == null || Password == undefined
      ? setInvalidPassword(true)
      : setInvalidPassword(false);

    if (!invalidEmailAddress && !invalidPassword) {
      try {
        const authData = await pb
          .collection("Users")
          .authWithPassword(Email, Password);
      } catch (e) {
        alert("User data is either blank or not found. Please check your email and password.");
      }
    }
  };

  if (isLoggedIn) {
    return (window.location.href = "/class");
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="pt-20 lg:pt-32">
          {
            // FOR EMAIL ADDRESS CHECK
            invalidEmailAddress ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Email Address"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />- Email address is invalid.
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Email Address"
                />
                <br />
              </>
            )
          }
          {
            // FOR EMAIL ADDRESS CHECK
            invalidPassword ? (
              <>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mt-6 lg:mt-10 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Password"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />- Password is invalid.
                </div>
              </>
            ) : (
              <>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mt-6 lg:mt-10 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Password"
                />
                <br />
              </>
            )
          }
          <button
            type="submit"
            onClick={() => signIn(email, password)}
            className=" mt-9 lg:mt-12 bg-[#F95959] outline-[#F95959] outline text-white text-sm lg:text-base font-bold rounded-lg py-2 lg:py-3 px-[120px] lg:px-[190px]"
          >
            SIGN IN
          </button>
          <a href="signup" className="underline text-white">
            <div className="mt-6 text-center lg:mt-8 text-sm lg:text-base">
              Don't have an account? Sign Up
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

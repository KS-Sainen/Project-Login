import pb from "./database/pb.js";
import { useState } from "react";
import NavBar from "./HomePageComp/NavBar.jsx";

export default function SignIn() {
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isLoggedIn = pb.authStore.isValid;

  const signIn = async (Email, Password) => {
    setLoading(true);
    try {
      const authData = await pb
        .collection("Users")
        .authWithPassword(Email, Password);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  if (isLoggedIn) {
    return (window.location.href = "/class");
  }

  return (
    <>
      <NavBar />
      <center className="pt-20 lg:pt-32">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
          placeholder="Email Address"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className=" mt-6 lg:mt-10 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
          placeholder="Password"
        />
        <br />
        <button
          type="submit"
          onClick={() => signIn(email, password)}
          className=" mt-9 lg:mt-12 bg-[#F95959] outline-[#F95959] outline text-white text-sm lg:text-base font-bold rounded-lg py-2 lg:py-3 px-[120px] lg:px-[190px]"
        >
          {isLoading ? "LOADING..." : "SIGN IN"}
        </button>
        <a href="signup" className="underline text-white">
          <div className="mt-6 lg:mt-8 text-sm lg:text-base">Don't have an account? Sign Up</div>
        </a>
      </center>
    </>
  );
}

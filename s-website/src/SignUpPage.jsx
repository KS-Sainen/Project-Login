import pb from "./database/pb.js";
import { useState } from "react";
import NavBar from "./HomePageComp/NavBar.jsx";

export default function SignUp() {
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [invalidEmailAddress, setInvalidEmailAddress] = useState(false);
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidMiddleName, setInvalidMiddleName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const isLoggedIn = pb.authStore.isValid;

  function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }

  const signUp = async (
    FirstName,
    MiddleName,
    LastName,
    Email,
    Password,
    PasswordConfirm
  ) => {
    // Regex for name and email
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /\S+@\S+\.\S+/;

    //Email Check
    !emailRegex.test(Email)
      ? setInvalidEmailAddress(true)
      : setInvalidEmailAddress(false);
    // First Name Check
    !nameRegex.test(FirstName)
      ? setInvalidFirstName(true)
      : setInvalidFirstName(false);
    // Middle Name Check
    !nameRegex.test(MiddleName)
      ? setInvalidMiddleName(true)
      : setInvalidMiddleName(false);
    if (MiddleName == null || MiddleName == undefined || MiddleName == "")
      setInvalidMiddleName(false);
    // Last Name Check
    !nameRegex.test(LastName)
      ? setInvalidLastName(true)
      : setInvalidLastName(false);
    // Password Check
    Password.length < 5 || Password == null || Password == undefined
      ? setInvalidPassword(true)
      : setInvalidPassword(false);
    // Confirm Password Check
    PasswordConfirm.length < 5 ||
    PasswordConfirm == null ||
    PasswordConfirm == undefined ||
    PasswordConfirm != Password
      ? setInvalidConfirmPassword(true)
      : setInvalidConfirmPassword(false);

    // If all fields are valid, create account
    if (
      !(
        invalidFirstName &&
        invalidMiddleName &&
        invalidLastName &&
        invalidPassword &&
        invalidConfirmPassword
      )
    ) {
      try {
        const data = {
          username: capitalize(FirstName) + capitalize(LastName),
          email: Email,
          password: Password,
          passwordConfirm: PasswordConfirm,
          firstName: capitalize(FirstName),
          middleName: capitalize(MiddleName),
          lastName: capitalize(LastName),
          role: "visitor",
        };
        const record = await pb.collection("Users").create(data);
        alert("Account Created Successfully");
        window.location.href = "/signin";
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLoggedIn) {
    return (window.location.href = "/class");
  }

  return (
    <>
      <NavBar />
      <div className="h-full flex justify-center">
        <div className="pt-[50px]">
          <div className="">
            {invalidFirstName ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border rounded-xl text-white border-white placeholder-white"
                  placeholder="First Name (English)"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />
                  - Field cannot be blank.
                  <br />
                  - Field must be written in English.
                  <br />- Field cannot contain special characters.
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="First Name (English)"
                />
                <br />
              </>
            )}

            {invalidMiddleName ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border rounded-xl text-white border-white placeholder-white"
                  placeholder="Middle Name (English) (Optional)"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />
                  - Field must be written in English.
                  <br />- Field cannot contain special characters.
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Middle Name (English) (Optional)"
                />
                <br />
              </>
            )}
            {invalidLastName ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Last Name (English)"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />
                  - Field cannot be blank.
                  <br />
                  - Field must be written in English.
                  <br />- Field cannot contain special characters.
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Last Name (English)"
                />
                <br />
              </>
            )}

            {invalidEmailAddress ? (
              <>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Email Address"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />- Email address format is invalid.
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-10 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Email Address"
                />
                <br />
              </>
            )}

            {invalidPassword ? (
              <>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Password"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />
                  - Field cannot be blank.
                  <br />- Field must be at least 5 characters long
                </div>
              </>
            ) : (
              <>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Password"
                />
                <br />
              </>
            )}

            {invalidConfirmPassword ? (
              <>
                <input
                  type="password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Confirm Password"
                />
                <div className="text-red-500 mt-3">
                  Please check the following:
                  <br />
                  - Field cannot contain a space.
                  <br />
                  - Field cannot be blank.
                  <br />
                  - Field must be at least 5 characters long
                  <br />- Field must be the same as the one above
                </div>
              </>
            ) : (
              <>
                <input
                  type="password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="mt-5 font-thin text-sm lg:text-base tracking-widest w-[300px] lg:w-[445px] px-[20px] py-3 bg-transparent border border-white rounded-xl text-white placeholder-white"
                  placeholder="Confirm Password"
                />
                <br />
              </>
            )}
          </div>
          <br />
          <button
            type="submit"
            onClick={() =>
              signUp(
                firstName,
                middleName,
                lastName,
                email,
                password,
                passwordConfirm
              )
            }
            className="mt-4 lg:mt-5 bg-[#F95959] outline-[#F95959] outline text-white text-sm lg:text-base font-bold rounded-lg py-2 lg:py-3 px-[120px] lg:px-[190px]"
          >
            {isLoading ? "LOADING..." : "SIGN UP"}
          </button>
          <a href="signin" className="underline text-white">
            <div className="mt-6 lg:mt-8 text-sm lg:text-base flex justify-center">
              Already have an account? Sign In
            </div>
          </a>
          <div className="pt-[50px]"></div>
        </div>
      </div>
    </>
  );
}

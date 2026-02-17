"use server";

import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";

const loginCheck = async (usrnm, passk) => {
    try {
        const result = await axios.post(`${process.env.BASE_URL}users/userLogin`, {
          emailid: usrnm,
          userPass: passk,
        });
        // console.log(result.data);

        return result.data
    } catch (error) {
        console.log(error);
        // throw new Error ("Check your Internet")
        return {
            success:false,
            message:"Check your Internet"
        }
    }
};

export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);
  
    if (!session.isLoggedIn) {
      session.isLoggedIn = defaultSession.isLoggedIn;
    }
  
    return session;
  };

  export const login = async (username, passkey) => {
    const session = await getSession();
    const formUsername = username;
    const formPassword = passkey;
  
    // CHECK USER IN THE DB
    const user = await loginCheck(formUsername, formPassword)
  
    if (!user.success) {
      return user;
    }
  
    session.email = user.data.userData.userEmail;
    session.name = user.data.userData.userName;
    session.image = user.data.userData.userImage;
    session.accessToken = user.data.accessToken;
    session.refreshToken = user.data.refreshToken;
    session.isLoggedIn = true;
  
    await session.save();
    redirect("/dashboard");
    return user;
  };
  
  export const logout = async () => {
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  
//   export const changePremium = async () => {
//     const session = await getSession();
  
//     isPro = !session.isPro;
//     session.isPro = isPro;
//     await session.save();
//     revalidatePath("/profile");
//   };
  
//   export const changeUsername = async (formData) => {
//     const session = await getSession();
  
//     const newUsername = formData.get("username");
  
//     username = newUsername;
  
//     session.username = username;
//     await session.save();
//     revalidatePath("/profile");
//   };
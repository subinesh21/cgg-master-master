import "../public/assets/css/bootstrap-4.5.3.min.css";
import "../public/assets/css/flaticon.min.css";
import "../public/assets/css/animate.min.css";
import "../public/assets/css/fontawesome-5.14.0.min.css";
import "./ui/globals.css";
import "../public/assets/css/style.css";

import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyATrZW6yzLydOCpTJgTgNHoWILXEPN-NSE",
  authDomain: "cgg-leads.firebaseapp.com",
  projectId: "cgg-leads",
  storageBucket: "cgg-leads.appspot.com",
  messagingSenderId: "920612179118",
  appId: "1:920612179118:web:d962c6589a9a8d1883313f"
};

const app = initializeApp(firebaseConfig);

export const metadata = {
  title: "Chennai Green Gifts - Plant Based Return Gifts",
  description: "Top Seller for Gift Plants - Outdoor and Indoor Live Plants for Return gift purposes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google" content="notranslate"/>
      </head>
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}

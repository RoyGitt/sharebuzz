import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";
import { GiBee } from "react-icons/gi";

const Login = () => {
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));

    const { sub, given_name, picture } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: given_name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="h-screen relative">
      <video
        src={shareVideo}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover"
      />

      <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
        <div className="flex gap-2 mb-3">
          <GiBee size={45} className="text-white " />
          <h1 className="text-2xl text-white font-bold ">
            SHARE <span className=" font-normal">Buzz</span>
          </h1>
        </div>
        <div id="signInDiv"></div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { categories } from "../utils/data";
import { client } from "../client";

import Spinner from "./Spinner";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
        window.location.reload();
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please add all fields.
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center dark:bg-slate-950 bg-white lg:p-5 p-3 lg:w-4/5  w-full rounded-lg shadow-md">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg dark:bg-slate-800">
          <div className=" flex justify-center items-center flex-col border-1 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>It&apos;s wrong file type.</p>}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload className="dark:text-white" />
                    </p>
                    <p className="text-lg font-semibold dark:text-white">
                      Click to upload
                    </p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full ">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl dark:text-white font-bold border-b-2 rounded-lg p-2 dark:bg-slate-800"
          />
          {user && (
            <div className="flex gap-3 my-2 items-center  bg-white rounded-lg dark:bg-transparent">
              <img
                src={user?.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold dark:text-white">{user?.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            placeholder="Tell everyone what your Pin is about"
            className="outline-none text-base sm:text-lg dark:text-white border-b-2 p-2 dark:bg-slate-800"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 dark:text-white border-gray-200 p-2 dark:bg-slate-800"
          />
          <div className="flex flex-col">
            <div className="mb-2 font-semibold text:lg sm:text-xl">
              <p className="dark:text-white mb-4">Choose Pin Cattegory</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="dark:bg-slate-800 dark:text-white"
              >
                {categories.map((item) => (
                  <option
                    className="text-base border-0 outline-none capitalize bg-white text-black dark:bg-slate-800 dark:text-white"
                    value={item.name}
                    defaultValue={`Cars`}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none mt-4"
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;

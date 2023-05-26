import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";

import PinDetails from "../components/PinDetails";
import Feed from "../components/Feed";
import CreatePin from "../components/CreatePin";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

const Pins = ({ user, darkModeToggler, darkMode }) => {
  const [searchItem, setSearchItem] = useState("");

  console.log(darkMode);
  return (
    <div>
      <Navbar
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        user={user && user}
        darkModeToggler={darkModeToggler}
        darkMode={darkMode}
      />
      <div>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetails user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<CreatePin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;

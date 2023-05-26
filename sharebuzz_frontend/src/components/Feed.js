import React, { useEffect, useState } from "react";

import { searchQuery } from "../utils/data";
import { feedQuery } from "../utils/data";
import { client } from "../client";

import Spinner from "./Spinner";

import { useParams } from "react-router-dom";
import MasonryLayout from "./MasonryLayout";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      const query = feedQuery;
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  if (pins?.length == 0) {
    return (
      <p className="text-3xl text-center dark:text-white ">
        No pins Available<span>🥲</span>
      </p>
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

function Saved() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          commentCount: item.food.commentCount,
          savesCount: item.food.savesCount,
          foodPartner: item.food.foodPartner,
          createdAt: item.food.createdAt,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const removedSaved = async (item) => {
    try {
      await axios.post(
        "http://localhost:3000/api/food/save",
        { foodId: item._id },
        { withCredentials: true }
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch (error) {
      console.error("Error removing saved food:", error);
    }
  };

  return (
    <ReelFeed
      items={videos} // <-- Change 'videos' to 'items'
      onSave={removedSaved} // <-- Change 'onRemoveSaved' to 'onSave'
      emptyMessage="No Saved videos yet."
    />
  );
}

export default Saved;

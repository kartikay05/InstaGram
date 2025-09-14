import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  onComment,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  // Track liked/saved states locally (by _id)
  const [likedItems, setLikedItems] = useState(new Set());
  const [savedItems, setSavedItems] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {}); // ignore autoplay errors
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  const toggleLike = (item) => {
    const newLikes = new Set(likedItems);
    newLikes.has(item._id) ? newLikes.delete(item._id) : newLikes.add(item._id);
    setLikedItems(newLikes);
    onLike?.(item);
  };

  const toggleSave = (item) => {
    const newSaves = new Set(savedItems);
    newSaves.has(item._id) ? newSaves.delete(item._id) : newSaves.add(item._id);
    setSavedItems(newSaves);
    onSave?.(item);
  };

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {items.length === 0 && (
          <div className="empty-state">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => {
          const isLiked = likedItems.has(item._id);
          const isSaved = savedItems.has(item._id);

          return (
            <section key={item._id} className="reel" role="listitem">
              <video
                ref={setVideoRef(item._id)}
                className="reel-video"
                src={item.video}
                muted
                playsInline
                loop
                preload="metadata"
              />

              <div className="reel-overlay">
                <div className="reel-overlay-gradient" aria-hidden="true" />

                <div className="reel-actions">
                  {/* Like Button */}
                  <div className="reel-action-group">
                    <button
                      onClick={() => toggleLike(item)}
                      className="reel-action"
                      aria-label="Like"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "red" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="reel-action-group">
                    <button
                      className="reel-action"
                      onClick={() => toggleSave(item)}
                      aria-label="Bookmark"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill={isSaved ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
                    </div>
                  </div>

                  {/* Comment Button */}
                  <div className="reel-action-group">
                    <button
                      className="reel-action"
                      aria-label="Comments"
                      onClick={onComment ? () => onComment(item) : undefined}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                      </svg>
                    </button>
                    <div className="reel-action__count">
                      {item.commentsCount ??
                        (Array.isArray(item.comments)
                          ? item.comments.length
                          : 0)}
                    </div>
                  </div>
                </div>

                <div className="reel-content">
                  <p className="reel-description" title={item.description}>
                    {item.description}
                  </p>
                  {item.foodPartner && (
                    <Link
                      className="reel-btn"
                      to={`/foodpartner/${item.foodPartner}`}
                      aria-label="Visit store"
                    >
                      Visit store
                    </Link>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ReelFeed;

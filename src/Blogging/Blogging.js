import React, { useState } from "react";
import CreateBlog from "./CreateBlog";
import BlogList from "./BlogList";
import BlogProfile from "./BlogProfile";
import UserBlogs from "./UserBlogs";
import "./Blogging.css"; // Import the CSS for styling

const Blogging = () => {
  const [showUserBlogs, setShowUserBlogs] = useState(false);

  const handleShowUserBlogs = () => {
    setShowUserBlogs(true);
  };

  const handleBackToCenterContent = () => {
    setShowUserBlogs(false);
  };

  return (
    <div className="blogging-container">
      {/* Empty left column */}
      <div className="left-column"></div>

      {/* Center column */}
      <div className="center-column">
        {showUserBlogs ? (
          <UserBlogs onBack={handleBackToCenterContent} />
        ) : (
          <>
            <div className="create-blog">
              <CreateBlog />
            </div>
            <div className="blog-list">
              <BlogList />
            </div>
          </>
        )}
      </div>

      {/* Right column */}
      <div className="right-column">
        <div className="blog-profile">
          <BlogProfile />
          {!showUserBlogs && (
            <button
              className="my-blogs-button"
              onClick={handleShowUserBlogs}
              style={{
                fontSize: "1.5rem",
                padding: "1rem 2rem",
                backgroundColor: "white",
                color: "black",
                border: "1px solid lightgrey",
                borderRadius: "2px",
                cursor: "pointer",
                margin: "15px 15px",
                width: "90%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              My Blogs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogging;

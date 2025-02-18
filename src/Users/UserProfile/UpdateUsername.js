import React, { useEffect, useState } from "react";

const UpdateUsername = () => {
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("You are not logged in. Please log in to continue.");
          return;
        }

        const response = await fetch("https://localhost:7030/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user details.");
        }

        const data = await response.json();
        setOldUsername(data.username); // Set the old username
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("You must be logged in to update your username.");
        return;
      }

      const response = await fetch("https://localhost:7030/api/User/update-username", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        setSuccess("Username updated successfully!");
        setNewUsername(""); // Clear the new username field
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update username.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="oldUsername" style={{ display: "block", marginBottom: "5px" }}>
            Old Username:
          </label>
          <input
            type="text"
            id="oldUsername"
            value={oldUsername}
            readOnly
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="newUsername" style={{ display: "block", marginBottom: "5px" }}>
            New Username:
          </label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Username
        </button>
      </form>
    </div>
  );
};

export default UpdateUsername;

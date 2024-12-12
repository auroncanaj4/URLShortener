import { useEffect, useState } from "react";
import "../assets/styles/main.css";
import Navbar from "./Navbar";
import { io } from "socket.io-client";
import Alert from "./UI/Alert";

const Main = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState({
    message: "",
    showMessage: false,
  });

  useEffect(() => {
    const socket = io(`${API_BASE_URL}`);

    socket.on("urlsUpdated", (data) => {
      setShortenedUrls(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [API_BASE_URL]);

  const expiryOptions = [
    { label: "1 minute", value: 1 },
    { label: "5 minutes", value: 5 },
    { label: "30 minutes", value: 30 },
    { label: "1 hour", value: 60 },
    { label: "5 hours", value: 300 },
  ];

  const showAlert = (message) => {
    setError((prev) => ({ message: message, showMessage: !prev.showMessage }));
    setTimeout(() => {
      setError((previous) => ({
        message: "",
        showMessage: !previous.showMessage,
      }));
    }, 2000);
  };

  const sumbitUrl = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const originalUrl = formData.get("originalUrl");
    const expiresInMinutes = formData.get("expiresInMinutes");
    try {
      const response = await fetch(`${API_BASE_URL}/addUrl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: originalUrl, expiresInMinutes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (err) {
      showAlert(err.message);
      console.error("Error adding URL:", err.message);
    }
  };

  return (
    <>
      <Navbar shortenedUrls={shortenedUrls} />
      <main className="mainContainer">
        {error && <Alert alertContent={error} />}

        <h1 className="title">URL Shortener</h1>
        <form onSubmit={sumbitUrl} className="form">
          <div className="formInputs">
            <input
              type="text"
              className="urlInput"
              placeholder="Paste the URL to be shortened"
              name="originalUrl"
            />

            <select
              id="cars"
              className="select"
              name="expiresInMinutes"
              defaultValue={"Add expiration date"}
            >
              <option value="">Add expiration date</option>
              {expiryOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="option"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submitUrlButton">
            Shorten URL
          </button>
        </form>
      </main>
    </>
  );
};
export default Main;

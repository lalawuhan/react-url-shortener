import React, { useState } from "react";
import "./index.css";
import LinkForm from "./components/LinkForm";
import UpdateLinkForm from "./components/UpdateLinkForm";
import Button from "./components/Button";
import { useFetchAPI } from "./components/useFetchAPI";

function App() {
  const [message, setMessage] = useState("");
  const {
    setData,
    setIsError,
    setIsLoading,
    data,
    isError,
    isLoading,
  } = useFetchAPI("/links", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const url = formData.get("url");

    //TODO: url depends on order, replace with better data fetching
    e.preventDefault();
    fetch("/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.links);
        setMessage(data.message);
      })
      .catch((err) => {
        setIsError(err);
        console.warn("Cannot upload", err);
      });
  };

  const handleRemove = async (id) => {
    const prevLinks = data;
    try {
      await fetch(`/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.links);
          setMessage(data.message);
        });
    } catch (err) {
      console.warn("Error deleting", err);
      setIsError(err);
      setData(prevLinks);
    }
  };
  const copyLink = (e) => {
    try {
      navigator.clipboard.writeText(`${window.location.host}/links/${e}`);
    } catch (err) {
      console.warn("Failed to copy", err);
      setIsError(err);
      setMessage("Failed to copy");
    }
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    const url = e.target[0].value;
    setIsLoading(true);
    fetch(`/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.links);
        setMessage(data.message);
      })
      .catch((err) => {
        setIsError(err);
        console.warn("Cannot update link", err);
      });

    setIsLoading(false);
  };

  return (
    <>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <div>
          <div className="formcontainer">
            <h2>URL shortener</h2>

            <LinkForm
              placeholder="E.g. www.google.com "
              onSubmit={(e) => handleSubmit(e)}
              name="url"
            />
            {message ? <p className="message">{message}</p> : ""}
          </div>
          <div className="list-heading">
            <h3>
              Previous <span className="list-emphasis">Links</span>
            </h3>
          </div>
          <ul className="list-container">
            {data.map((link) => (
              <div key={link.id}>
                <p className="list-subheading">
                  {window.location.host}/links/{link.id}
                </p>

                <UpdateLinkForm
                  placeholder="Update Link"
                  onSubmit={(e) => handleUpdate(link.id, e)}
                />

                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="list-button"
                >
                  Go to link
                </a>
                <Button
                  name="Copy"
                  type="button"
                  className="list-button"
                  handleClick={() => copyLink(link.id)}
                />
                <Button
                  name="Delete"
                  type="button"
                  className="list-button"
                  handleClick={() => handleRemove(link.id)}
                />
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;

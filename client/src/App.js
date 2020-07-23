import React, { useState } from "react";
import "./index.css";
import LinkForm from "./components/LinkForm";
import UpdateLinkForm from "./components/UpdateLinkForm";
import Button from "./components/Button";
import { useLinksAPI } from "./components/useLinksAPI";

function App() {
  const {
    data,
    setIsError,
    setMessage,
    isError,
    isLoading,
    message,
    create,
    update,
    deleteLink,
  } = useLinksAPI();

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const url = formData.get("url");
    create(url);
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get("url");
    update(id, url);
  };

  const handleRemove = async (id) => {
    deleteLink(id);
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

  return (
    <>
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
        {isError && <div>Something went wrong...</div>}

        <div className="list-heading">
          <h3>
            Previous <span className="list-emphasis">Links</span>
          </h3>
        </div>
        {isLoading ? (
          <p>Loading... </p>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default App;

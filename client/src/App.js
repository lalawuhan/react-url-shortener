import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  //TODO: list element show the real shortened urls, add copy function, add styling
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetch("/links", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data.links);
          });
      } catch (error) {
        setIsError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    console.log(`submit happening,  ${url}`);
    e.preventDefault();
    setLoading(true);
    try {
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
          console.log(data);
          setData(data.links);
          setMessage(data.message);
        });
    } catch (error) {
      setIsError(error);
    }
    setLoading(false);
  };
  const handleLink = (id) => {
    setLoading(true);
    try {
      fetch(`/links/${id}/`, { method: "GET", redirect: "follow" }).then(
        (res) => {
          console.log(res);
          if (res.redirected) {
            window.location.href = res.url;
          }
        }
      );
    } catch (error) {
      setIsError(error);
    }
    setLoading(false);
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
          console.log("deleteddata", data);
          setData(data.links);
          setMessage(data.message);
        });
    } catch (error) {
      setIsError(error);
      setData(prevLinks);
    }
  };
  const copyLink = (e) => {
    console.log("event copy id:", e);
    navigator.clipboard.writeText(`${window.location.href}${e}`);
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    console.log(`
    update happening, id: ${id}
    url: ${url}`);
    console.log("need to post", url);
    setLoading(true);
    try {
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
          console.log(data);
          setData(data.links);
          setMessage(data.message);
        });
    } catch (error) {
      setIsError(error);
    }
    setLoading(false);
  };

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <div className="formcontainer">
            <form onSubmit={handleSubmit}>
              <h2>URL shortener</h2>
              <label className="formcontainer_label"> Url </label>
              <input
                name="url"
                type="url"
                value={url}
                placeholder="E.g. www.google.com "
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <button className="formcontainer_submit">Submit</button>
            </form>
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
                <form onSubmit={handleUpdate}>
                  <input
                    name="url"
                    type="url"
                    placeholder="Update Link "
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="update-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={(e) => handleUpdate(link.id, e)}
                  >
                    Update
                  </button>
                </form>
                <button type="button" onClick={() => handleLink(link.id)}>
                  Go to Link
                </button>
                <button type="button" onClick={() => copyLink(link.id)}>
                  Copy
                </button>
                <button type="button" onClick={() => handleRemove(link.id)}>
                  Delete
                </button>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;

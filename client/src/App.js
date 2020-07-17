import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  //TODO: list element show the real shortened urls, add copy function, add styling
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsError(false);
      try {
        const response = await axios.get("/links");
        setData(response.data.links);
      } catch (error) {
        setIsError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    console.log(`
    submit happening
    url: ${url}`);
    e.preventDefault();
    console.log("need to post", url);
    axios({
      method: "POST",
      url: "/links",
      data: { url: url },
    }).then(({ data }) => {
      setData(data.links);
      setMessage(data.message);
    });
  };
  const handleLink = (id) => {
    console.log("id", id);
    axios.get(`/links/${id}/`).then((res) => {
      let fetchedUrl = res.request.responseURL;
      window.location = fetchedUrl;
    });
  };
  const handleRemove = async (id) => {
    console.log("id", id);
    /* store the current state in prevLinks, just in case of server side fail */
    const prevLinks = data;
    /* update on browser side, */
    const updatedLinks = data.filter((x) => x.id !== id);
    console.log("Updated links", updatedLinks);
    /* server side update.  If it fails, rollback the state */
    try {
      await axios.delete(`/links/${id}`);
      setData(updatedLinks);
    } catch (e) {
      console.log("error", e);
      setData(prevLinks);
    }
    // axios.delete(`/links/${id}`).then(({ data }) => {
    //   console.log("finished delete", data);
    //   setData(data.links);
    //   setMessage(data.message);
    // });
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
    axios({
      method: "PUT",
      url: `/links/${id}`,
      data: { url: url },
    }).then(({ data }) => {
      console.log("new", data);
      setData(data.links);
      setMessage(data.message);
    });
  };

  return (
    <>
      {isError && <div>Something went wrong ...</div>}

      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <div className="formcontainer">
            {message ? <p className="message">{message}</p> : ""}
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

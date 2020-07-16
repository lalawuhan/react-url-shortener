import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

function App() {
  //TODO: list element show the real shortened urls, add copy function, add styling
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("/links");
      setData(result.data.links);
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
    axios.get(`/links/${id}/`).then(() => {
      console.log("get data");

      console.log("finished");
    });
  };
  const handleRemove = (id) => {
    console.log("id", id);
    axios.delete(`/links/${id}`).then(({ data }) => {
      let updatedData = data.links.filter((x) => x.id !== id);
      setData(updatedData);
      setMessage(data.message);
      console.log("finished");
    });
  };

  const copyLink = (e) => {
    console.log("event copy:", e);
    navigator.clipboard.writeText("id: ${e}");
  };
  console.log("data", data);
  return (
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
      <ul>
        {data.map((link) => (
          <div key={link.id}>
            <p className="list-subheading">{link.url}</p>
            <button type="button" onClick={(e) => handleLink(link.id)}>
              Go to Link
            </button>
            <button type="button" onClick={(e) => copyLink(link.id)}>
              Copy
            </button>
            <button type="button" onClick={() => handleRemove(link.id)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

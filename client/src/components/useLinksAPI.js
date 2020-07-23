import { useState, useEffect } from "react";
const API_ENDPOINT = "http://localhost:3000";
export function useLinksAPI() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function refresh() {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_ENDPOINT}/links`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setData(data.links);
      setIsLoading(false);
    } catch (error) {
      setIsError(error);
    }
  }

  async function create(url) {
    try {
      const res = await fetch(`${API_ENDPOINT}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setData(data.links);
      setMessage(data.message);
    } catch (err) {
      setIsError(err);
    }
  }

  async function read() {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_ENDPOINT}/links`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setData(data.links);
      setIsLoading(false);
    } catch (err) {
      setIsError(err);
    }
  }

  async function update(id, url) {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_ENDPOINT}/links/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ url: url }),
      });
      const data = await res.json();
      setData(data.links);
      setMessage(data.message);
      setIsLoading(false);
    } catch (err) {
      setIsError(err);
    }
  }

  async function deleteLink(id) {
    const prevLinks = data;
    try {
      const res = await fetch(`/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setData(data.links);
      setMessage(data.message);
    } catch (err) {
      console.warn("Error deleting", err);
      setIsError(err);
      setData(prevLinks);
    }
  }

  useEffect(() => {
    refresh();
  }, []);
  return {
    data,
    isError,
    isLoading,
    message,
    refresh,
    create,
    read,
    update,
    deleteLink,
  };
}

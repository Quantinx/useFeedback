import { useEffect, useState } from "react";

export default function useBackendService() {
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData(url) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const status = res.status;
      setData(data);
      setStatus(status);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  async function sendData(url, method, payload) {
    console.log(payload);
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(payload),
      });
      const status = res.status;
      setStatus(status);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  return { data, status, loading, error, getData, sendData };
}

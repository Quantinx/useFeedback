export default async function sendData(url, method, payload) {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(payload),
    });

    const status = res.status;
    if (!res.ok) {
      return { status: status };
    }
    const data = await res.json();
    return { data: data, status: status };
  } catch (error) {
    console.log("error");
    throw error;
  }
}

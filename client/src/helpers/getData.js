export default async function getData(url) {
  try {
    const res = await fetch(url, { credentials: "include" });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

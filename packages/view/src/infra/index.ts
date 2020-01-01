export const getGraph = async (data: { path: string }) => {
  try {
    const res = await fetch("http://localhost:3000/api/graph", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      referrer: "no-referrer",
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

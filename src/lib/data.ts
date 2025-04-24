export async function getData() {
  const timeout = 2000;
  await new Promise((res) => setTimeout(res, timeout));

  return {
    id: Math.floor(Math.random() * 1000),
    name: "John Doe",
  };
}

export async function getDataLonger() {
  const timeout = 5000;
  await new Promise((res) => setTimeout(res, timeout));
  return Math.floor(Math.random() * 1000);
}

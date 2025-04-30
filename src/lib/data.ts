export async function getData(ms = 0) {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return await fetch(`${process.env.API_URL!}/api/test?ms=${ms}`, {
    cache: "no-store",
  }).then((response) => response.json());
}

export async function getDataLonger() {
  return await getData(5000);
}

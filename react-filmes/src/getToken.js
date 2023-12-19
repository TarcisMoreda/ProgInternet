const CLIENT_ID = "c21d2caab88d4303964df1da3290e4ff";
const CLIENT_SECRET = "14d2a34cf98143eda43747d0a9974b47";

async function getToken() {
  const data = {
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  let qsData = [];
  for (let i in data) {
    qsData.push(`${i}=${data[i]}`);
  }
  qsData = qsData.join("&");
  try {
    const resp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: qsData,
    });
    const token = await resp.json();
    return token.access_token;
  } catch (err) {
    console.error(err);
  }
}

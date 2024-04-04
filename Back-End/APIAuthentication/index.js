import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "umman";
const yourPassword = "UMMAN2005";
const yourAPIKey = "6a6650f9-70ef-4b61-962d-e30f8fe51b03";
const yourBearerToken = "6b7c0b73-a816-40df-9207-6bfaa84a0cdf";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const result = await axios.get(API_URL + "/filter?score=5&apiKey=" + yourAPIKey);
    res.render("index.ejs", {
      content: JSON.stringify(result.data)
    })
  }
  catch (error) {
    res.status(404).send(error.message)
  }
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
 try {
  const result = axios.get(API_URL + "/secrets/2", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    }
  });
  res.render("index.ejs", {
    content: JSON.stringify(result.data)
  })
 }
 catch (error) {
  res.status(404).send(error.message)
 }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

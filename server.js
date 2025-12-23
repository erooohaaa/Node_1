console.log("SERVER FILE LOADED");

const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;


app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/api/user-info", async (req, res) => {
  console.log("REQUEST /api/user-info");

  try {
    
    const userRes = await axios.get("https://randomuser.me/api/");
    const u = userRes.data.results[0];

    const user = {
      firstName: u.name.first,
      lastName: u.name.last,
      gender: u.gender,
      age: u.dob.age,
      dob: u.dob.date.split("T")[0],
      city: u.location.city,
      country: u.location.country,
      address: `${u.location.street.number} ${u.location.street.name}`,
      picture: u.picture.large
    };

    
    const countryRes = await axios.get(
      `https://restcountries.com/v3.1/name/${user.country}`
    );
    const c = countryRes.data[0];

    const country = {
      name: c.name.common,
      capital: c.capital?.[0] || "N/A",
      languages: c.languages
        ? Object.values(c.languages).join(", ")
        : "N/A",
      currency: c.currencies ? Object.keys(c.currencies)[0] : null,
      flag: c.flags.png
    };

  
    let exchange = null;
    if (country.currency && process.env.EXCHANGE_API_KEY) {
      const rateRes = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${country.currency}`
      );

      exchange = {
        USD: rateRes.data.conversion_rates.USD,
        KZT: rateRes.data.conversion_rates.KZT
      };
    }

   
    let news = [];
    if (process.env.NEWS_API_KEY) {
      const newsRes = await axios.get(
        `https://newsapi.org/v2/everything?qInTitle=${user.country}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
      );

      news = newsRes.data.articles.map(n => ({
        title: n.title,
        description: n.description,
        image: n.urlToImage,
        url: n.url
      }));
    }

    res.json({ user, country, exchange, news });

  } catch (err) {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});

const btn = document.getElementById("btn");
const output = document.getElementById("output");

btn.addEventListener("click", async () => {
  const res = await fetch("/api/user-info");
  const data = await res.json();

  output.innerHTML = `
    <div class="card">
      <img src="${data.user.picture}">
      <h2>${data.user.firstName} ${data.user.lastName}</h2>
      <p>${data.user.gender}, ${data.user.age}</p>
      <p>${data.user.address}, ${data.user.city}, ${data.user.country}</p>

      <h3>Country</h3>
      <img src="${data.country.flag}" width="80">
      <p>Capital: ${data.country.capital}</p>
      <p>Languages: ${data.country.languages}</p>

      <h3>Exchange</h3>
      ${
        data.exchange
          ? `<p>1 ${data.country.currency} = ${data.exchange.USD} USD</p>
             <p>1 ${data.country.currency} = ${data.exchange.KZT} KZT</p>`
          : "<p>Exchange rate not available</p>"
      }

      <h3>News</h3>
      ${data.news.map(n => `
        <div class="news">
          <h4>${n.title}</h4>
          <p>${n.description || ""}</p>
          <a href="${n.url}" target="_blank">Read more</a>
        </div>
      `).join("")}
    </div>
  `;
});

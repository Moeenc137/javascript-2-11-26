const countriesContainter = document.querySelector(".countries");
//AJAX HTTPS calls to get data from an web APIx

const renderData = function (data) {
  const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>  
  `;
  countriesContainter.insertAdjacentHTML("beforeend", html);
};

const getCountryAndNeigbour = function (country) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
  );
  request.send();

  //console.log(request.responseText);
  request.addEventListener("load", function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // render data 1
    renderData(data);

    //get neighour country:
    const neigbour = data.borders;

    if (!neigbour) return;

    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://countries-api-836d.onrender.com/countries/alpha/${neigbour}`,
    );
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderData(data2);
    });
  });
};
getCountryAndNeigbour("portugal");

// using promise insted of AJAX
const reques2 = fetch(
  "https://countries-api-836d.onrender.com/countries/name/pakistan",
);
console.log(reques2);

// handling promise:
const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json;
    })
    .then(function (data) {
      console.log(data);
    });
};

getCountryData("pakistan");

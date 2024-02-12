/* html'den aktarılanlar */
const cityInput = document.querySelector(".inputText")
const btn = document.querySelector(".btn")

/* btn'i izleme */
btn.addEventListener("click", () => {
   console.log(cityInput.value)

   getData(cityInput.value)

})

function getData(name){
    // console.log(name)

    // API Key tanımlama
    const API = "9e2321239ff1b1fc28ec50545245cc57"
    // baseURL tanımlama
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr`
    console.log(baseURL)

    // fetch ile promise döndür ve json'a çevir
    fetch(baseURL)
    .then(res => res.json())
    .then(data => { 
       const {name, sys:{country}, main:{temp, feels_like, humidity}, wind:{speed} ,weather:[{description}] } = data;
       // console.log(name, country, temp °, feels_like, description, humidity %, speed km/s)

       // verileri js'e çekme
       const city = document.querySelector("#sehir")
       const temperature = document.querySelector("#sicaklik")
       const weatherDesc = document.querySelector("#havaDurumu")
       const feel = document.querySelector("#hissedilen")
       const hum = document.querySelector("#humidity")
       const wind = document.querySelector("#wind")
       console.log(city, temperature, weatherDesc, feel, hum, wind)

       // js'e çekilen elemanları html elemanları yerine yerleştirme
       city.textContent = `${name}, ${country}`;
       temperature.innerText = `${temp.toFixed(1)}°`;
       hum.textContent = `Nem: %${humidity}`;
       wind.innerHTML = `Rüzgar: ${speed} km/s`;
       weatherDesc.textContent = `Hava Durumu: ${description}`;
       feel.innerText = `Hissedilen Sıcaklık: ${feels_like}°`

    })
    .catch(err => console.log(err))

    cityInput.value = "";
    cityInput.focus();
    
}
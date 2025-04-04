const url_cats = "https://api.thecatapi.com/v1/images/search"
const url_dogs = "https://api.thedogapi.com/v1/images/search"

const urls = [url_cats,url_dogs]
const img = document.getElementById("ramdonImg")

fetch(urls[Math.floor(urls.length * Math.random())])
.then(res => console.log(res))
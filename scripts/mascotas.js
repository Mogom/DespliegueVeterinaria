const url_cats = "https://api.thecatapi.com/v1/images/search"
const url_dogs = "https://api.thedogapi.com/v1/images/search"

const urls = [url_cats,url_dogs]

const mascotas = document.querySelectorAll(".mascota")


mascotas.forEach(mascota => {
    fetch(url_cats)
        .then(res => res.json())
        .then(data => {
            const pet = data[0];
            const petId = pet.id;
            const petUrl = pet.url; 

            const img = mascota.querySelector(".mascota-foto");
            img.src = petUrl;

            return fetch(`https://api.thecatapi.com/v1/images/${petId}`);
        })
        .then(res => res.json())
        .then(detalles => {
            const breed = detalles.breeds[0];

            const nombre = mascota.querySelector(".mascota-nombre");
            const temperamento = mascota.querySelector(".mascota-temperamento");
            const origen = mascota.querySelector(".mascota-origen");

            nombre.textContent = `Nombre: ${breed.name}`;
            temperamento.textContent = `Personalidad: ${breed.temperament}`;
            origen.textContent = `Origen: ${breed.origin}`;
        })
        .catch(error => console.error("Error al cargar los datos:", error));
});

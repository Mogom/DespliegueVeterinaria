document.addEventListener("DOMContentLoaded", () => {
    const url = "../datos/servicios.json";
    const container = document.querySelector(".servicios-container"); 

    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            data.forEach(servicio => {
                const card = document.createElement("div");
                card.classList.add("servicio-card");

                card.innerHTML = `
                    <img src="${servicio.url}" alt="${servicio.nombre}">
                    <h3>${servicio.nombre}</h3>
                    <p>${servicio.descripcion}</p>
                    <p class="precio">$${servicio.precio.toFixed(2)}</p>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

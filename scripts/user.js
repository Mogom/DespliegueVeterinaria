const calendario = document.querySelector(".calendario")
console.log("hola1")

function crearCalendario(){for (let i=0; i=31; i++){
    console.log("hola1")
    let dia = document.createElement("li")
    console.log("hola1")
    dia.className = "calendario__dia"
    console.log("hola1")
    // dia.id = `dia-${1}`
    calendario.appendChild(dia)
    console.log("hola1")
}}
// crearCalendario()


const dias = document.querySelectorAll(".calendario__dia")

dias.forEach(dia =>{
    dia.innerHTML=`
    <button><a href="../Forms/agendar_citas.html">Agendar Cita</a></button>`
})

const diaCitado = document.querySelector("#dia-11")

diaCitado.innerHTML=`
                     <p>Cita Agendada</p>
                    <p>Hora 14:00</p>
                    <p>Consultorio 101</p>
                    <button><a href="">Cancelar</a></button>`



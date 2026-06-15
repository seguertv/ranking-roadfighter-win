let asesores = [];

const pista = document.getElementById("pista");
const ranking = document.getElementById("ranking");

async function cargarDatos() {

    try {

        const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vReYYJAd7o9nKtKL-ynq9ckTFdobNYJHZqgrfqHDFvzcMlPOkR-vjzDB7rYoHO4hNaaw1wOxnDyo9_T/pub?gid=731585806&single=true&output=tsv";

        const respuesta = await fetch(url);
        const texto = await respuesta.text();

        const filas = texto.trim().split("\n");

        asesores = [];

        for(let i = 1; i < filas.length; i++){

            const columnas = filas[i].split("\t");

            if(columnas.length < 3) continue;

            asesores.push({
                nombre: columnas[0],
                ventas: Number(columnas[1]),
                color: columnas[2]
            });
        }

        dibujar();

    } catch(error){

        console.error(error);

    }

}

function dibujar(){

    ranking.innerHTML = "";
    pista.innerHTML = "";

    if(asesores.length === 0) return;

    asesores.sort((a,b) => b.ventas - a.ventas);

    const maxVentas = asesores[0].ventas;
    const alturaPista = pista.clientHeight - 180;

    const repetidos = {};

    asesores.forEach((a,index)=>{

        let icono = "";

        if(index === 0) icono = "🥇";
        else if(index === 1) icono = "🥈";
        else if(index === 2) icono = "🥉";

        ranking.innerHTML += `
            <p>${icono} ${index+1}. ${a.nombre} (${a.ventas})</p>
        `;

        const auto = document.createElement("img");

        auto.src = "assets/car.png";
        auto.className = "auto";

        auto.style.filter =
        `drop-shadow(0 0 8px ${a.color})`;

        const carriles = [20,35,50,65,80];

        const carril =
        carriles[index % carriles.length];

        auto.style.left = carril + "%";

        let posicion =
        alturaPista -
        ((a.ventas / maxVentas) * alturaPista);

        if(!repetidos[a.ventas]){
            repetidos[a.ventas] = 0;
        }else{
            repetidos[a.ventas]++;
        }

        posicion += repetidos[a.ventas] * 90;

        auto.style.top =
        (80 + posicion) + "px";

        pista.appendChild(auto);

        const nombre =
        document.createElement("div");

        nombre.className = "nombreAuto";

        if(a.nombre.includes(",")){

            nombre.innerText =
            a.nombre
            .split(",")[1]
            .trim()
            .split(" ")[0];

        }else{

            nombre.innerText =
            a.nombre.split(" ")[0];

        }

        nombre.style.left =
        carril + "%";

        nombre.style.top =
        (55 + posicion) + "px";

        pista.appendChild(nombre);

    });

    document.getElementById("cuota").innerText = "199";

    document.getElementById("ventasMes").innerText =
    asesores.reduce(
        (suma,a)=>suma+a.ventas,
        0
    );

    document.getElementById("hora").innerText =
    new Date().toLocaleTimeString();

}

cargarDatos();

setInterval(cargarDatos,30000);

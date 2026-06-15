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

    const total

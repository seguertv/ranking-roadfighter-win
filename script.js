let asesores = [];

async function cargarDatos(){

 const url =
 "https://docs.google.com/spreadsheets/d/e/2PACX-1vReYYJAd7o9nKtKL-ynq9ckTFdobNYJHZqgrfqHDFvzcMlPOkR-vjzDB7rYoHO4hNaaw1wOxnDyo9_T/pub?gid=731585806&single=true&output=tsv";

 const respuesta = await fetch(url);

 const texto = await respuesta.text();

 const filas = texto.trim().split("\n");

 asesores = [];

 for(let i=1;i<filas.length;i++){

   const columnas = filas[i].split("\t");

   if(columnas.length < 3) continue;

   asesores.push({
      nombre: columnas[0],
      ventas: Number(columnas[1]),
      color: columnas[2]
   });

 }

cargarDatos();

}

const pista = document.getElementById("pista");
const ranking = document.getElementById("ranking");

dibujar();

function dibujar(){

 ranking.innerHTML="";
 pista.innerHTML="";

 asesores.sort((a,b)=>b.ventas-a.ventas);

 asesores.forEach((a,index)=>{

   ranking.innerHTML += `
   <p>${index+1}. ${a.nombre} (${a.ventas})</p>
   `;

   const auto=document.createElement("img");

auto.src="assets/car.png";

auto.className="auto";

auto.style.filter=`drop-shadow(0 0 8px ${a.color})`;

  const carriles = [30,40,50,60,70];
auto.style.left = carriles[index % 5] + "%";


   const maxVentas = asesores[0].ventas;

const recorridoMaximo = 800;

const posicion =
recorridoMaximo -
((a.ventas / maxVentas) * recorridoMaximo);

auto.style.top = (80 + posicion) + "px";

   pista.appendChild(auto);
  const nombre = document.createElement("div");
nombre.className = "nombreAuto";
nombre.innerText = a.nombre.split(" ")[0];

nombre.style.top = (80 + posicion + 25) + "px";
nombre.style.left = carriles[index % 5] + "%";

pista.appendChild(nombre);

 });

 document.getElementById("cuota").innerText="199";
 document.getElementById("ventasMes").innerText="62";

 const ahora=new Date();

 document.getElementById("hora").innerText=
 ahora.toLocaleTimeString();

 setInterval(cargarDatos,30000);

}



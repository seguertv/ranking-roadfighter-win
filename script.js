const asesores = [
 {nombre:"FLAVIA",ventas:9,color:"#FF0000"},
 {nombre:"MARILY",ventas:7,color:"#0066FF"},
 {nombre:"LEONARDO",ventas:6,color:"#FFD700"},
 {nombre:"ESTEFANI",ventas:4,color:"#00CC00"},
 {nombre:"ISRAEL",ventas:3,color:"#FF7F00"},
 {nombre:"PEDRO",ventas:2,color:"#9400D3"},
 {nombre:"LUIS",ventas:1,color:"#00CED1"}
];

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

}

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

   const auto=document.createElement("div");
   auto.className="auto";

  const carriles = [35, 45, 55, 65];

auto.style.left = carriles[index % 4] + "%";

   auto.style.background=a.color;

   const maxVentas = asesores[0].ventas;

const recorridoMaximo = 800;

const posicion =
recorridoMaximo -
((a.ventas / maxVentas) * recorridoMaximo);

auto.style.top = (80 + posicion) + "px";

   pista.appendChild(auto);

 });

 document.getElementById("cuota").innerText="199";
 document.getElementById("ventasMes").innerText="62";

 const ahora=new Date();

 document.getElementById("hora").innerText=
 ahora.toLocaleTimeString();

}

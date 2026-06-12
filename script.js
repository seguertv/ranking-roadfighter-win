const asesores = [
 {nombre:"FLAVIA",ventas:9,color:"#FF0000"},
 {nombre:"MARILY",ventas:7,color:"#0066FF"},
 {nombre:"LEONARDO",ventas:6,color:"#FFD700"},
 {nombre:"ESTEFANI",ventas:4,color:"#00CC00"}
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

   auto.style.background=a.color;

   auto.style.top=(120 + index*120)+"px";

   pista.appendChild(auto);

 });

 document.getElementById("cuota").innerText="199";
 document.getElementById("ventasMes").innerText="62";

 const ahora=new Date();

 document.getElementById("hora").innerText=
 ahora.toLocaleTimeString();

}

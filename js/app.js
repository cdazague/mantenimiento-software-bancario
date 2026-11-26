const $ = (id) => document.getElementById(id);
let balance = 2500000;
let movements = [
  {title:"Abono de nómina simulado", detail:"Hoy · Ingreso de demostración", amount:850000, type:"in"},
  {title:"Compra de mercado simulada", detail:"Ayer · Compra de demostración", amount:-125000, type:"out"},
  {title:"Pago de internet simulado", detail:"20 nov 2026 · Servicio", amount:-65000, type:"out"}
];

const money = value => new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(value);
function toast(message){const box=$("toast");box.textContent=message;box.classList.add("show");setTimeout(()=>box.classList.remove("show"),2800)}
function renderBalance(){$("balance").textContent=money(balance)}
function renderMovements(target){
  const container=$(target);
  if(!movements.length){container.innerHTML='<p class="empty">Todavía no hay movimientos registrados.</p>';return}
  container.innerHTML=movements.map(m=>`<div class="movement"><div class="movement-left"><span class="movement-icon">${m.type==="in"?"↓":"↑"}</span><div><strong>${escapeHTML(m.title)}</strong><small>${escapeHTML(m.detail)}</small></div></div><span class="amount ${m.amount<0?"negative":"positive"}">${m.amount<0?"−":"+"} ${money(Math.abs(m.amount))}</span></div>`).join("");
}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function addMovement(title,detail,amount){movements.unshift({title,detail,amount,type:amount<0?"out":"in"});balance+=amount;renderBalance();renderMovements("recent-list");renderMovements("history-list")}
function showView(name){
  document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
  $(name+"-view").classList.remove("hidden");
  document.querySelectorAll(".nav-item[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===name));
  if(name==="history")renderMovements("history-list");
}
function logout(){$("app-screen").classList.add("hidden");$("login-screen").classList.remove("hidden");$("login-form").reset()}

$("login-form").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("username").value.trim();
  if(!name)return;
  $("welcome-title").textContent="Hola, "+name;
  $("avatar")?.textContent;
  document.querySelector(".avatar").textContent=name.charAt(0).toUpperCase();
  $("login-screen").classList.add("hidden");$("app-screen").classList.remove("hidden");
  renderBalance();renderMovements("recent-list");showView("dashboard");
  toast("Bienvenido. Has ingresado al entorno de demostración.");
});
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.go)));
$("logout-btn").addEventListener("click",logout);$("mobile-logout").addEventListener("click",logout);

$("transfer-form").addEventListener("submit",e=>{
  e.preventDefault();
  const amount=Number($("transfer-amount").value);
  const recipient=$("recipient").value.trim();
  if(!Number.isFinite(amount)||amount<=0){toast("Ingresa un valor válido.");return}
  if(amount>balance){toast("Saldo simulado insuficiente para esta operación.");return}
  addMovement("Transferencia a "+recipient,"Hoy · Transferencia simulada",-amount);
  e.target.reset();toast("Transferencia simulada registrada correctamente.");showView("history");
});
$("payment-form").addEventListener("submit",e=>{
  e.preventDefault();
  const amount=Number($("payment-amount").value),service=$("service").value;
  if(!Number.isFinite(amount)||amount<=0){toast("Ingresa un valor válido.");return}
  if(amount>balance){toast("Saldo simulado insuficiente para este pago.");return}
  addMovement("Pago de "+service,"Hoy · Pago de servicio simulado",-amount);
  e.target.reset();toast("Pago simulado registrado correctamente.");showView("history");
});
renderBalance();

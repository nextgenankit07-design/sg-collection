const products = [
 {id:1,cat:"Shirts",name:"Premium Oxford Shirt",price:1299},
 {id:2,cat:"Shirts",name:"Relaxed Linen Shirt",price:1499},
 {id:3,cat:"T-Shirts",name:"Essential Oversized Tee",price:799},
 {id:4,cat:"T-Shirts",name:"Signature Polo",price:999},
 {id:5,cat:"Jeans",name:"Straight Fit Denim",price:1799},
 {id:6,cat:"Jeans",name:"Classic Dark Denim",price:1899},
 {id:7,cat:"Trousers",name:"Smart Fit Trousers",price:1399},
 {id:8,cat:"Lowers",name:"Premium Comfort Lower",price:999},
 {id:9,cat:"Lowers",name:"Everyday Jogger",price:899},
 {id:10,cat:"Jackets",name:"Urban Overshirt Jacket",price:1999},
 {id:11,cat:"Formal Wear",name:"Classic Formal Shirt",price:1199},
 {id:12,cat:"Formal Wear",name:"Executive Trousers",price:1599}
];
let cart = JSON.parse(localStorage.getItem("sg-cart")||"[]");
const productsEl=document.getElementById("products"), countEl=document.getElementById("cartCount"), totalEl=document.getElementById("cartTotal");
const money=n=>"₹"+n.toLocaleString("en-IN");

function renderProducts(cat="All Products"){
 const list=cat==="All Products"?products:products.filter(p=>p.cat===cat);
 productsEl.innerHTML=list.map(p=>`<article class="product">
   <div class="product-img"><em>${p.cat.replace("Formal Wear","FORMAL")}</em></div>
   <div class="product-info"><small>${p.cat.toUpperCase()}</small><h3>${p.name}</h3>
   <div class="price"><strong>${money(p.price)}</strong><button class="add" onclick="addToCart(${p.id})">Add</button></div></div>
 </article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("sg-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 countEl.textContent=cart.reduce((s,x)=>s+x.qty,0);
 totalEl.textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item">
 <div class="mini">SG</div><div><h4>${x.name}</h4><p>${money(x.price)} × ${x.qty}</p></div>
 <button class="remove" onclick="removeItem(${x.id})">×</button></div>`).join(""):`<div class="empty">Your bag is empty.</div>`;
}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function filter(cat){
 document.querySelectorAll("[data-cat]").forEach(b=>b.classList.toggle("active",b.dataset.cat===cat));
 renderProducts(cat);
 document.getElementById("shop").scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>filter(b.dataset.cat)));
const cartEl=document.getElementById("cart"), overlay=document.getElementById("overlay");
function openCart(){cartEl.classList.add("open");overlay.classList.add("open")}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("open")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("orderBtn").onclick=()=>{
 if(!cart.length){alert("Your bag is empty.");return}
 const lines=cart.map(x=>`• ${x.name} — ${x.qty} × ${money(x.price)}`).join("\n");
 const total=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
 const msg=`Hello Shyam Garments! I want to order:\n\n${lines}\n\nTotal: ${total}\n\nPlease confirm availability and size options.`;
 window.open("https://wa.me/917232968722?text="+encodeURIComponent(msg),"_blank");
};
renderProducts();renderCart();

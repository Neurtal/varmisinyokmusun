const clickSound=new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");

const prizes = [
1,
5,
10,
25,
50,
100,
250,
500,
1000,
2500,
5000,
10000,
15000,
25000,
50000,
75000,
100000,
150000,
200000,
250000,
300000,
400000,
500000,
750000
];

let values = [...prizes].sort(()=>Math.random()-0.5);

const boxes = document.getElementById("boxes");
const moneyBoard = document.getElementById("moneyBoard");
const status = document.getElementById("status");
const bankButton = document.getElementById("bankButton");

let selectedBox = null;
let round = 1;
let target = 6;

drawMoney();
drawBoxes();

function drawMoney(){

moneyBoard.innerHTML="";

prizes.slice().sort((a,b)=>a-b).forEach(v=>{

const div=document.createElement("div");

div.className="money";

div.id="money-"+v;

div.innerText=v.toLocaleString("tr-TR")+" ₺";

moneyBoard.appendChild(div);

});

}

function drawBoxes(){

for(let i=0;i<24;i++){

const box=document.createElement("div");

box.className="box";

box.innerText=i+1;

box.onclick=()=>clickBox(i,box);

boxes.appendChild(box);

}

}

function clickBox(index, element){

if(element.classList.contains("open")) return;

if(selectedBox===null){

selectedBox=index;

element.style.background="#00c853";

status.innerText="Kendi kutunu seçtin! Şimdi diğer kutuları aç.";

return;

}

if(index===selectedBox){

alert("Kendi kutunu en sona saklamalısın!");

return;

}

clickSound.currentTime=0;
clickSound.play();
element.classList.add("open");

element.innerHTML=
"<div style='font-size:18px'>"+
values[index].toLocaleString("tr-TR")+
"<br>₺</div>";

const prize=document.getElementById("money-"+values[index]);

if(prize){

prize.style.opacity=".25";

prize.style.textDecoration="line-through";

}

opened++;

status.innerText=
opened+
" kutu açıldı. "+
(target-opened)+
" kutu daha aç.";

if(opened>=target){

bankButton.disabled=false;

status.innerText="🏦 Bankadan teklif geldi!";

}

if(opened===23){

finishGame();

}

}

bankButton.onclick=function(){

let remaining=values.filter((v,i)=>{

const box=document.querySelectorAll(".box")[i];

return !box.classList.contains("open") || i===selectedBox;

});

let avg=remaining.reduce((a,b)=>a+b,0)/remaining.length;

let risk = 0.65 + Math.random()*0.2;
let offer = Math.round(avg * risk);

if(offer<1){
    offer=1;
}

let answer = confirm(
"🏦 BANKA TEKLİFİ\n\n"+
"En Düşük Kalan: "+lowestPrize().toLocaleString("tr-TR")+" ₺\n"+
"En Yüksek Kalan: "+highestPrize().toLocaleString("tr-TR")+" ₺\n\n"+
"Banka Teklifi:\n"+
offer.toLocaleString("tr-TR")+" ₺\n\n"+
"Teklifi kabul ediyor musun?"
);

bankButton.disabled=true;
    round++;

switch(round){

case 2:
target=11;
break;

case 3:
target=14;
break;

case 4:
target=16;
break;

case 5:
target=18;
break;

case 6:
target=19;
break;

case 7:
target=20;
break;

case 8:
target=21;
break;

case 9:
target=22;
break;

case 10:
target=23;
break;

}

status.innerText="Oyuna devam ediliyor...";

if(answer){

alert("Tebrikler!\n"+offer.toLocaleString("tr-TR")+" ₺ kazandın!");

location.reload();

}

}

function finishGame(){

const ownPrize = values[selectedBox];

let answer = confirm(
"🎁 Son kutuya geldin!\n\n"+
"Kendi kutunu açmak ister misin?\n\n"+
"Tamam = Aç\n"+
"İptal = Oyunu yeniden başlat"
);

if(!answer){

location.reload();

return;

}

const allBoxes=document.querySelectorAll(".box");

allBoxes[selectedBox].classList.add("open");

allBoxes[selectedBox].innerHTML=
"<div style='font-size:18px'>"+
ownPrize.toLocaleString("tr-TR")+
"<br>₺</div>";

setTimeout(()=>{

document.body.innerHTML=`

<div style="display:flex;
justify-content:center;
align-items:center;
height:100vh;
flex-direction:column;
background:#09111f;
color:white;
font-family:Arial">

<h1 style="font-size:55px;color:gold;">
🎉 Tebrikler
</h1>

<h2>

${ownPrize.toLocaleString("tr-TR")} ₺

</h2>

<button onclick="location.reload()"
style="
margin-top:40px;
padding:20px 50px;
font-size:22px;
cursor:pointer;
border:none;
border-radius:12px;
background:gold;">

Tekrar Oyna

</button>

</div>

`;

},700);

}

const ownPrize = values[selectedBox];

const allBoxes = document.querySelectorAll(".box");

allBoxes[selectedBox].classList.add("open");
allBoxes[selectedBox].innerText = ownPrize.toLocaleString("tr-TR")+" ₺";

setTimeout(()=>{
    
document.body.style.background="#064420";
alert(
"Tebrikler!\n\n"+
"Kendi kutunda\n"+
ownPrize.toLocaleString("tr-TR")+" ₺ vardı!"
);

location.reload();

},500);

}

function remainingPrizes(){

let arr=[];

document.querySelectorAll(".box").forEach((box,i)=>{

if(!box.classList.contains("open") || i===selectedBox){

arr.push(values[i]);

}

});

return arr;

}

function highestPrize(){

return Math.max(...remainingPrizes());

}

function lowestPrize(){

return Math.min(...remainingPrizes());

}

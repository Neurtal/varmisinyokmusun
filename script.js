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
let opened = 0;

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

element.classList.add("open");

element.innerText=values[index].toLocaleString("tr-TR")+" ₺";

const prize=document.getElementById("money-"+values[index]);

if(prize){

prize.style.opacity=".25";

prize.style.textDecoration="line-through";

}

opened++;

status.innerText=opened+" kutu açıldı.";

if(opened%5===0){

bankButton.disabled=false;

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

if(answer){

alert("Tebrikler!\n"+offer.toLocaleString("tr-TR")+" ₺ kazandın!");

location.reload();

}

}

function finishGame(){

const ownPrize = values[selectedBox];

const allBoxes = document.querySelectorAll(".box");

allBoxes[selectedBox].classList.add("open");
allBoxes[selectedBox].innerText = ownPrize.toLocaleString("tr-TR")+" ₺";

setTimeout(()=>{

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

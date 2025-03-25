let numrandom = Math.random() * 100;
let frandom = Math.floor(numrandom);
console.log(frandom);

function guess(){
let chute = document.getElementById("num").value;
if (chute == frandom){
document.getElementById("resp").innerHTML = "Você acertou!";
document.getElementById("resp").style.setProperty("background-color", "green")
}
if (chute > frandom){
document.getElementById("resp").innerHTML = "O número é menor!"
document.getElementById("resp").style.setProperty("background-color", "red")
}

if (chute < frandom){
document.getElementById("resp").innerHTML = "O número é maior!"
document.getElementById("resp").style.setProperty("background-color", "red")
}
}




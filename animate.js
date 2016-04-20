var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#FF00FF";
ctx.beginPath();
ctx.strokeRect(0,0,canvas.width,canvas.height);
ctx.stroke();
ctx.closePath();

var requestId;
var logo = new Image();
logo.src = "logo_dvd.jpg";
var radius=0;
var isGrowing=false;

var drawDot = function drawDot(){
    ctx.beginPath();
    if (radius >= canvas.width/2 || radius <= 0){
	isGrowing = !isGrowing;
    }
    if (isGrowing) {radius+=1;}
    else {
	radius-=1;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	ctx.stroke();
    }
    ctx.arc(canvas.width/2,canvas.height/2,radius,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    requestId = window.requestAnimationFrame(drawDot);
};

var xpos = 0;
var ypos = 0;
var xmag = 1;
var ymag = 1;
var dvd = function dvd(){
    if (xpos < 0 || xpos >= canvas.width - logo.width){
	xmag *= -1;
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	ctx.stroke();
    }
    if (ypos < 0 || ypos >= canvas.height - logo.height){
	ymag *= -1;
	ctx.strokeRect(0,0,canvas.width,canvas.height);
	ctx.stroke();
    }
    xpos += xmag;
    ypos += ymag;
    ctx.drawImage(logo,xpos,ypos,logo.width,logo.height);
    requestId = window.requestAnimationFrame(dvd);
};

var stop = function stop(){
    window.cancelAnimationFrame(requestId);
};

document.getElementById("start").addEventListener("click",drawDot);
document.getElementById("dvd").addEventListener("click",function(){
    var scaleFactor = canvas.width/logo.width/6;
console.log(scaleFactor);
     logo.width = logo.width * scaleFactor;
     logo.height = logo.height * scaleFactor;
    dvd();
});
document.getElementById("stop").addEventListener("click",stop);

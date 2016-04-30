var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var balls=[]

ctx.strokeStyle = "#000000";
ctx.fillStyle = "#FF00FF";
ctx.beginPath();
ctx.strokeRect(0,0,canvas.width,canvas.height);
ctx.stroke();
ctx.closePath();


var makeDot = function(startx,starty,startrad){
    return {
	x:startx,
	y:starty,
	xvel:5-Math.random()*10,
	yvel:5-Math.random()*10,
	radius:startrad,
	mass:startrad*startrad,
	collide:function(balls){
	    if (this.x-this.radius <= 0 ||
		this.x+this.radius >= canvas.width){
		this.xvel*=-1;
	    }
	    if (this.y-this.radius <= 0 ||
		this.y+this.radius >= canvas.height){
		this.yvel*=-1;
	    }
	    var newxvel,newyvel;
	    var massSum,massDifference;
	    for (var i=0;i<balls.length;i++){
		if (Math.pow(this.x-balls[i].x,2)+Math.pow(this.y-balls[i].y,2) < Math.pow(this.radius+balls[i].radius,2)){
		    massSum=this.mass+balls[i].mass;
		    massDifference=this.mass-balls[i].mass;
		    newxvel = (this.xvel*(massDifference)+2*balls[i].mass*balls[i].xvel)/massSum;
		    newyvel = (this.yvel*(massDifference)+2*balls[i].mass*balls[i].yvel)/massSum;
		    balls[i].xvel = (balls[i].xvel*-massDifference+2*this.mass*this.xvel)/massSum;
		    balls[i].yvel = (balls[i].yvel*-massDifference+2*this.mass*this.yvel)/massSum;;
		    this.xvel = newxvel;
		    this.yvel = newyvel;
		}
	    }
	},
	update:function(balls){
	    this.collide(balls);
	    this.x+=this.xvel;
	    this.y+=this.yvel;
	},
	draw:function(){
	    ctx.beginPath();
	    ctx.strokeRect(0,0,canvas.width,canvas.height);
	    ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
	    ctx.stroke();
	    ctx.fill();
	    ctx.closePath();
	},
    }
};

var requestId;
var animate = function animate(){
    window.cancelAnimationFrame(requestId);
    ctx.fillStyle="#FFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#ABC";
    for (var i=0;i<balls.length;i++){
	balls[i].update(balls.slice(i+1,balls.length));
	balls[i].draw();
    }
    requestId = window.requestAnimationFrame(animate);
}

var setup = function setup(){
    for (var i=0;i<document.getElementById("balls").value;i++){
	var radius=Math.random()*20+20;
	balls.push(makeDot(radius+Math.random()*(canvas.width-2*radius),
			   radius+Math.random()*(canvas.height-2*radius),
			   radius));
    }
}

var stop = function stop(){
    window.cancelAnimationFrame(requestId);
};

var reset = function reset(){
    balls=[];
    ctx.fillStyle="#FFF";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

document.getElementById("start").addEventListener("click",setup);
document.getElementById("animate").addEventListener("click",animate);
document.getElementById("stop").addEventListener("click",stop);
document.getElementById("reset").addEventListener("click",reset);

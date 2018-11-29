
var canvas=document.getElementById('canvas');
var eraser=document.getElementById('eraser');
var brush=document.getElementById('brush');
var clear=document.getElementById('clear');
var download=document.getElementById('download');
var black=document.getElementById('black');
var red=document.getElementById('red');
var yellow=document.getElementById('yellow');
var blue=document.getElementById('blue');
var thin=document.getElementById('thin');
var thick=document.getElementById('thick');
var context=canvas.getContext('2d');
var lineWidth = 5;


getSize(canvas);
listenToUser(canvas);

var eraserEnabled=false;

eraser.onclick= function () {
    eraserEnabled=true;
    eraser.classList.add('active');
    brush.classList.remove('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
brush.onclick=function(){
    eraserEnabled=false;
    brush.classList.add('active');
    eraser.classList.remove('active');
};
clear.onclick=function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
};
download.onclick=function(){
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'picture';
    a.target = '_blank';
    a.click();
};

black.onclick=function(){
    context.strokeStyle='black';
    black.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
};
red.onclick=function(){
    context.strokeStyle='red';
    red.classList.add('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
yellow.onclick=function(){
    context.strokeStyle='#e9e23e';
    yellow.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
blue.onclick=function(){
    context.strokeStyle='blue';
    blue.classList.add('active');
    yellow.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
};

thin.onclick = function(){
    lineWidth = 5;
    thin.classList.add('sizeactive');
    thick.classList.remove('sizeactive');
};
thick.onclick = function(){
    lineWidth = 10;
    thick.classList.add('sizeactive');
    thin.classList.remove('sizeactive');
};


function listenToUser(canvas){
    var using=false;
    var lastPoint={x:undefined,y:undefined};

    //特性检测
    if(document.body.ontouchstart !== undefined){
        //说明是触屏设备
        canvas.ontouchstart = function(e){
            using=true;
            var x= e.touches[0].clientX;
            var y= e.touches[0].clientY;
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }
            else{
                lastPoint={"x":x,"y":y};
            }
        };
        canvas.ontouchmove = function(e){
            var x= e.touches[0].clientX;
            var y= e.touches[0].clientY;
            if(using){
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)
                }
                else{
                    newPoint={"x":x,"y":y}
                }

                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;  //实时更新最后一个点
            }
        };
        canvas.ontouchend = function(e){
            using=false;
        };
    }
    else{
        //说明是非触屏设备 即PC设备
        canvas.onmousedown= function (e) {
            using=true;
            var x= e.clientX;
            var y= e.clientY;
            if(eraserEnabled){
                context.clearRect(x-6,y-6,12,112)
            }
            else{
                lastPoint={"x":x,"y":y};
            }
        };
        canvas.onmousemove=function(e){
            var x= e.clientX;
            var y= e.clientY;
            if(using){
                if(eraserEnabled){
                    context.clearRect(x-6,y-6,12,12)
                }
                else{
                    newPoint={"x":x,"y":y}
                }

                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;  //实时更新最后一个点
            }
        };
        canvas.onmouseup=function(){
            using=false;
        }

    }

}

function getSize(canvas){
    var pageWidth=document.documentElement.clientWidth;
    var pageHeight=document.documentElement.clientHeight;

    canvas.width=pageWidth;
    canvas.height=pageHeight;
}

window.onresize=function(){
    getSize(canvas);
};

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);   //起点
    context.lineWidth=lineWidth;
    context.lineTo(x2,y2);   //终点
    context.stroke();
    context.closePath();
}
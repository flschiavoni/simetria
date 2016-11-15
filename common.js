var canvas_name = "myCanvas";
var flag = false;
var prevX = 0, currX = 0, prevY = 0, currY = 0;
var color = "";

function showGrid(){
    var canvas = document.getElementById(canvas_name + "-back");
    if (canvas.style.display == "none")
        canvas.style.display = "";
    else
        canvas.style.display = "none";
}

function downloadImage(){
   var canvas = document.getElementById(canvas_name);

   var link = document.getElementById('downloadImage');
   link.setAttribute('download', 'MyImage.png');
   link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}


function createEnvironment(){
   var canvas = document.getElementById(canvas_name);
   canvas.onmousemove = getMouseMove;
   canvas.onmousedown = getMouseClick;
   canvas.onmouseup = getMouseUnClick;
   canvas.onmouseout = getMouseUnClick;

   canvas.addEventListener('touchstart', getTouchStart, false);
   canvas.addEventListener('touchend', getTouchEnd, false);
   canvas.addEventListener('touchmove', getTouchMove, false);

   canvas.width = window.innerWidth * 0.9;
   canvas.height = window.innerHeight * 0.9;

   canvas = document.getElementById(canvas_name + "-back");
   canvas.width = window.innerWidth * 0.9;
   canvas.height = window.innerHeight * 0.9;

   canvas = document.getElementById(canvas_name + "-2");
   canvas.width = window.innerWidth * 0.9;
   canvas.height = window.innerHeight * 0.9;

   divideCanvas();
}

function setColor(obj) {
   color = obj.id;
   chooseColor();
}

function chooseColor(){
      var el = document.getElementById("color");
      if(el) el.value = color;
      document.getElementById("SelectedColor").style.background = color;
}

function getTouchStart(e){
    flag = true;
    if (!e)
        var e = event;

    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            prevX = currX;
            prevY = currY;

            var touch = e.touches[0]; // Get the information for finger #1
            currX=touch.pageX-touch.target.offsetLeft;
            currY=touch.pageY-touch.target.offsetTop;
        }
    }
}

function getTouchEnd(e){
    flag = false;
}

function getTouchMove(e){
    if (!flag) return;
    getTouchStart(e);
    draw();
}

function getMouseClick(e){
    var canvas = document.getElementById(canvas_name);
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    flag = true;
   }

function getMouseUnClick(e){
    flag = false;
    }

function getMouseMove(e){
   if (!flag) return;
   getMouseClick(e)
   draw();
}


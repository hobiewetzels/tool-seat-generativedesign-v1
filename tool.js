
//global variables :: these need to set
var bgColor;

var mousexpos = 0;

var offset;
var inwards;

var angle = 0;
var angle2 = 0;
var angle3 = 0;

//random values
//from user 
var random1;

var randomRange1;
var randomRange2;
var randomRange3;
var randomRange4;

randomNumbers = new Array(); 


//quads
var numbQuads = 3;
var numbQuadsBG = 0;
var numbMasks = 3;


quads = new Array();
quadsInit = new Array();

quadsBG = new Array(); 
quadsInitBG = new Array();

var submit = false;
var maskBG = false;

//colors
colors = ["#00afac", "#ee7d05" , "#fcc446"];
colorsComp = ["#fee7b5", "#fcc446", "#fdd06b"];



var mk_1;
var img_mask_1;

//model assets
var img_arona_1;
var img_arona_2;
var img_arona_3;
var img_arona_4;

var colorPick = 0;

//Draw functions: These functions get called after the user presses generate. The array of shapes get filled with the correct data that is extracted from the control panel.

//Draw quads : Draw the visible colored shapes
function drawQuads() {
  //reset arrays
  quads.length = 0;
  quadsInit.length = 0;
  //reset starters
  var x1 = 485 + inwards;
  var x2 = 485 - inwards; 
  var x3 = 485 - inwards; 
  var x4 = 485 + inwards;

  var y1 = 0;
  var y2 = 0;
  var y3 = 250;
  var y4 = 250;

  for (i = 0; i < numbQuads; i++) {

    quads.push({
      //left top
      x1: x1,
      y1: y1,
      //right top
      x2: x2,
      y2: y2,
      //right bottom
      x3: x3,
      y3: y3,
      //left bottom
      x4: x4,
      y4: y4, 
      color: colors[colorPick],
    });

    //startvalues
    quadsInit.push({
      //left top
      x1: quads[i].x1,
      y1: quads[i].y1,
      //right top
      x2: quads[i].x2,
      y2: quads[i].y2,
      //right bottom
      x3: quads[i].x3,
      y3: quads[i].y3,
      //left bottom
      x4: quads[i].x4,
      y4: quads[i].y4, 
      color: quads[i].color,
    });

    //increases/decreases


    colorPick++;
    if (colorPick == 3){
      colorPick = 0;
    }


  }

}

//Draw background quads : Draw the background shapes
function drawQuadsBG() {
  //reset arrays
  quadsBG.length = 0;
  quadsInitBG.length = 0;
  //reset starters
  var x = 0;
  var y = 0; 
  var w = 100; 
  var h = 1000;

  for (i = 0; i < numbQuadsBG; i++) {

    quadsBG.push({
      //left top
      x: x,
      //right top
      y: y,
      //right bottom
      w: w,
      //left bottom
      h: h,
      color: colorsComp[colorPick],
    });

    //startvalues
    quadsInitBG.push({
      x: quadsBG[i].x,
      y: quadsBG[i].y,
      w: quadsBG[i].w,
      h: quadsBG[i].h,
      color: quadsBG[i].color,
    });

    //increases/decreases


    colorPick++;
    if (colorPick == 3){
      colorPick = 0;
    }


  }

  
}

//Display functions: draw the shapes from the arrays on the screen. This function gets called in the P5 draw function.

//Display(): Draw the colored shapes and the masks
function display(i){
  noStroke();
  //check if the user has set: hide mask bg. If yes do not display the colored shapes.
  if (!maskBG){
  fill(quads[i].color);
  quad(quads[i].x1, quads[i].y1, quads[i].x2, quads[i].y2, quads[i].x3, quads[i].y3, quads[i].x4, quads[i].y4);
  }

  //Copy the correct colored shape en draw a new shape that represents the mask
  if (i == 0 && numbMasks > 2){
    mk_1.quad(quads[0].x1, quads[0].y1, quads[0].x2, quads[0].y2, quads[0].x3, quads[0].y3, quads[0].x4, quads[0].y4);
    ( img_mask_1 = img_arona_1.get() ).mask( mk_1.get() );
    image(img_mask_1, 0, 0);
  }
  if (i == 1 && numbMasks > 1){
    mk_2.quad(quads[1].x1, quads[1].y1, quads[1].x2, quads[1].y2, quads[1].x3, quads[1].y3, quads[1].x4, quads[1].y4);
    ( img_mask_2 = img_arona_2.get() ).mask( mk_2.get() );
    image(img_mask_2, 0, 0);
  }
  if (i == 2 ){
    mk_3.quad(quads[2].x1, quads[2].y1, quads[2].x2, quads[2].y2, quads[2].x3, quads[2].y3, quads[2].x4, quads[2].y4);
    ( img_mask_3 = img_arona_3.get() ).mask( mk_3.get() );
    image(img_mask_3, 0, 0);
  }
};

//displayComp() Draw the background shapes
function displayComp(i){
  bg_mk.angleMode(DEGREES);
  bg_mk.rotate(0.05);
  bg_mk.noStroke();
  bg_mk.rectMode(RADIUS)
  bg_mk.fill(quadsBG[i].color);
  bg_mk.rect(quadsBG[i].x, quadsBG[i].y, quadsBG[i].w, quadsBG[i].h);
}

//Move functions: Change the data in the array every frame so the shape gets redrawn. The sinus function is used to create a smooth animation

//speeds are calculated from the controle panel. These go through a random factor so they are always different.

//move colored shapes the mask movement is copied in the display function.
function move(i){

  //left side
  quads[i].x1 = quadsInit[i].x1 - Math.abs(sin(angle) * speed1 / (i + 1));
  quads[i].x4 = quadsInit[i].x4 - Math.abs(sin(angle) * speed2 / (i + 1));

  //right side
  quads[i].x2 = quadsInit[i].x2 + Math.abs(sin(angle) * speed3 / (i + 1));
  quads[i].x3 = quadsInit[i].x3 + Math.abs(sin(angle) * speed4 / (i + 1));



  angle += (0.007 / numbQuads);

  
}

//move background shapes

function moveComp(i){

  quadsBG[i].w = quadsInitBG[i].w + Math.abs(sin(angle2) * speed3 / (i + 1));
  quadsBG[i].h =  quadsInitBG[i].h + Math.abs(sin(angle2) * speed4 / (i + 1));
  

  angle2 += (0.005 / numbQuadsBG);

}
//p5 functions

//preload first models. 
function preload() {
  //arona
  img_arona_1 = loadImage('_assets/car_models/arona/arona-1-big.png');
  img_arona_2 = loadImage('_assets/car_models/arona/arona-2-big.png');
  img_arona_3 = loadImage('_assets/car_models/arona/arona-3-big.png');
  img_arona_4 = loadImage('_assets/car_models/arona/arona-4-big.png');
}
//Create the canvas and the different graphics for the masks and bg shapes.
function setup() {
    let myCanvas = createCanvas(970, 250);
    myCanvas.parent('myContainer');
    background(0);

    //create mask layers: same dimensions as banner
    mk_1 = createGraphics(970, 250);
    mk_2 = createGraphics(970, 250);
    mk_3 = createGraphics(970, 250);
  
    bg_mk = createGraphics(970, 250);

    bg_mk.translate(970 / 2, 250 / 2);
}

//Draw function. This function gets called 60 fps. It draws everything on the canvas and calls the move function. 

function draw() {

  if (submit){
  background(bgColor);
  //clear masks
  mk_1.clear();
  mk_2.clear();
  mk_3.clear();
  bg_mk.clear();

  //bg shapes
  for (i = 0; i < numbQuadsBG; i++) {
    displayComp(i);
    moveComp(i);
  }
  
  //draw bg layer
  image(bg_mk, 0, 0);
  image(img_arona_4, 0, 0);


  //execute functions masks
  for (i = 0; i < numbQuads; i++) {
    display(i);
    move(i);
  }
  }
}

//control panel
$( document ).ready(function() {
//execute if user presses generate
  $( "#submit" ).click(function() {
    
    //set submit is true, to avoid conflicts with the draw function when the arrays are not filled yet.
    submit = true;


    
    //random ranges
    //from user
    randomcolors = document.getElementById("randomcolors").checked;
    maskBG = document.getElementById("hidemaskBG").checked;
    random1 = parseInt(document.getElementById("random1").value);

    if (random1 == 0){

      speed1 = parseInt(document.getElementById("speed1").value);
      speed2 = parseInt(document.getElementById("speed2").value);
      speed3 = parseInt(document.getElementById("speed3").value);
      speed4 = parseInt(document.getElementById("speed4").value);

    }else{

    //Set random ranges from the random value the user has submitted
    randomRange1 = Math.floor(Math.random() * random1) + random1;  
    randomRange2 = Math.floor(Math.random() * random1) + random1;  
    randomRange3 = Math.floor(Math.random() * random1) + random1;  
    randomRange4 = Math.floor(Math.random() * random1) + random1;  
    
    //divide by 100 so the max value becomes 1.00 => 2.00
    randomRange1 = randomRange1 / 100;
    randomRange2 = randomRange2 / 100;
    randomRange3 = randomRange3 / 100;
    randomRange4 = randomRange4 / 100;

    //make the range negative or positive
    negativeOrPositive = Math.round(Math.random()) * 2 - 1;
    negativeOrPositive2 = Math.round(Math.random()) * 2 - 1;
    negativeOrPositive3 = Math.round(Math.random()) * 2 - 1;
    negativeOrPositive4 = Math.round(Math.random()) * 2 - 1;

    
    randomRange1 = randomRange1 * negativeOrPositive;
    randomRange2 = randomRange2 * negativeOrPositive2;
    randomRange3 = randomRange3 * negativeOrPositive3;
    randomRange4 = randomRange4 * negativeOrPositive4;

    //apply the random number to the speed values given by the user.
    
    speed1 = parseInt(document.getElementById("speed1").value) * randomRange1;
    speed2 = parseInt(document.getElementById("speed2").value) * randomRange2;
    speed3 = parseInt(document.getElementById("speed3").value) * randomRange3;
    speed4 = parseInt(document.getElementById("speed4").value) * randomRange4;

    }

    //get the remaing values: bg quads and the inwards factor. 
    numbQuadsBG = document.getElementById("numbQuadsBG").value;
    inwards = parseInt(document.getElementById("inwards").value);
  


    //get chosen model
    model = document.getElementById("model").value;

    //arona
    if (model == "arona"){
      //set colors and complimentary colors for arona
      colors = ["#00afac", "#ee7d05" , "#fcc446"];
      colorsComp = ["#fee7b5", "#fcc446", "#fdd06b"];
      //switch model pictures.
      models = ["_assets/car_models/arona/arona-1-big.png", "_assets/car_models/arona/arona-2-big.png", "_assets/car_models/arona/arona-3-big.png", "_assets/car_models/arona/arona-4-big.png"]
      //pick bg color
      bgColor = colors[1];
      //swap car name
      document.getElementById("carname").innerHTML = "Arona";
      //shuffle models, complementary colors and colors
      if (randomcolors){
        shuffle(colors);
        shuffle(models);
        shuffle(colorsComp);
        //apply new order of images to var
        img_arona_1 = loadImage(models[0]);
        img_arona_2 = loadImage(models[1]);
        img_arona_3 = loadImage(models[2]);
        img_arona_4 = loadImage(models[3]);
        bgColor = colors[Math.floor(Math.random() * 2)];
      }

    }
    //ateca
    if (model == "ateca"){
      //Jasper: hier ook functies van maken
      colors = ["#ee7d05", "#8ececf" , "#f18c76"];
      colorsComp = ["#a5d8d9","#bbe2e2","#d2ebec"];
      bgColor = colors[0];

      models = ["_assets/car_models/ateca/ateca-1.png", "_assets/car_models/ateca/ateca-2.png", "_assets/car_models/ateca/ateca-3.png", "_assets/car_models/ateca/ateca-4.png"]
      //swap car name
      document.getElementById("carname").innerHTML = "Ateca";

      //set images in natural order
      img_arona_1 = loadImage(models[0]);
      img_arona_2 = loadImage(models[1]);
      img_arona_3 = loadImage(models[2]);
      img_arona_4 = loadImage(models[3]);
      
      //shuffle models, complementary colors and colors
      if (randomcolors){
        shuffle(colors);
        shuffle(models);
        shuffle(colorsComp);
        //apply new order of images to var
        img_arona_1 = loadImage(models[0]);
        img_arona_2 = loadImage(models[1]);
        img_arona_3 = loadImage(models[2]);
        img_arona_4 = loadImage(models[3]);
        bgColor = colors[Math.floor(Math.random() * 2)];
      }
    }
    //ibiza
    if (model == "ibiza"){
      colors = ["#e63a2b", "#ffde4a" , "#84c497"];
      colorsComp = ["#9dd0a","#b5dcc1","#cee7d5"];
      bgColor = colors[0];

      models = ["_assets/car_models/ibiza/ibiza-1.png", "_assets/car_models/ibiza/ibiza-2.png", "_assets/car_models/ibiza/ibiza-3.png", "_assets/car_models/ibiza/ibiza-4.png"]

      //set images in natural order
      img_arona_1 = loadImage(models[0]);
      img_arona_2 = loadImage(models[1]);
      img_arona_3 = loadImage(models[2]);
      img_arona_4 = loadImage(models[3]);
      
      //shuffle models, complementary colors and colors
      if (randomcolors){
        shuffle(colors);
        shuffle(models);
        shuffle(colorsComp);
        //apply new order of images to var
        img_arona_1 = loadImage(models[0]);
        img_arona_2 = loadImage(models[1]);
        img_arona_3 = loadImage(models[2]);
        img_arona_4 = loadImage(models[3]);
        bgColor = colors[Math.floor(Math.random() * 2)];
      }
    }
    //mii
    if (model == "mii"){
      colors = ["#cf7fa1", "#ffde4a", "#d1b8c7"];
      colorsComp = ["#d999b","#e2b2c7","#ecccd9"];
      bgColor = colors[0];

      models = ["_assets/car_models/mii/mii-1.png", "_assets/car_models/mii/mii-2.png", "_assets/car_models/mii/mii-3.png", "_assets/car_models/mii/mii-4.png"]

      //set images in natural order
      img_arona_1 = loadImage(models[0]);
      img_arona_2 = loadImage(models[1]);
      img_arona_3 = loadImage(models[2]);
      img_arona_4 = loadImage(models[3]);
      
      //shuffle models, complementary colors and colors
      if (randomcolors){
        shuffle(colors);
        shuffle(models);
        shuffle(colorsComp);
        //apply new order of images to var
        img_arona_1 = loadImage(models[0]);
        img_arona_2 = loadImage(models[1]);
        img_arona_3 = loadImage(models[2]);
        img_arona_4 = loadImage(models[3]);
        bgColor = colors[Math.floor(Math.random() * 2)];
      }
    }
    
    //masks

    //fill the arrays with the correct data
    drawQuads();
    drawQuadsBG();
    
    //
    //output vars for developer
    var codeEl = $("#outputcode")
    //empty container first
    codeEl.empty();
    //model
    codeEl.append('<xmp>var model = "' + model + '";</xmp>');
    //numbQuadsBG
    codeEl.append("<xmp>var numbQuadsBG = " + numbQuadsBG + ";</xmp>");
    //speed 1
    codeEl.append("<xmp>var speed1 = " + speed1 + ";</xmp>");
    //speed 2
    codeEl.append("<xmp>var speed2 = " + speed2 + ";</xmp>");
    //speed 3
    codeEl.append("<xmp>var speed3 = " + speed3 + ";</xmp>");
    //speed 4
    codeEl.append("<xmp>var speed4 = " + speed4 + ";</xmp>");
    //inwards
    codeEl.append("<xmp>var inwards = " + inwards + ";</xmp>");
    //hide mask bg
    codeEl.append("<xmp>var maskBG = " + maskBG + ";</xmp>");
    //randomize colors and models
    codeEl.append("<xmp>var randomcolors = " + randomcolors + ";</xmp>");
    //end submit
    var overlay = $("#tool-overlay");
    setTimeout(function(){ overlay.fadeOut(2000); }, 1000);

  });


  //shuffle function
  function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;

}


});




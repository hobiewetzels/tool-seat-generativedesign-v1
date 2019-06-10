<!DOCTYPE html PUBLIC "-//WC//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en">
<head>

<title>Hobie Wetzels - Tool</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8">

<meta name="viewport" content="initial-scale = 1.0" />

<meta name="description" content="Graphic Designer & Web Designer" />
<meta name="keywords" content="Hobie Wetzels Creativity Technology Portfolio Website Webdesign Responsive Front End Innovative Projects Detail Design Graphic Design Animation Signing Interactive Movie" />
<meta name="author" content="Hobie Wetzels" />

<meta property="og:url"                content="http://hobiewetzels.nl" />
<meta property="og:title"          	   content="Graphic Designer & Web Designer" />
<meta property="og:site_name"          content="Portfolio" />
<meta property="og:image"              content="" />

<link href="https://fonts.googleapis.com/css?family=Francois+One" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">

<link rel="icon" type="image/png" href="images/favicon-16x16.png" sizes="16x16">  
<link rel="icon" type="image/png" href="images/favicon-32x32.png" sizes="32x32">  
<link rel="icon" type="image/png" href="images/favicon-96x96.png" sizes="96x96">  

<link rel="stylesheet" type="text/css" href="includes/tool.css?v=1" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.8.0/p5.min.js"></script>

<script type="text/javascript" src="tool.js"></script>
<!-- COUCH EDITABLES -->

<!-- THUMBS FOR HOME -->

</head>

<body>
<main>
	<article class="tool-section" id="article_4" style="">
		<h1>TOOL SEAT: Explore the colors</h1>
		<!-- uiting -->
		<div id='myContainer'> 
		<div id="tool-overlay">
			<img src="_assets/gh-logo.png" alt="">
</div>
      <div id='art'>
      <div class="left-container">
        <h2>SEAT<br><span id="carname">Arona</span>.</h2>
        <h3 id="explore">Explore the colors</h3>
        <div class="colorcontainer">
          <div id="color1"></div><div id="color1"></div><div id="color1"></div>
        </div>
      </div>
        <div class="cta-container">
          <div id="cta">Ontdek de actie</div>
          <img id="logo" src="_assets/Black.png" alt="">
        </div>
      </div>
			</div>
			<button id="submit"><h2>Generate</h2></button>
			<!-- controle panel -->
			<button class="waaier">Controle paneel<div class="circle-plus closed"><div class="horizontal"></div><div class="vertical"></div></div></button>
			<br>
			<div class="circle-content">
				<div id='controlsContainer'>
		  <h1>Controle paneel</h1>
		  <div class="singlecontrolcontainer">
		  <h3>Car model</h3>
          <select id="model" class="select-css">
            <option value="arona">Arona</option>
            <option value="ateca">Ateca</option>
            <option value="ibiza">Ibiza</option>
            <option value="mii">Mii</option>
		  </select>
		</div>
		  <!-- numbbg -->
		  <div class="singlecontrolcontainer">
          <h3>Background shapes</h3><output id="numbQuadsBGOut" >0</output>
		  <input type="range" min="0" max="20" value="0" class="slider" id="numbQuadsBG" oninput='changeValue(this.id)'>
		  </div>
		  <!-- speed 1-->
		  <div class="singlecontrolcontainer">
          <h3>Speed: 1</h3><output id="speed1Out">2000</output>
		  <input type="range" min="100" max="2000" value="2000" class="slider" id="speed1" oninput='changeValue(this.id)'>
		  </div>
		  <!-- speed 2 -->
		  <div class="singlecontrolcontainer">
          <h3>Speed: 2</h3><output id="speed2Out">2000</output>
		  <input type="range" min="100" max="2000" value="2000" class="slider" id="speed2" oninput='changeValue(this.id)'>
		  </div>
		  <!-- speed 3 -->
		  <div class="singlecontrolcontainer">
          <h3>Speed: 3</h3><output id="speed3Out">2000</output>
		  <input type="range" min="100" max="2000" value="2000" class="slider" id="speed3" oninput='changeValue(this.id)'>
		  </div>
		  <!-- speed 4-->
		  <div class="singlecontrolcontainer">
          <h3>Speed: 4</h3><output id="speed4Out">2000</output>
		  <input type="range" min="100" max="2000" value="2000" class="slider" id="speed4" oninput='changeValue(this.id)'>
		  </div>
		  <!-- inwards -->
		  <div class="singlecontrolcontainer">
          <h3>inwards</h3><output id="inwardsOut">400</output>
		  <input type="range" min="0" max="800" value="400" class="slider" id="inwards" oninput='changeValue(this.id)'>
		  </div>
		  <!-- randomize -->
		  <div class="singlecontrolcontainer">
          <h3>randomize</h3><output id="random1Out">100</output>
		  <input type="range" min="100" max="200" value="100" class="slider" id="random1" oninput='changeValue(this.id)'>
		  </div>
		  <!-- random colors -->
		<div class="singlecontrolcontainer">
		<h3> Random colors & models</h3><input type="checkbox" id="randomcolors" value="1" checked class="regular-checkbox">
		</div>
		<!-- hide bg color (mask) -->
		<div class="singlecontrolcontainer">
		<h3>Hide mask backgrounds</h3><input type="checkbox" id="hidemaskBG" value="1" class="regular-checkbox">
		</div>
			</div>

			<div id="outputcodecontainer">
			<h1>Variabelen</h1>
			<div id="outputcode">
			</div>

      </div>
			</div>

	</article>
</main>

</body>
</html>
<script>
//plus minus animation
$('.waaier').on('click', function(){
	var button = $(this);
	var circle = $(this).find(".circle-plus");
	var content = $(this).nextUntil('.circle-content').next();

	if ( content.is( ":hidden" ) ){
		content.slideDown({duration: 300, easing: "swing"});

	}else{
		content.slideUp({duration: 300, easing: "swing"});
	}
	
	button.toggleClass('waaier-active');
	
	circle.toggleClass('opened');


})
//tool
function changeValue(id){
    el = document.getElementById(id);
    value = el.value;
    target = id + "Out";
    target = document.getElementById(target);
    target.innerHTML = value;
    console.log(target, value);
  }


</script>
<?php COUCH::invoke(); ?>
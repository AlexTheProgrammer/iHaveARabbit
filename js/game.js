function runGame() {
	//need resources setup 
	var canvas = document.getElementById("game-container");
	var w = window.innerWidth;
	var h = window.innerHeight;
	canvas.width = w;
	canvas.height = h;
	context = canvas.getContext('2d');
	var base_image = new Image();
	base_image.src = "./resources/bunny.png";

	base_image.onload = function() {
		startGame(canvas, base_image);

	};
}

function startGame(canvas, base_image) {
	var bunnyWidth = 70;
	var bunnyHeight = base_image.height * (bunnyWidth/base_image.width);
	var dx = 1;
	var dy = 1;
	var bunnySpeed = 3
	var randomWalkRate = 2;
	var maxBunnies = 10;


	function bunny(xCoord, yCoord) {
		this.isAlives = true;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
		this.height = bunnyHeight;
		this.width = bunnyWidth;
		this.dx = dx
		this.dy = dy
	}
	
	var bunnies = []
	var bunny0 = new bunny(100, 100);

	bunnies.push(bunny0)

	add_image(bunny0);
	

	function add_image(bunny) {
		context.drawImage(base_image, bunny.xCoord, bunny.yCoord, bunny.width, bunny.height);
	}

	function moveBunny(bunny) {
		if (bunny.xCoord + bunny.width >= canvas.width || bunny.xCoord < 0) {
			bunny.dx *= -1 
		} 
		if (bunny.yCoord + bunny.height>= canvas.height || bunny.yCoord < 0) {
			bunny.dy *= -1 
		} 
		
		bunny.xCoord += bunny.dx * Math.random() * randomWalkRate;
		bunny.yCoord += bunny.dy * Math.random() * randomWalkRate;	
	}

	function bunnyGenerator()  {
		xCoord = Math.random() * canvas.width;
		yCoord = Math.random() * canvas.height;	
		return new bunny(xCoord, yCoord);
	}

	setInterval(function() {

		context.clearRect(0, 0, canvas.width, canvas.height)

		if (bunnies.length < maxBunnies) { 
			bunnies.push(new bunny(canvas.width * Math.random(), canvas.height * Math.random()));	
		}

		console.log(bunnies.length)
		for (var i = 0; i < bunnies.length; i++) {
			moveBunny(bunnies[i]);
			add_image(bunnies[i])
		}
	}
	, bunnySpeed);
}


window.onload = runGame;

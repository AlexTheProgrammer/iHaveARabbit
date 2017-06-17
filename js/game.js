function runGame() {
	//need resources setup 
	var canvas = document.getElementById("game-container");
	context = canvas.getContext('2d');
	var base_image = new Image();
	base_image.src = "../resources/bunny.png";

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

//	bunnies.append(bunny0)

	add_image(bunny0);
	

	function add_image(bunny) {
		context.clearRect(0, 0, canvas.width, canvas.height)
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
		yCoord = Math.random() * cnavas.height;	
		return new bunny(xCoord, yCoord);
	}

	setInterval(function() {
			
		moveBunny(bunny0);
		add_image(bunny0)
		}
	, bunnySpeed);
}


window.onload = runGame;

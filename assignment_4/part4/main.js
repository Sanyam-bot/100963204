// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// To keep the count of removed balls
let removedBalls = 0;
// store the paragraph element to access below
let para = document.querySelector("p");

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Defined a Shape class, which takes x, y, velX, velY
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Ball extends Shape
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists=true) {
    super(x, y, velX, velY) // Call Shape constructor
    this.color = color;
    this.size = size;
    this.exists = exists; // added exists property, to keep sure if the ball exists or not
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  // Check for collisions with other balls and change color on impact
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) { 
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Define the EvilClass, which removes balls on collision
class EvilClass extends Shape{
	constructor(x, y) {
		super(x, y, 20, 20); // Call the Shape constructor
		this.color = "white";
		this.size = 10;
    
    // Moves the evilCircle up, down, left and right, depending on the keyDown
		window.addEventListener("keydown", (e) => {
			switch (e.key) {
				case "a":
					this.x -= this.velX;
					break;
				case "d":
					this.x += this.velX;
					break;
				case "w":
					this.y -= this.velY;
					break;
				case "s":
					this.y += this.velY;
					break;
			}
		});	
	}

  // draw the evil circle
	draw() {
		ctx.beginPath();
		ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
	}

  // if the ball goes out of bounds, push it into back to the canvas
	checkBounds() {
		if (this.x + this.size >= width) {
      this.x = this.x - this.size;
    }

    if (this.x - this.size <= 0) {
      this.x = this.x + this.size;
    }

    if (this.y + this.size >= height) {
      this.y = this.y - this.size;
    }

    if (this.y - this.size <= 0) {
      this.y = this.y + this.size;
    }
	}

  // detects the collison with the balls, then removes that detected ball
	collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false;
          removedBalls++; // add to removed balls, when ever there's a collison
          // Display the ball count
          para.innerText = `Balls Counter: ${balls.length - removedBalls}`;
        }
      }
    }
  }
}

const balls = [];
const evilCircle = new EvilClass(20, 30); // create a EvilCircle object

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

// Display the initial ball count
para.innerText = `Balls Counter: ${balls.length - removedBalls}`;

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
		if (ball.exists) { // make sure that the ball exists
			ball.draw();
			ball.update();
			ball.collisionDetect();
		}
    
    // Draw the evil circle on the canvas
		evilCircle.draw();
    // Make sure that evil circle stays in bound
		evilCircle.checkBounds();		
    // removes the ball, if it detects a collison with the evil circle
		evilCircle.collisionDetect();

  }

  requestAnimationFrame(loop);
}

loop();
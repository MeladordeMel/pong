let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;et leftPaddle;
l
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);

  // Exibir pontuação
  fill(255);
  textSize(32);
  text(leftScore, width / 4, 40);
  text(rightScore, (width * 3) / 4, 40);

  if (!gameOver) {
    // Atualizar e exibir paletas
    leftPaddle.update();
    rightPaddle.update();
    leftPaddle.show();
    rightPaddle.show();

    // Atualizar e exibir bola
    ball.update();
    ball.edges();
    ball.show();

    // Verificar colisão com as paletas
    ball.checkPaddleCollision(leftPaddle);
    ball.checkPaddleCollision(rightPaddle);

    // Verificar se a bola sai da tela
    if (ball.isOut()) {
      if (ball.x < 0) {
        rightScore++;
      } else {
        leftScore++;
      }
      if (leftScore >= 5 || rightScore >= 5) {
        gameOver = true;
      } else {
        ball.reset();
      }
    }
  } else {
    // Exibir mensagem de fim de jogo
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Game Over", width / 2, height / 2);
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;
    this.y = height / 2 - this.h / 2;
    this.ySpeed = 0;
    if (isLeft) {
      this.x = this.w * 2;
    } else {
      this.x = width - this.w * 3;
    }
  }

  update() {
    this.y = constrain(this.y + this.ySpeed, 0, height - this.h);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move(dir) {
    this.ySpeed = dir * 5;
  }

  stop() {
    this.ySpeed = 0;
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 12;
    this.xSpeed = random(-6, 10);
    this.ySpeed = random(-6, 10);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  checkPaddleCollision(paddle) {
    if (
      this.x - this.r < paddle.x + paddle.w &&
      this.x + this.r > paddle.x &&
      this.y - this.r < paddle.y + paddle.h &&
      this.y + this.r > paddle.y
    ) {
      this.xSpeed *= -1.1;
      this.ySpeed *= 1.1;
    }
  }

  isOut() {
    return this.x < 0 || this.x > width;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-2, 2]);
    this.ySpeed = random([-2, 2]);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rightPaddle.move(-1);
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.move(1);
  }
  if (key === "w") {
    leftPaddle.move(-1);
  } else if (key === "s") {
    leftPaddle.move(1);
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
    rightPaddle.stop();
  }
  if (key === "w" || key === "s") {
    leftPaddle.stop();
  }
}

(function breakout() {
  const canvas = document.getElementById('breakout');
  const ctx = canvas.getContext('2d');
  const fillColor = '#0095DD';
  let interval;
  let rightPressed = false;
  let leftPressed = false;

  const ballRadius = 10;
  let dx = 2;
  let dy = -2;
  let x = canvas.width / 2;
  let y = canvas.height - 30;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
  }

  const paddleHeight = 10;
  const paddleWidth = 75;
  const paddleSpeed = 7;
  let paddleX = (canvas.width - paddleWidth) / 2;

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert('Game over');
        document.location.reload();
        clearInterval(interval);
        return;
      }
    }

    if (rightPressed && paddleX <= canvas.width - paddleWidth) {
      paddleX += paddleSpeed;
    }

    if (leftPressed && paddleX >= 0) {
      paddleX -= paddleSpeed;
    }

    x += dx;
    y += dy;
  }

  function keyHandler(event) {
    switch (event.key) {
      case 'Right':
      case 'ArrowRight':
        rightPressed = event.type === 'keydown';
        break;
      case 'Left':
      case 'ArrowLeft':
        leftPressed = event.type === 'keydown';
        break;
    }
  }

  interval = setInterval(draw, 10);
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('keyup', keyHandler);
})();

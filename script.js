const message = document.getElementById('message');
const button = document.getElementById('startBtn');
const countdown = document.getElementById('countdown');
const fireSound = document.getElementById('fireSound');
const cheerSound = document.getElementById('cheerSound');

button.addEventListener('click', () => {
  button.style.display = 'none';
  message.textContent = 'Countdown begins...';

  let count = 5;
  countdown.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(interval);
      countdown.style.display = 'none';
      message.style.display = 'none';
      fireSound.play();
      cheerSound.play();
      showGrandWinner();
    } else {
      countdown.textContent = count;
    }
  }, 1000);
});

function showGrandWinner() {
  document.getElementById('grandWinnerScreen').style.display = 'block';

  // Reveal names one by one
  const names = document.querySelectorAll('.winner-names-list li');
  names.forEach((name, index) => {
    setTimeout(() => {
      name.style.opacity = '1';
    }, index * 800);
  });

  launchFireworks('grandCanvas');
}

function launchFireworks(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];
  const particles = [];
  const colors = ['#ff0043', '#14fc56', '#1e90ff', '#ffff00', '#ff00ff'];
  const explosionSound = new Audio('https://www.soundjay.com/explosion/explosion-01.mp3');

  function Firework() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = Math.random() * canvas.height / 2;
    this.speed = Math.random() * 3 + 3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.exploded = false;

    this.update = function () {
      this.y -= this.speed;
      if (this.y <= this.targetY && !this.exploded) {
        this.explode();
        this.exploded = true;
      }
    };

    this.explode = function () {
      explosionSound.cloneNode(true).play();
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }
    };

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  }

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 5 + 2;
    this.gravity = 0.05;
    this.alpha = 1;
    this.color = color;

    this.update = function () {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= 0.01;
    };

    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    };
  }

  function animate() {
    ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.1) {
      fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].draw();
      if (fireworks[i].exploded) {
        fireworks.splice(i, 1);
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    

    requestAnimationFrame(animate);
  }

  animate();
}



function showGrandWinner() {
  document.getElementById('grandWinnerScreen').style.display = 'block';

  const ticketElement = document.querySelector('.ticket-number');
  let current = 0;
  const target = 1635;
  const duration = 2000; // in ms
  const increment = Math.ceil(target / (duration / 30));

  const counterInterval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(counterInterval);
      ticketElement.textContent = current;

      // ✅ Reveal names ONLY AFTER counter ends
      const names = document.querySelectorAll('.winner-names-list li');
      names.forEach((name, index) => {
        setTimeout(() => {
          name.style.opacity = '1';
          name.style.transform = 'scale(1.1)';
        }, index * 800);
      });

      // ✅ Start fireworks
      launchFireworks('grandCanvas');
    } else {
      ticketElement.textContent = current;
    }
  }, 30);
}

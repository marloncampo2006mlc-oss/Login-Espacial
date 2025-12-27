const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = [];
for (let i = 0; i < 500; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    a: Math.random(),
    tw: Math.random() * 0.02
  });
}

class ShootingStar {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.4;
    this.len = Math.random() * 150 + 80;
    this.speed = Math.random() * 6 + 10;
    this.life = Math.random() * 80 + 60;
  }

  update() {
    this.x += this.speed;
    this.y += this.speed * 0.8;
    this.life--;

    if (this.life <= 0) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.len, this.y - this.len * 0.8);
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const shootingStars = [];
for (let i = 0; i < 10; i++) shootingStars.push(new ShootingStar());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const s of stars) {
    s.a += s.tw;
    if (s.a <= 0 || s.a >= 1) s.tw *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  }

  for (const star of shootingStars) {
    star.update();
    star.draw();
  }

  requestAnimationFrame(animate);
}

animate();

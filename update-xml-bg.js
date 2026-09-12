import fs from 'fs';

let content = fs.readFileSync('build-xml.ts', 'utf8');

const oldScript = `    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let width, height;
      
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();
      
      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(32, 224, 220, 0.4)';
          ctx.fill();
        }
      }
      
      for(let i=0; i<80; i++) particles.push(new Particle());
      
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        
        for(let i=0; i<particles.length; i++) {
          for(let j=i+1; j<particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = 'rgba(57, 167, 255, ' + (1 - dist/120)*0.2 + ')';
              ctx.stroke();
            }
          }
        }
        requestAnimationFrame(animate);
      };
      animate();
    }`;

const newScript = `    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      let width, height;
      let waveAngle = 0;
      
      const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', resize);
      resize();
      
      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.radius = Math.random() * 2 + 1;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
      }
      
      for(let i=0; i<90; i++) particles.push(new Particle());
      
      const drawGlobe = (cx, cy, radius, time) => {
        ctx.save();
        ctx.strokeStyle = 'rgba(32, 224, 220, 0.15)';
        ctx.lineWidth = 1;
        for (let r = radius * 0.3; r <= radius; r += radius * 0.25) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (let angle = 0; angle < Math.PI; angle += Math.PI / 6) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, radius, radius * Math.sin(angle + time), angle, 0, Math.PI * 2);
          ctx.stroke();
        }
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, 'rgba(32, 224, 220, 0.25)');
        grad.addColorStop(0.5, 'rgba(57, 167, 255, 0.1)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Tech dots grid
        ctx.fillStyle = 'rgba(57, 167, 255, 0.08)';
        for (let x = 40; x < width; x += 50) {
          for (let y = 40; y < height; y += 50) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        const time = Date.now() * 0.001;
        drawGlobe(width - 120, 150, 150, time * 0.5);
        drawGlobe(120, height - 120, 170, -time * 0.4);
        
        waveAngle += 0.015;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height * 0.4);
        for (let x = 0; x <= width; x += 50) {
          const y = height * 0.4 + Math.sin(x * 0.003 + waveAngle) * 60 + Math.cos(x * 0.005 - waveAngle * 0.7) * 40;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const waveGrad = ctx.createLinearGradient(0, height * 0.2, 0, height);
        waveGrad.addColorStop(0, 'rgba(57, 167, 255, 0.12)');
        waveGrad.addColorStop(0.5, 'rgba(32, 224, 220, 0.06)');
        waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = waveGrad;
        ctx.fill();
        ctx.restore();
        
        particles.forEach(p => p.update());
        
        for(let i=0; i<particles.length; i++) {
          for(let j=i+1; j<particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 130) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = 'rgba(32, 224, 220, ' + (1 - dist/130)*0.25 + ')';
              ctx.stroke();
            }
          }
          ctx.beginPath();
          ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(32, 224, 220, 0.6)';
          ctx.fill();
        }
        requestAnimationFrame(animate);
      };
      animate();
    }`;

if (content.includes(oldScript)) {
  content = content.replace(oldScript, newScript);
  fs.writeFileSync('build-xml.ts', content);
  console.log('build-xml.ts successfully updated with reference background animation.');
} else {
  console.log('Could not find exact oldScript in build-xml.ts, checking alternative.');
}

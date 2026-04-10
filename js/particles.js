// 粒子背景效果
class Particles {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.container.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  createParticles() {
    const particleCount = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 10000), 100);
    this.particles = [];
    // 检查是否为深色模式
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const baseColor = isDarkTheme ? '251, 146, 60' : '251, 146, 60';
    const baseOpacity = isDarkTheme ? 0.3 : 0.5;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        baseSize: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${baseColor}, ${Math.random() * baseOpacity + 0.1})`,
        baseOpacity: Math.random() * baseOpacity + 0.1,
        opacity: Math.random() * baseOpacity + 0.1,
        breathProgress: Math.random() * Math.PI * 2,
        breathSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 检查是否为深色模式
    const isDarkTheme = document.body.classList.contains('dark-theme');
    const baseOpacity = isDarkTheme ? 0.1 : 0.2;
    
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      // 更新呼吸效果
      particle.breathProgress += particle.breathSpeed;
      const breathFactor = Math.sin(particle.breathProgress) * 0.5 + 0.5;
      
      // 更新粒子大小和透明度
      particle.size = particle.baseSize * (0.8 + breathFactor * 0.4);
      particle.opacity = particle.baseOpacity * (0.8 + breathFactor * 0.4);
      
      // 更新粒子颜色（包含透明度）
      const colorParts = particle.color.split(',');
      const rgb = colorParts[0] + ',' + colorParts[1] + ',' + colorParts[2];
      particle.color = `${rgb}, ${particle.opacity})`;
      
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // 更新粒子位置
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // 边界检查
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.speedX *= -1;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.speedY *= -1;
      }
      
      // 连接临近的粒子
      for (let j = i + 1; j < this.particles.length; j++) {
        const otherParticle = this.particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(251, 146, 60, ${baseOpacity * (1 - distance / 100) * breathFactor})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

// 导出粒子类
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Particles;
} else if (typeof window !== 'undefined') {
  window.Particles = Particles;
}

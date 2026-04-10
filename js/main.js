document.addEventListener('DOMContentLoaded', function() {
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  
  // 初始化粒子背景效果
  const heroSection = document.querySelector('#home');
  if (heroSection) {
    new Particles(heroSection);
  }
  
  // 检查本地存储的主题偏好
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
  
  // 主题切换功能
  themeIcon.addEventListener('click', function() {
    if (body.classList.contains('light-theme')) {
      // 切换到深色模式
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    } else {
      // 切换到浅色模式
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    }
    
    // 更新粒子背景效果
    if (heroSection) {
      // 重新创建粒子以适应新主题
      const canvas = heroSection.querySelector('canvas');
      if (canvas) {
        canvas.remove();
      }
      new Particles(heroSection);
    }
  });
  
  // 导航栏滚动效果
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    // 添加scrolled类
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // 滚动动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察所有section
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // 项目卡片3D悬停效果
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
  
  // 技能项动画
  document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    
    const skillObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // 触发技能进度条动画
          const skillBar = entry.target.querySelector('.skill-bar');
          if (skillBar) {
            const progress = skillBar.getAttribute('data-progress');
            setTimeout(() => {
              skillBar.style.width = `${progress}%`;
            }, index * 100);
          }
          
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillObserver.observe(item);
  });
  
  // 代码打字效果
  const codeLines = document.querySelectorAll('.code-line');
  codeLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.animation = 'fadeInUp 0.5s ease forwards';
    }, index * 200);
  });
  
  // 英雄区域动态打字效果
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let index = 0;
    const typeSpeed = 100;
    
    function type() {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(type, typeSpeed);
      }
    }
    
    // 延迟开始打字效果，让页面先加载
    setTimeout(type, 1000);
  }
  
  // 社交链接悬停效果
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0)';
    });
  });
  
  // 按钮点击效果
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      this.appendChild(ripple);
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // 添加涟漪效果的CSS
  const style = document.createElement('style');
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // 页面加载完成后的动画
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // 性能优化：使用 requestAnimationFrame 进行滚动事件节流
  let ticking = false;
  function updateOnScroll() {
    // 更新滚动相关的视觉效果
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
  
  // 预加载图片资源
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// 工具函数
const utils = {
  // 防抖函数
  debounce: function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // 节流函数
  throttle: function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // 检查元素是否在视口中
  isInViewport: function(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};
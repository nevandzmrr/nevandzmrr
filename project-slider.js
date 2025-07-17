// Project Image Slider
class ProjectSlider {
    constructor() {
        this.initSliders();
    }

    initSliders() {
        const sliders = document.querySelectorAll('.project-slider');
        
        sliders.forEach((slider, index) => {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev-btn');
            const nextBtn = slider.querySelector('.next-btn');
            const dots = slider.querySelectorAll('.dot');
            
            let currentSlide = 0;
            const totalSlides = slides.length;

            // Show first slide
            this.showSlide(slider, currentSlide);

            // Previous button
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    this.showSlide(slider, currentSlide);
                });
            }

            // Next button
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    this.showSlide(slider, currentSlide);
                });
            }

            // Dot navigation
            dots.forEach((dot, dotIndex) => {
                dot.addEventListener('click', () => {
                    currentSlide = dotIndex;
                    this.showSlide(slider, currentSlide);
                });
            });

            // Touch/swipe support
            let startX = 0;
            let endX = 0;

            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe(slider, startX, endX, () => {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    this.showSlide(slider, currentSlide);
                }, () => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    this.showSlide(slider, currentSlide);
                });
            });

            // Keyboard navigation
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    this.showSlide(slider, currentSlide);
                } else if (e.key === 'ArrowRight') {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    this.showSlide(slider, currentSlide);
                }
            });

            // Auto-play (optional)
            this.startAutoPlay(slider, () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                this.showSlide(slider, currentSlide);
            });
        });
    }

    showSlide(slider, slideIndex) {
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        const counter = slider.querySelector('.slide-counter');
        
        // Get current active slide
        const currentActiveSlide = slider.querySelector('.slide.active');
        
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active', 'prev');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide with animation
        if (slides[slideIndex]) {
            slides[slideIndex].style.display = 'block';
            
            // Add animation class based on direction
            if (currentActiveSlide) {
                const currentIndex = Array.from(slides).indexOf(currentActiveSlide);
                if (slideIndex > currentIndex) {
                    slides[slideIndex].classList.add('prev');
                    setTimeout(() => {
                        slides[slideIndex].classList.remove('prev');
                        slides[slideIndex].classList.add('active');
                    }, 50);
                } else {
                    slides[slideIndex].classList.add('active');
                }
            } else {
                slides[slideIndex].classList.add('active');
            }
        }
        
        // Activate current dot
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
        
        // Update counter
        if (counter) {
            counter.textContent = `${slideIndex + 1}/${slides.length}`;
        }
    }

    handleSwipe(slider, startX, endX, onSwipeLeft, onSwipeRight) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                onSwipeRight();
            } else {
                // Swipe right
                onSwipeLeft();
            }
        }
    }

    startAutoPlay(slider, nextSlideCallback) {
        let autoPlayInterval;
        
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlideCallback, 5000); // 5 seconds
        };
        
        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };
        
        // Start auto-play
        startAutoPlay();
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // Pause on touch
        slider.addEventListener('touchstart', stopAutoPlay);
        slider.addEventListener('touchend', () => {
            setTimeout(startAutoPlay, 2000); // Resume after 2 seconds
        });
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
    
    // Handle image loading
    const images = document.querySelectorAll('.slide img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
            img.classList.add('error');
            img.classList.remove('loaded');
        });
        
        // Check if image is already loaded
        if (img.complete) {
            if (img.naturalWidth > 0) {
                img.classList.add('loaded');
            } else {
                img.classList.add('error');
            }
        }
    });
}); 
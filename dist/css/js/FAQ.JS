document.addEventListener('DOMContentLoaded', () => {
    class StudentCarousel {
        constructor(element) {
            this.carousel = element;
            this.items = [...this.carousel.querySelectorAll('.student-carousel-item')];
            this.indicators = [...this.carousel.querySelectorAll('.student-carousel-indicators button')];
            this.currentIndex = 0;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoPlayInterval = null;
            this.isAnimating = false;
            this.init();
        }

        init() {
            this.carousel.querySelector('.prev').addEventListener('click', () => this.prev());
            this.carousel.querySelector('.next').addEventListener('click', () => this.next());
            
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goTo(index));
            });

            this.carousel.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].clientX;
            });

            this.carousel.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });

            this.startAutoPlay();
            this.update();
        }

        update() {
            this.items.forEach((item, index) => {
                item.classList.remove('active', 'prev', 'next');
                
                if (index === this.currentIndex) {
                    item.classList.add('active');
                } else if (index === this.getPrevIndex()) {
                    item.classList.add('prev');
                } else if (index === this.getNextIndex()) {
                    item.classList.add('next');
                }
            });

            this.indicators.forEach(indicator => indicator.classList.remove('active'));
            this.indicators[this.currentIndex].classList.add('active');
        }

        getPrevIndex() {
            return (this.currentIndex - 1 + this.items.length) % this.items.length;
        }

        getNextIndex() {
            return (this.currentIndex + 1) % this.items.length;
        }

        prev() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.currentIndex = this.getPrevIndex();
            this.update();
            setTimeout(() => this.isAnimating = false, 600);
        }

        next() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.currentIndex = this.getNextIndex();
            this.update();
            setTimeout(() => this.isAnimating = false, 600);
        }

        goTo(index) {
            if (this.isAnimating || index === this.currentIndex) return;
            this.isAnimating = true;
            this.currentIndex = index;
            this.update();
            setTimeout(() => this.isAnimating = false, 600);
        }

        handleSwipe() {
            const minSwipeDistance = 50;
            const swipeDistance = this.touchStartX - this.touchEndX;

            if (Math.abs(swipeDistance) < minSwipeDistance) return;

            if (swipeDistance > 0) {
                this.next();
            } else {
                this.prev();
            }
        }

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                if (!this.isAnimating) this.next();
            }, 5000);

            this.carousel.addEventListener('mouseenter', () => clearInterval(this.autoPlayInterval));
            this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }


    document.querySelectorAll('.student-carousel').forEach(carousel => {
        new StudentCarousel(carousel);
    });

    
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const toggleBtn = item.querySelector('.faq__toggle-btn');
        const answer = item.querySelector('.faq__answer');
        
        toggleBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('faq__item--active');
            
            faqItems.forEach(el => {
                el.classList.remove('faq__item--active');
                el.querySelector('.faq__answer').style.maxHeight = null;
                const img = el.querySelector('img');
                if (img) img.src = 'img/icons/plus.png';
                el.setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('faq__item--active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                const img = toggleBtn.querySelector('img');
                if (img) img.src = 'img/icons/minus.png';
                item.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
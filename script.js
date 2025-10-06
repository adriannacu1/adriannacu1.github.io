// Digital Scrapbook JavaScript
class DigitalScrapbook {
    constructor() {
        this.currentPageIndex = 0;
        this.pages = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.generateMonthsaryDates();
        this.createPages();
        this.updateNavigation();
        this.setupEventListeners();
    }

    generateMonthsaryDates() {
        const startDate = new Date(2024, 11, 7); // December 7, 2024 (month is 0-indexed)
        const endDate = new Date(2025, 9, 7);   // October 7, 2025
        
        this.monthsaryDates = [];
        let currentDate = new Date(startDate);
        let monthCount = 1;

        while (currentDate <= endDate) {
            this.monthsaryDates.push({
                date: new Date(currentDate),
                monthNumber: monthCount,
                title: this.getMonthsaryTitle(monthCount),
                formattedDate: this.formatDate(currentDate)
            });

            // Add one month
            currentDate.setMonth(currentDate.getMonth() + 1);
            monthCount++;
        }

        console.log('Generated monthsary dates:', this.monthsaryDates);
    }

    getMonthsaryTitle(monthNumber) {
        const titles = {
            1: '1st Monthsary',
            2: '2nd Monthsary',
            3: '3rd Monthsary',
            4: '4th Monthsary',
            5: '5th Monthsary',
            6: '6th Monthsary',
            7: '7th Monthsary',
            8: '8th Monthsary',
            9: '9th Monthsary',
            10: '10th Monthsary'
        };
        return titles[monthNumber] || `${monthNumber}th Monthsary`;
    }

    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        return date.toLocaleDateString('en-US', options);
    }

    createPages() {
        const container = document.querySelector('.scrapbook-container');
        
        // Create monthsary pages
        this.monthsaryDates.forEach((monthsary, index) => {
            const page = document.createElement('div');
            page.className = 'page monthsary-page';
            page.id = `page-${index + 1}`;
            page.style.display = 'none'; // Initially hidden
            page.innerHTML = `
                <div class="content-wrapper">
                    <div class="date-container animate__animated">
                        <h2 class="monthsary-title">${monthsary.title}</h2>
                        <p class="monthsary-date">${monthsary.formattedDate}</p>
                        <div class="heart-decoration">
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-heart"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="memory-placeholder" style="margin-top: 30px; opacity: 0.6;">
                            <i class="fas fa-image" style="font-size: 2rem; color: #FFB6C1; margin-bottom: 10px;"></i>
                            <p style="font-size: 0.9rem; color: #DB7093;">Memory to be added...</p>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(page);
        });

        // Update total pages count
        this.totalPages = this.monthsaryDates.length + 1; // +1 for cover page
        document.getElementById('total-pages').textContent = this.totalPages - 1; // Don't count cover in display
        console.log('Total pages created:', this.totalPages);
    }

    updateNavigation() {
        const navigation = document.getElementById('navigation');
        const currentPageSpan = document.getElementById('current-page');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        // Show/hide navigation based on current page
        if (this.currentPageIndex === 0) {
            navigation.style.display = 'none';
        } else {
            navigation.style.display = 'flex';
            currentPageSpan.textContent = this.currentPageIndex;
            
            // Update button states
            prevBtn.disabled = this.currentPageIndex === 1;
            nextBtn.disabled = this.currentPageIndex === this.totalPages - 1;
            
            // Update button text for last page
            if (this.currentPageIndex === this.totalPages - 1) {
                nextBtn.innerHTML = '<i class="fas fa-heart"></i> Our Journey Continues...';
            } else {
                nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            }
        }
    }

    showPage(pageIndex, direction = 'next') {
        if (this.isAnimating || pageIndex < 0 || pageIndex >= this.totalPages) {
            return;
        }

        this.isAnimating = true;
        const pages = document.querySelectorAll('.page');
        const currentPage = pages[this.currentPageIndex];
        const targetPage = pages[pageIndex];

        // Ensure target page exists
        if (!targetPage) {
            this.isAnimating = false;
            return;
        }

        // Hide current page with animation
        if (currentPage) {
            currentPage.classList.remove('active');
            if (direction === 'next') {
                currentPage.classList.add('slide-out-left');
            } else {
                currentPage.classList.add('slide-out-right');
            }
        }

        // Show target page with animation
        setTimeout(() => {
            if (currentPage) {
                currentPage.style.display = 'none';
                currentPage.classList.remove('slide-out-left', 'slide-out-right');
            }

            targetPage.style.display = 'flex';
            if (direction === 'next') {
                targetPage.classList.add('slide-in-right');
            } else {
                targetPage.classList.add('slide-in-left');
            }

            // Animate in
            setTimeout(() => {
                targetPage.classList.remove('slide-in-left', 'slide-in-right');
                targetPage.classList.add('active', 'animate-in');

                // Add content animation for monthsary pages
                if (pageIndex > 0) {
                    const dateContainer = targetPage.querySelector('.date-container');
                    dateContainer.classList.add('animate__fadeInUp');
                }

                this.currentPageIndex = pageIndex;
                this.updateNavigation();
                
                setTimeout(() => {
                    this.isAnimating = false;
                    targetPage.classList.remove('animate-in');
                    if (dateContainer) {
                        dateContainer.classList.remove('animate__fadeInUp');
                    }
                }, 600);
            }, 50);
        }, 300);
    }

    nextPage() {
        if (this.currentPageIndex < this.totalPages - 1) {
            this.showPage(this.currentPageIndex + 1, 'next');
        }
    }

    prevPage() {
        if (this.currentPageIndex > 0) {
            this.showPage(this.currentPageIndex - 1, 'prev');
        }
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextPage();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevPage();
            }
        });

        // Touch/swipe support
        let startX = null;
        let startY = null;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (startX === null || startY === null || this.isAnimating) {
                return;
            }

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next page
                    this.nextPage();
                } else {
                    // Swipe right - previous page
                    this.prevPage();
                }
            }

            startX = null;
            startY = null;
        });
    }

    // Method to add memories later (for future use)
    addMemory(pageIndex, title, image, message) {
        if (pageIndex < 1 || pageIndex >= this.totalPages) return;
        
        const page = document.getElementById(`page-${pageIndex}`);
        const placeholder = page.querySelector('.memory-placeholder');
        
        if (placeholder) {
            placeholder.innerHTML = `
                <div class="memory-content">
                    ${image ? `<img src="${image}" alt="${title}" class="memory-image">` : ''}
                    ${title ? `<h3 class="memory-title">${title}</h3>` : ''}
                    ${message ? `<p class="memory-message">${message}</p>` : ''}
                </div>
            `;
            placeholder.style.opacity = '1';
        }
    }
}

// Global functions for navigation buttons
function nextPage() {
    console.log('nextPage called, scrapbook exists:', !!window.scrapbook);
    if (window.scrapbook) {
        console.log('Current page index:', window.scrapbook.currentPageIndex);
        window.scrapbook.nextPage();
    } else {
        console.error('Scrapbook not initialized yet');
    }
}

function prevPage() {
    console.log('prevPage called');
    if (window.scrapbook) {
        window.scrapbook.prevPage();
    } else {
        console.error('Scrapbook not initialized yet');
    }
}

// Initialize the scrapbook when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.scrapbook = new DigitalScrapbook();
    
    // Add some loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Add some sparkle effects (optional enhancement)
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.position = 'fixed';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#FFB6C1';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0px) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Create sparkles occasionally
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        createSparkle();
    }
}, 2000);
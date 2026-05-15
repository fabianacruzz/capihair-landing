// Initialize Lucide Icons
lucide.createIcons();

// Count-up Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    // Select all count-up elements
    const countUpElements = document.querySelectorAll('.count-up');
    const countUpFloatElements = document.querySelectorAll('.count-up-float');
    
    // Animation function
    const animateValue = (obj, start, end, duration, isFloat = false) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Apply easeOutQuart for smooth ending
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const currentVal = start + (end - start) * easeProgress;
            
            if (isFloat) {
                // Formatting for float: 4.9 instead of 4.90
                obj.innerHTML = currentVal.toFixed(1).replace('.', ',');
            } else {
                // Formatting for integers with thousand separators: 6.200
                obj.innerHTML = Math.floor(currentVal).toLocaleString('pt-BR');
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure final value is exact
                if (isFloat) {
                    obj.innerHTML = end.toFixed(1).replace('.', ',');
                } else {
                    obj.innerHTML = end.toLocaleString('pt-BR');
                }
            }
        };
        window.requestAnimationFrame(step);
    };

    // Intersection Observer callback
    const countUpObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetVal = parseFloat(el.getAttribute('data-target'));
                const isFloat = el.classList.contains('count-up-float');
                
                // Start animation
                animateValue(el, 0, targetVal, 2000, isFloat);
                
                // Unobserve after animating once
                observer.unobserve(el);
            }
        });
    };

    // Create observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const countUpObserver = new IntersectionObserver(countUpObserverCallback, observerOptions);

    // Observe elements
    countUpElements.forEach(el => countUpObserver.observe(el));
    countUpFloatElements.forEach(el => countUpObserver.observe(el));

    // FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

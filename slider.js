const imageItems = document.querySelectorAll('.images .image');
const titles = document.querySelectorAll('.dynamicTitles h2');
let activeIndex = 0;

const rootStyles = getComputedStyle(document.documentElement);
const transitionDurationString = rootStyles.getPropertyValue('--transition-duration').trim();
const slideDurationString = rootStyles.getPropertyValue('--slide-duration').trim();

const parseCSSTime = (timeString) => {
    if (timeString.endsWith('ms')) {
        return parseFloat(timeString);
    }
    if (timeString.endsWith('s')) {
        return parseFloat(timeString) * 1000;
    }
    return parseFloat(timeString);
};

const transitionDuration = parseCSSTime(transitionDurationString);
const slideDuration = parseCSSTime(slideDurationString);

function showSlide(index) {
    const currentActiveImage = document.querySelector('.image.active');
    if (currentActiveImage) {
        currentActiveImage.classList.remove('active');
        setTimeout(() => {
            currentActiveImage.classList.remove('zoomIn');
        }, transitionDuration);
    }

    const newActiveImage = imageItems[index];
    newActiveImage.classList.add('active', 'zoomIn');

    const currentActiveTitle = document.querySelector('.dynamicTitles h2.active');
    if (currentActiveTitle) {
        currentActiveTitle.classList.remove('active');
        currentActiveTitle.classList.add('swipe-up');
        setTimeout(() => {
            currentActiveTitle.classList.remove('swipe-up');
        }, transitionDuration);
    }

    const newActiveTitle = titles[index];
    newActiveTitle.classList.add('active');
}

function nextSlide() {
    activeIndex = (activeIndex + 1) % imageItems.length;
    showSlide(activeIndex);
}

showSlide(activeIndex);
setInterval(nextSlide, slideDuration);
const menu = document.querySelector('.menu');
const mobileNav = document.querySelector('.mobile-nav');
const mobileOverlay = document.querySelector('.mobile-overlay');

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const vidbox = document.querySelector('.vid-box');
const vidwrapper = document.querySelector('.vid-wrapper');
const thumbnails = document.querySelectorAll('.thumbnail');
let vidboxOpen = false;

const vids = ['/dist/vid/cav75.mp4', '/dist/vid/cavchevy.mp4', '/dist/vid/samed.mp4', '/dist/vid/sea.mp4'];
const videos = document.querySelectorAll('.video');

let openAjaxCalls = 0;

window.onload = function() {
    
    if (document.querySelector('.slideshow')) {
        for (let i = 0; i < vids.length; i++) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', vids[i], true);
            openAjaxCalls++;
            console.log('call is made');
            xhr.responseType = 'blob';
            console.log(openAjaxCalls);
            xhr.onload = function(e) {
                if (this.status == 200) {
                    console.log('i got the video');
                    let myBlob = this.response;
                    let vid = window.URL.createObjectURL(myBlob);
                    // let video = document.getElementById('video');
                    console.log('Loading video into element');
                    // video.src = vid;
                    console.log(videos[i]);
                    videos[i].src = vid;
                    openAjaxCalls--;
                    console.log(openAjaxCalls);
                    if(openAjaxCalls === 0) {
                        slideShow();
                    }
                }
            }
            xhr.onerror = function() {
            console.log('There was an error');
            }
            xhr.send();
        }   
    }

    if (document.querySelector('.menu')) {
        menu.onclick = () => {
            handleMenu();
        }
    }

    window.onresize = () => {
        if (window.innerWidth > 1024 && mobileNav && mobileNav.classList.contains('nav-open')) {
            menu.classList.remove('open');
            mobileNav.classList.remove('nav-open');
            mobileOverlay.classList.remove('overlay-open');
        }
    }

    if (document.querySelectorAll('.thumbnail')) {
        for (let i = 0; i < thumbnails.length; i++) {
            let thumbnail = thumbnails[i];
            thumbnail.onclick = () => {
                showVidbox(thumbnail);
            }
        }
    }

    if (document.querySelector('.vid-box')) {
        vidbox.onclick = () => {
            closeVidbox();
        }
    }

    if (document.querySelector('.mobileOverlay')) {
        mobileOverlay.onclick = () => {
            handleMenu();
        }
    }
}

function slideShow() {

    //Hide all slides
    for (let i = 0; i < slides.length; i++) {
        let slide = slides[i];
        slide.style.display = 'none';
    }

    currentSlide++;
    if (currentSlide > slides.length) {
        currentSlide = 1;
    }

    slides[currentSlide - 1].style.display = 'block';
    // slides[currentSlide - 1].style.animation = '0.7s fadeIn forwards ';

    if (slides[currentSlide - 1].classList.contains('picture')) {
        // setTimeout(function() {
        //     slides[currentSlide - 1].style.animation = '0.7s fadeOut forwards';
        // }, 2300);
        setTimeout(slideShow, 3000);
    }

    else if (slides[currentSlide - 1].classList.contains('video')) {
        let duration = Math.round(slides[currentSlide - 1].duration * 1000) / 1000;
        slides[currentSlide - 1].play();
        // setTimeout(function() {
        //     slides[currentSlide - 1].style.animation = '1s fadeOut forwards';
        // }, duration * 1000 - 1000);
        if (slides[currentSlide - 1].paused) {
            setTimeout(slideShow, 3000);
        }
        slides[currentSlide - 1].onended = function() {
            slideShow();
        }
    }
}

function showVidbox(thumbnail) {
    vidboxOpen = true;
    vidbox.classList.add('open-vid');
    vidwrapper.innerHTML += thumbnail.dataset.video;
    vidwrapper.children[1].src += '&autoplay=1';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function closeVidbox() {
    vidwrapper.removeChild(document.querySelector('iframe'));
    vidbox.classList.remove('open-vid');
    vidboxOpen = false;
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

function handleMenu() {
    (menu.classList.contains('open')) ? menu.classList.remove('open'): menu.classList.add('open');

    if (mobileNav.classList.contains('nav-open')) {
        mobileNav.classList.remove('nav-open');
        mobileOverlay.classList.remove('overlay-open');

        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }

    else {
        mobileNav.classList.add('nav-open');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        mobileOverlay.classList.add('overlay-open');
    }
}

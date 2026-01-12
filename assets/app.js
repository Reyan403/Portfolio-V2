/*
 * Welcome to your app's main JavaScript file!
 */
import './styles/app.css';

// MENU
const menuHamburger = document.getElementById('menu-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Quand je clique sur le menu hamburger, je veux que le menu mobile s'ouvre et que le menu hamburger se ferme et inversement
if (menuHamburger && mobileMenu) {
    menuHamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('invisible');
        
        // Animation du menu hamburger
        const spans = menuHamburger.querySelectorAll('span');
        if(spans.length === 2) {
             spans[0].classList.toggle('rotate-45');
             spans[0].classList.toggle('translate-y-[6px]');
             spans[1].classList.toggle('-rotate-45');
             spans[1].classList.toggle('-translate-y-[7px]');
        }
    });
}

// THEME
const btn = document.getElementById('button');
const btnMobile = document.getElementById('button-mobile');
const theme = document.getElementById('theme');
const header = document.querySelector('header');

function modeSombre() {
    document.body.classList.add('bg-black');
    document.body.classList.add('text-white');
    header.classList.remove('bg-white'); 
    header.classList.add('shadow-lg', 'shadow-white/50', 'bg-black'); 
    theme.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>';
    localStorage.setItem('theme', 'sombre');
    if (btnMobile) btnMobile.textContent = "Mode clair";
    
    // Mode sombre pour le menu mobile
    if (mobileMenu) {
        mobileMenu.classList.remove('bg-white/80');
        mobileMenu.classList.add('bg-black/80');
    }
    // Mode sombre pour le menu hamburger
    if (menuHamburger) {
        menuHamburger.querySelectorAll('span').forEach(span => {
            span.classList.remove('bg-black');
            span.classList.add('bg-white');
        });
    }
}

function modeClair() {
    document.body.classList.remove('bg-black');
    document.body.classList.remove('text-white');
    header.classList.remove('shadow-lg', 'shadow-white/50', 'bg-black'); 
    header.classList.add('bg-white'); 
    theme.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>';
    localStorage.setItem('theme', 'clair'); 
    if (btnMobile) btnMobile.textContent = "Mode sombre";

    // Mode clair pour le menu mobile
    if (mobileMenu) {
        mobileMenu.classList.add('bg-white/80');
        mobileMenu.classList.remove('bg-black/80');
    }
    // Mode clair pour le menu hamburger
    if (menuHamburger) {
        menuHamburger.querySelectorAll('span').forEach(span => {
            span.classList.add('bg-black');
            span.classList.remove('bg-white');
        });
    }
}

// THEME TOGGLE
function toggleTheme() {
    if (document.body.classList.contains('bg-black')) {
        modeClair();
    } else {
        modeSombre();
    }
}

if(btn) btn.addEventListener('click', toggleTheme);
if(btnMobile) btnMobile.addEventListener('click', toggleTheme);

if(localStorage.getItem('theme') === 'sombre') {
    modeSombre();
}


// Active Menu Link
const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuLinks.forEach(l => l.classList.remove('active-link'));
        this.classList.add('active-link');
    });
});


// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
});
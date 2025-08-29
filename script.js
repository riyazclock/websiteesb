// script.js
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > this.window.innerHeight/3) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Select all chef cards
document.addEventListener("DOMContentLoaded", function () {
    const chefCards = document.querySelectorAll('.chef_card');

    // Loop through each card and add click event
    chefCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped'); // Toggle flip on click
        });

        // Auto-flip every 1 minute
        setInterval(() => {
            card.classList.toggle("flipped");
        }, 10000); // 60,000ms = 1 minute
    });
});

//star
document.addEventListener('DOMContentLoaded', function() {
    const homeElement = document.querySelector(".home");
    let isHovering = false;

    const numSparks = 15; // Reduced for a more subtle effect
    const sparkColors = ["#FFD700", "#FFA500", "#FF6347", "#FFFFFF"]; // Refined color palette

    homeElement.addEventListener("mouseenter", function() {
        isHovering = true;
    });

    homeElement.addEventListener("mouseleave", function() {
        isHovering = false;
    });

    homeElement.addEventListener("mousemove", function(e) {
        if (isHovering) {
            for (let i = 0; i < numSparks; i++) {
                const spark = document.createElement("div");
                spark.classList.add("spark");

                const randomColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                spark.style.backgroundColor = randomColor;

                spark.style.left = `${e.pageX}px`;
                spark.style.top = `${e.pageY}px`;

                const angle = Math.random() * 360;
                const distance = Math.random() * 20 + 5; // Reduced distance for a more refined look

                const dx = Math.cos(angle * Math.PI / 180) * distance;
                const dy = Math.sin(angle * Math.PI / 180) * distance;

                spark.style.setProperty('--dx', `${dx}px`);
                spark.style.setProperty('--dy', `${dy}px`);

                document.body.appendChild(spark);

                spark.addEventListener('animationend', () => {
                    spark.remove();
                });
            }
        }
    });
});


//logo
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    logo.classList.add('clicked');

    setTimeout(() => {
        logo.classList.remove('clicked');
    }, 500); // Duration of the effect
});


// create effect fade
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Only triggers once
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
});


// Image switch logic
const image = document.getElementById("aboutImage");

const images = ["Assert/abtimg.png", "Assert/abtlogo.png"]; // Add your image paths
let index = 0;

setInterval(() => {
    index = (index + 1) % images.length;
    image.src = images[index];
}, 3000); // Change image every 3 seconds



function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
}

const title = document.querySelector('.title');
const tagElement = document.querySelector(".tag");

document.addEventListener('scroll', function() {
    let value = window.scrollY;
    const slow_up = value * 0.2;
    title.style.marginTop = -slow_up + 'px';
    if (window.scrollY > 0) {
        tagElement.style.display = "none";
    } else {
        tagElement.style.display = "block";
    }
});

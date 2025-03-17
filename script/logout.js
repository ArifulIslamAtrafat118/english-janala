document.getElementById("logout-btn").addEventListener('click',() =>{
    const nav = document.getElementById("nav-section");
    nav.classList.remove("flex");
    nav.classList.add("hidden");
    //show learn-section && faq-section && horijontal line
    const learnSection =document.querySelector("#learn-section");
    const faqSection = document.querySelector("#faq-section");
    const horijontalLine = document.querySelector("#hoirjontal-line");
    learnSection.classList.add("hidden");
    faqSection.classList.add("hidden");
    horijontalLine.classList.add("hidden");
    //hide the banner
    const banner = document.querySelector("#banner");
    banner.classList.add("md:flex");
    banner.classList.remove("hidden");
    //remove body background
    const body = document.getElementById("body");
    body.classList.add("bg-blue-50");
})
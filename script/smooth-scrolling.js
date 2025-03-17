
document.getElementById("logo").addEventListener('click', () => {
    document.querySelector("#body").scrollIntoView({behavior:"smooth"});
})
//Scroll after faq-button Click
document.getElementById('nav-faq-btn').addEventListener('click', () => {
    document.querySelector("#faq-section").scrollIntoView({behavior:"smooth"});
});
//Scroll after learn button click
document.querySelector("#nav-learn-btn").addEventListener('click', () => {
    document.querySelector("#learn-section").scrollIntoView({behavior:"smooth"});
});
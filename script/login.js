
document.getElementById("get-started-btn").addEventListener('click',() =>{

    const getUsername = document.getElementById('input-username')
    let username = getUsername.value;
    // console.log(username)
    const getPin = document.getElementById('input-pin');
    let pin = getPin.value;



    if(username.length<3 || username.length>30) {
        alert("Username Must be 3 to 30 characters containing only letters, numbers or dash");
        getUsername.value = "";
    }
    else if(pin!=123456) {
        alert(`Please! Input the pin 123456`);
        getPin.value = "";
    }
    else {
        //Action after successfully login
        if((username.length>=3 || username.length<=30) && pin == 123456) {
            //Clear the input field
            getUsername.value = "";
            getPin.value = "";
            //show nav-bar
            const nav = document.getElementById("nav-section");
            nav.classList.remove("md:hidden");
            nav.classList.add("md:flex");
            //show learn-section && faq-section && horijontal line
            const learnSection =document.querySelector("#learn-section");
            const faqSection = document.querySelector("#faq-section");
            const horijontalLine = document.querySelector("#hoirjontal-line");
            learnSection.classList.remove("hidden");
            faqSection.classList.remove("hidden");
            horijontalLine.classList.remove("hidden");
            //hide the banner
            const banner = document.querySelector("#banner");
            banner.classList.remove("md:flex");
            banner.classList.add("hidden");
            //remove body background
            const body = document.getElementById("body");
            body.classList.remove("bg-blue-50");
            //show the success alert
            alert("Login Request Successful");     

        }

    } //else end point



    

    
    

    

})

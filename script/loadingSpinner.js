window.onload = function () {
    let spinnerContainer = document.getElementById("spinner-container");
    if(!spinnerContainer){
        spinnerContainer = document.createElement("div");
        spinnerContainer.id = "spinner-container";
        spinnerContainer.innerHTML = `
        <div id="loading-spinner" class="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
        `;
        document.body.append(spinnerContainer);
    }
    setTimeout(() => {
        document.getElementById("loading-spinner").classList.add("hidden");
    }, 1000);
};


function showOverlaySpinner() {
    const wordCardContainer = document.querySelector("#word-card-container");
    wordCardContainer.innerHTML = "";
    let overlaySpinner = document.querySelector("#overlay-spinner");
    if(!overlaySpinner) {
        overlaySpinner = document.createElement("div");
        overlaySpinner.id = "overlay-spinner";
        overlaySpinner.classList.add("w-full", "h-full", "hidden");
        overlaySpinner.innerHTML = `
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-800"></div>
        `;
        // console.log("from loading spinner", wordCardContainer);
        wordCardContainer.append(overlaySpinner);
    }
    document.getElementById("overlay-spinner").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("overlay-spinner").classList.add("hidden");
    }, 1000);
}
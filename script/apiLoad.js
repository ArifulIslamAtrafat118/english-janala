const removeActiveClass = () => {
    const activeClassBtn = document.getElementsByClassName("active");
    for(btn of activeClassBtn) {
        btn.classList.remove("active");
    }
}
const loadAllLeavelsData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayButtonLeavels(data.data))
}

const displayButtonLeavels= (leavels) =>{
    for(let leavel of leavels) {
        const learnBtnContainer = document.querySelector("#learn-btn-container");
        const learnBtnDiv = document.createElement("div");
        learnBtnDiv.innerHTML = `
        <button onclick="loadWordByLeavel(${leavel.level_no})" id="lesson-${leavel.level_no}" 
            class="btn btn-outline btn-primary hidden md:flex">
                    <i class="fa-solid fa-book-open"></i>Lesson-${leavel.level_no}
                </button>`
        learnBtnContainer.append(learnBtnDiv);
    }
}
const loadWordByLeavel = (leavel) => {
    console.log(leavel);
    // let id= `${leavel.level_no}`;
    let url =`https://openapi.programming-hero.com/api/level/${leavel}`;
    fetch(url)
    .then((res) =>res.json())
    .then((data) => {
        removeActiveClass();
        const clickedBtn =document.getElementById(`lesson-${leavel}`);
        clickedBtn.classList.add("active");
        displayWord(data.data)})
}

const displayWord = (selectedWordByLevel) => {
    console.log(selectedWordByLevel);
    const wordCardContainerOuter = document.getElementById("word-card-container");
    wordCardContainerOuter.innerHTML = "";
    if(!selectedWordByLevel.length) {
        wordCardContainerOuter.innerHTML =`
        <div  class="rounded-2xl bg-blue-50 py-16 flex flex-col items-center justify-center gap-4">
                    <img src="assets/alert-error.png" alt="" class="">
                    <p class="text-sm text-gray-500 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="text-2xl font-[500]">নেক্সট Lesson এ যান</h2>
                </div>`
    }
    else {
        wordCardContainerOuter.innerHTML =`<div id="word-card-container-inner" class="p-5 rounded-2xl grid grid-cols-3 gap-6 bg-blue-50 max-h-[35rem] overflow-y-scroll">        
            </div>
            `
            const wordCardContainerInner = document.getElementById("word-card-container-inner");
            wordCardContainerInner.innerHTML = "";
            selectedWordByLevel.forEach(wordDetailes => {
                const wordCard = document.createElement("div");
                wordCard.innerHTML = `<div id="word-card" class="px-12 rounded-xl py-12 space-y-10  bg-white">
                                <div class="space-y-3">
                                    <h2 class="text-2xl text-center font-bold ">${wordDetailes.word} </h2>
                                    <p class="text-sm text-center">Meaning /Pronounciation</p>
                                    <h2 class="text-2xl text-center text-gray-600 font-bold ">"${wordDetailes.meaning} / ${wordDetailes.pronunciation}"</h2>
                                </div>
                                <div class="flex justify-between items-center">
                                    <i class="fa-solid fa-circle-info text-2xl"></i>
                                    <i class="fa-solid fa-volume-high text-2xl"></i>
                                </div>
                            </div>
                            `
                wordCardContainerInner.append(wordCard);
            });
        
    }   
}
loadAllLeavelsData();


/**
 * 
 */
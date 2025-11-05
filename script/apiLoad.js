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
        <button onclick="loadWordByLeavel(${leavel.level_no}), showOverlaySpinner()" id="lesson-${leavel.level_no}" 
            class="btn btn-outline btn-primary flex">
                    <i class="fa-solid fa-book-open"></i>Lesson-${leavel.level_no}
                </button>`
        learnBtnContainer.append(learnBtnDiv);
    }
}
const loadWordByLeavel = (leavel) => {
    // console.log(leavel);
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

const displayWord =async (selectedWordByLevel) => {
    // console.log("hello",selectedWordByLevel);
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
        wordCardContainerOuter.innerHTML =`<div id="word-card-container-inner" class="p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-50 max-h-[35rem] overflow-y-scroll items-stretch">        
            </div>`;
        const wordCardContainerInner = document.getElementById("word-card-container-inner");
        wordCardContainerInner.innerHTML = "";


        selectedWordByLevel.forEach(wordDataUnderSelectedLebel => {
            const url = `https://openapi.programming-hero.com/api/word/${wordDataUnderSelectedLebel.id}`;
            fetch(url).then((res) =>res.json())
            .then((data) =>{wordDetails = data.data
                // console.log(JSON.stringify(wordDetails));
                let meaning = wordDataUnderSelectedLebel.meaning || "পাওয়া যায় নি";
                let pronunciation = wordDataUnderSelectedLebel.pronunciation || "(পাওয়া যায় নি)";

                const wordCard = document.createElement("div");
                wordCard.innerHTML = `<div id="word-card" class="px-12 rounded-xl py-12 space-y-10  bg-white h-full">
                                <div class="flex flex-col items-center justify-between h-4/5">
                                    <h2 class="text-2xl text-center font-bold ">${wordDataUnderSelectedLebel.word} </h2>
                                    <p class="text-sm text-center">Meaning / Pronounciation</p>
                                    <h2 class="text-2xl text-center text-gray-600 font-bold ">"${meaning} / ${pronunciation}"</h2>
                                </div>
                                <div class="flex justify-between items-center">
                                    <i class="fa-solid fa-circle-info text-2xl cursor-pointer"
                                        onclick='showWordDetails(${JSON.stringify(wordDetails)})'></i>
                                    <i class="fa-solid fa-volume-high text-2xl cursor-pointer"></i>
                                </div>
                            </div>
                            `
                wordCardContainerInner.append(wordCard);
            })          //end point of the .then
        });        
    }   
}

const showWordDetails = (wordDetails) => {
    // const url = `https://openapi.programming-hero.com/api/word/${id}`;
    // const res = await fetch(url);
    // const data = await res.json();
    // wordDetails = data.data;
    // console.log(wordDetails);
    /**
     * {
    "word": "Linger",
    "meaning": "থেমে থাকা / বিলম্ব করা",
    "pronunciation": "লিঙ্গার",
    "level": 2,
    "sentence": "She lingered at the door, unwilling to leave.",
    "points": 2,
    "partsOfSpeech": "verb",
    "synonyms": [
        "stay",
        "remain",
        "delay"
    ],
    "id": 12
}
     */

    let modal = document.getElementById("wordDetailsModal");
    if(!modal) {
        modal = document.createElement("dialog");
        modal.id = "wordDetailsModal";
        modal.classList.add("modal");
        document.body.append(modal);
    }
    
    let sentence = wordDetails.sentence || "পাওয়া যায় নি";
    let meaning = wordDetails.meaning || "পাওয়া যায় নি";
    let pronunciation = wordDetails.pronunciation || "পাওয়া যায় নি";
    
    let modalInnerHtml = `
        <div class="modal-box space-y-2">
          <h3 class="text-2xl font-bold ">${wordDetails.word} => ${pronunciation}</h3>
          <h4 class="text-xl font-semibold">Meaning</h4>
          <h4 class="text-xl font-[500]">${meaning}</h4> <br/>
          <h4 class="text-xl font-semibold">Example</h4>
          <p class="text-xl">${sentence}</p>
          <h4 class="text-xl font-semibold">সমার্থক শব্দ গুলো</h4>
          <div id="synonym-container" class="flex items-center justify-start gap-2">
            
          </div>
          <div class="modal-action text-start">
            <form method="dialog">
              <button onclick="closeModal()" 
              class="btn bg-cyan-400 hover:bg-cyan-600 hover:scale-105 hover:-rotate-6 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 ease-in-out">Complete Learning</button>
            </form>
          </div>
        </div>
    `;
    modal.innerHTML = "";
    modal.insertAdjacentHTML("beforeend", modalInnerHtml);
        
    modal.showModal();

    setTimeout( () => {
        let synonymContainer = document.getElementById("synonym-container");
        if (!synonymContainer) {
            console.error(" synonym-container not found!");
            return;
        }else{
            console.log("Line number 145",synonymContainer);
        }
        synonymContainer.innerHTML = "";
        if(wordDetails.synonyms.length===0) {
            const synonym = document.createElement("div");
            synonym.classList.add("rounded-lg", "px-2", "py-1", "lg:py-2", "text-lg", "bg-cyan-50");
            synonym.innerHTML = `<p class="">পাওয়া যায় নি</p>`;
            synonymContainer.appendChild(synonym);
        }
        else {
            for(syno of wordDetails.synonyms) {
                console.log(syno);
                let synonym = document.createElement("div");
                synonym.classList.add("rounded-lg", "px-2", "py-1", "lg:py-2", "text-lg", "bg-cyan-50");
                synonym.innerHTML = `<p class="">${syno}</p>`;
                synonymContainer.append(synonym);
            }
        }
    },500);
    
}

const closeModal = () => {
    const modal = document.getElementById("wordDetailsModal");
    if(modal){
        modal.close();
    }
}

loadAllLeavelsData();


/**
 * 
 */
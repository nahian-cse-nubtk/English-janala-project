
const loadLesson = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(response=>response.json())
    .then(data=> displayButton(data.data))

}

const displayButton = (lessons)=>{
    const lessonLevel = document.getElementById("lessons-level");
    lessonLevel.innerHTML = "";
    lessons.forEach(lesson=>{
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><img src="assets/fa-book-open.png" alt="" srcset=""> Lesson - ${lesson.level_no}</button>`

        lessonLevel.appendChild(btnDiv);
    })
}

const loadLevelWord= (level)=>{
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then(response=> response.json())
    .then((data)=>{
        if(data.data.length === 0){
            noLessonNow(false);
            removeNoSelection(true);

        }
        else {
                // Lessons available
                noLessonNow(true);  // hide "no lesson" message
                displayCard(data.data);
            }
    })
}

const displayCard = fullData =>{
    removeNoSelection(true);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    fullData.forEach(singleData=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-border bg-white shadow-xl w-96 text-center">
        <div class="card-body">
        <h2 class="text-center text-2xl font-bold">${singleData.word}</h2>
        <p>Meaning /Pronounciation</p>
        <h2 class="text-center text-2xl font-semibold">${singleData.meaning?singleData.meaning:"অর্থ পাওয়া যায়নি"}/${singleData.pronunciation}</h2>

        <div class="flex justify-between items-center mt-4">
            <button onclick ="showDetails(${singleData.id})" class="bg-gray-200 w-10 h-10 hover:bg-gray-300"><i class="fa-solid fa-circle-info   "></i></button>
            <button onclick ="loudWord(${singleData.id})"class="bg-gray-200 w-10 h-10 hover:bg-gray-300"><i class="fa-solid fa-volume-low"></i></button>
            </div>
            </div>
            </div>
        `
        wordContainer.appendChild(div);
    })
}

const showDetails = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(response=> response.json())
    .then(data=>displayDetails(data.data))
}

const displayDetails = (detail) =>{
    const wordDetails = document.getElementById('details-of-word');
    wordDetails.innerHTML = "";
    const div = document.createElement('div');

    div.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box py-2">
    <h1 class="text-lg font-bold">${detail.word} (<i class="fa-solid fa-microphone-lines"></i> : ${detail.pronunciation})</h1>
    <h2 class="text-lg font-bold">Meaning</h2>
    <h3 class="text-lg font-bold">${detail.meaning?detail.meaning:"অর্থ পাওয়া যায়নি"}</h3>
    <h2 class="text-lg font-bold">Example</h2>
    <p>${detail.sentence}</p>
    <p class="py-4">সমার্থক শব্দ গুলো</p>
    <div class="flex gap-1">
    ${(detail.synonyms?.length
    ? detail.synonyms.map(synonym => `<button class="btn">${synonym || "সমার্থক শব্দ পাওয়া যায়নি"}</button>`).join('')
    : "<button class='btn'>সমার্থক শব্দ পাওয়া যায়নি</button>"
        )}
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `
    wordDetails.appendChild(div);
    my_modal_5.showModal()
}

const loudWord =(id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(response=> response.json())
    .then(data=>pronounceWord(data.data.word))
}
  function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const removeNoSelection = (value)=>{
    const noSelection = document.getElementById('no-selection');
    if(value === true){
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = "";
        noSelection.classList.add('hidden');
    }
}
const noLessonNow = (val) => {
    const noLesson = document.getElementById('no-lesson');
    if (val === false) {
        // API says "no data" -> show the message
        noLesson.classList.remove('hidden');
    }
    else {
        // API says "has data" -> hide the message
        noLesson.classList.add('hidden');
    }
};

loadLesson();

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
            <button onclick ="showDetails(${singleData.id})" class ="bg-gray-200 w-10 h-10"><i class="fa-solid fa-circle-info   "></i></button>
            <button class ="bg-gray-200 w-10 h-10"><i class="fa-solid fa-volume-low"></i></button>
            </div>
            </div>
            </div>
        `
        wordContainer.appendChild(div);
    })
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
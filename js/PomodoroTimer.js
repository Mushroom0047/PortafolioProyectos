// Pomodoro timer
const btnStartPom = document.querySelector('.btn-startPom');
const btnStopPom = document.querySelector('.btn-stopPom');
const btnTakeBreak = document.querySelector('.btn-breakPom');
//task
let taskLabel = document.querySelector('.taskPom');
const taskInput = document.querySelector('.inputTaskPom');
const btnEnterTask = document.querySelector('.btn-taskPom');
const audioPom = document.querySelector('.ringBell');
let bgDivPom = document.querySelector('.pom-div');
let cyclePom = document.querySelector('.cyclePom');
let bgDivTask = document.querySelector('.taskBG');

//Enter a task
btnEnterTask.addEventListener('click', () => {
    addTask();
});
taskInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        addTask();
    }
});

//Add task
function addTask() {
    let task = taskInput.value;
    taskLabel.innerHTML = task;
    document.querySelector('.inputTaskPom').value = '';
}

let cycleValue = 0;
let timePom = 0.1 * 60;//1500 seg
let timeShortBreak = 0.1 * 60;
let timeLongBreak = 0.2 * 60;
const countDownEl = document.querySelector('.timer');
const countDownBreakEl = document.querySelector('.breakTimer');
let pomIsPlaying = false;
let intervalID;

//Start countdown
btnStartPom.addEventListener('click', () => {
    if (pomIsPlaying) {//Pause
        clearInterval(intervalID);
        btnStartPom.innerHTML = "Comenzar";
        document.querySelector('.btn-stopPom').disabled = true;
        pomIsPlaying = false;
    } else {// Play
        pomStyle("pom");
        intervalID = setInterval(updateCountDown, 1000);
        btnStartPom.innerHTML = "Pausar";
        document.querySelector('.btn-stopPom').disabled = false;
        pomIsPlaying = true;
    }
});


// Take a break
btnTakeBreak.addEventListener('click', () => {
    stopTimer();
    pomStyle("break");
    //check time   
});
function checkBreakTime(){
    if(cyclePom){

    }
}

// Stop timer
btnStopPom.addEventListener('click', () => {
    stopTimer();
    audioPom.play();
});
function stopTimer() {
    clearInterval(intervalID);
    timePom = 0.1 * 60;
    btnStopPom.disabled = true;
    btnStartPom.innerHTML = "Comenzar";
    btnTakeBreak.innerHTML = "Descansar";
    countDownEl.innerHTML = '00:00';
}

// Update pom
function updateCountDown() {
    if (timePom >= 0) {
        const minutes = Math.floor(timePom / 60);
        let seconds = timePom % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countDownEl.innerHTML = minutes + ":" + seconds;
        timePom--;
    } else {
        pomcomplete();
        stopTimer();
    }
}

// Reset cycle conter
const resetCounter = document.querySelector('.fa-sync-alt');
resetCounter.addEventListener('click', () => {
    cycleValue = 0;
    cyclePom.innerHTML = cycleValue;
});
//If time is equal than zero
function pomcomplete() {
    audioPom.play();
    cycleValue++;
    cyclePom.innerHTML = cycleValue;
}
//Pom style
function pomStyle(type){
    if(type === "pom"){
        bgDivPom.classList.add('bg-danger');
        bgDivPom.classList.remove('bg-success');
        bgDivTask.classList.add('task-div-red');
        bgDivTask.classList.remove('task-div-green');
    }else if (type === "break"){
        bgDivPom.classList.remove('bg-danger');
        bgDivPom.classList.add('bg-success');
        bgDivTask.classList.remove('task-div-red');
        bgDivTask.classList.add('task-div-green');
    }
}


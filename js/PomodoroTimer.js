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

let startMinute = 0.1;
let cycleValue = 0;
let breakTime = 0.1*60;
let time = startMinute * 60;//1500 seg
const countDownEl = document.querySelector('.timer');
const countDownBreakEl = document.querySelector('.breakTimer');
let pomIsPlaying = false;
let breakIsPlaying = false;
let intervalID;

//Start countdown
btnStartPom.addEventListener('click', () => {
    if (pomIsPlaying) {
        clearInterval(intervalID);
        btnStartPom.innerHTML = "Comenzar";
        document.querySelector('.btn-stopPom').disabled = true;
        pomIsPlaying = false;
    } else {
        bgDivPom.classList.add('bg-danger');
        bgDivPom.classList.remove('bg-success');
        bgDivTask.classList.add('task-div-red');
        bgDivTask.classList.remove('task-div-green');
        intervalID = setInterval(updateCountDown, 1000);
        btnStartPom.innerHTML = "Pausar";
        document.querySelector('.btn-stopPom').disabled = false;
        pomIsPlaying = true;
    }
});

// Stop timer
btnStopPom.addEventListener('click', () => {
    stopTimer();
    audioPom.play();
});
function stopTimer() {
    clearInterval(intervalID);
    time = 0.1 * 60;
    btnStopPom.disabled = true;
    btnStartPom.innerHTML = "Comenzar";
    countDownEl.innerHTML = '00:00';
}

//If time is equal than zero
function pomcomplete() {
    audioPom.play();
    cycleValue++;
    cyclePom.innerHTML = cycleValue;
}

// Update pom
function updateCountDown() {
    if (time >= 0) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        countDownEl.innerHTML = minutes + ":" + seconds;
        time--;
    } else {
        pomcomplete();
        stopTimer();
    }
}
// Update break
function updateBreakCountDown() {
    if (breakTime >= 0) {
        const minutes = Math.floor(breakTime / 60);
        let seconds = breakTime % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        countDownBreakEl.innerHTML = minutes + ":" + seconds;
        breakTime--;
    } else {
        stopTimer();
    }
}
// Reset cycle conter
const resetCounter = document.querySelector('.fa-sync-alt');
resetCounter.addEventListener('click', () => {
    cycleValue = 0;
    cyclePom.innerHTML = cycleValue;
});

// Take a break
btnTakeBreak.addEventListener('click', () => {
    stopTimer();
    bgDivPom.classList.remove('bg-danger');
    bgDivPom.classList.add('bg-success');
    bgDivTask.classList.remove('task-div-red');
    bgDivTask.classList.add('task-div-green');
    if(breakIsPlaying){

    }else{
        intervalID = setInterval(updateBreakCountDown, 1000);
        document.querySelector('.btn-stopPom').disabled = false;
        btnTakeBreak.innerHTML = "Pausar"
        breakIsPlaying = true;
    }
});
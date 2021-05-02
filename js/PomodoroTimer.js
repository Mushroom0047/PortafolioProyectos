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
// Use Variables
let cycleValue = 0;
let timePom = 25* 60;
let timeShortBreak = 5 * 60;
let timeLongBreak = 15 * 60;
let timeBreakUse = timeShortBreak;
const countDownEl = document.querySelector('.timer');
const countDownBreakEl = document.querySelector('.breakTimer');
let pomIsPlaying = false;
let intervalID;

//Enter a task button
btnEnterTask.addEventListener('click', () => {
    addTask();
});
taskInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        addTask();
    }
});

//Start countdown button
btnStartPom.addEventListener('click', () => {
    if (pomIsPlaying) {//Pause
        clearInterval(intervalID);
        btnStartPom.innerHTML = "Comenzar";
        document.querySelector('.btn-stopPom').disabled = true;
        pomIsPlaying = false;
    } else {// Play
        pomStyle("pom");
        stopBreak();
        intervalID = setInterval(updateCountDown, 1000);
        btnStartPom.innerHTML = "Pausar";
        document.querySelector('.btn-stopPom').disabled = false;
        pomIsPlaying = true;
    }
});


// Take a break button
btnTakeBreak.addEventListener('click', () => {
    stopTimer();
    pomStyle("break");
    checkBreakTime(); 
    intervalID = setInterval(updateBreakCountDown, 1000);
    btnTakeBreak.disabled = true;
    btnStopPom.disabled = false;
});

// Stop timer
btnStopPom.addEventListener('click', () => {
    if(pomIsPlaying){
        stopTimer();
        audioPom.play();
    }else{
        stopBreak();
    }
    
});

//----------------------------FUNCTIONS-----------------------------

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
function updateBreakCountDown(){
    if (timeBreakUse >= 0) {
        const minutes = Math.floor(timeBreakUse / 60);
        let seconds = timeBreakUse % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        countDownBreakEl.innerHTML = minutes + ":" + seconds;
        timeBreakUse--;
    } else {        
        stopBreak();
    }
}
function stopBreak(){    
    audioPom.play();
    btnTakeBreak.disabled = false;
    btnStopPom.disabled = true;
    timeBreakUse = timeShortBreak;
    countDownBreakEl.innerHTML = '05:00';
    clearInterval(intervalID);
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
// Stop pom function
function stopTimer() {
    clearInterval(intervalID);
    timePom = 25 * 60;
    btnStopPom.disabled = true;
    btnStartPom.innerHTML = "Comenzar";
    btnTakeBreak.innerHTML = "Descansar";
    countDownEl.innerHTML = '25:00';
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
function checkBreakTime(){
    if(cycleValue % 3 == 0 && cycleValue != 0 ){        
        timeBreakUse = timeLongBreak;
    }else{
        timeBreakUse = timeShortBreak;
    }
}
//Add task
function addTask() {
    let task = taskInput.value;
    taskLabel.innerHTML = task;
    document.querySelector('.inputTaskPom').value = '';
}


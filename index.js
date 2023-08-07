
// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')


const alarmList = [];  // Stores all the alarms being set 
// let count =1;


// Plays the alarm audio at correct time
function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`)
}


// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = appendZero(today.getHours());
    const minutes = appendZero(today.getMinutes());
    const seconds = appendZero(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    document.getElementById('clock').innerText=`${hour}:${minutes}:${seconds}`;
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var curWeekDay = days[today.getDay()];
    var curDay = today.getDate();
    var curMonth = months[today.getMonth()];
    var curYear = today.getFullYear();
    var date = curWeekDay+", "+curDay+" "+curMonth+" "+curYear;
    document.getElementById("date").innerHTML = date;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


// set the correct format of time
// converts "1:2:3" to "01:02:03"
const appendZero = (value) => (value < 10 ? "0" + value : value);



// function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


// Adds newAlarm to the unordered list as a new list item on webpage
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


// event to set a new alarm whenever the form is submitted 
addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=appendZero(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=appendZero(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=appendZero(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

//     add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})


// calls updateTime() every second
setInterval(updateTime, 1000);

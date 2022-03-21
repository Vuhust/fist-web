let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventView = document.querySelector('.eventModal');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const add = document.querySelector('.check');

add.addEventListener('click', (e)=>{
  const eventForDay = new Array;
  for(let i =0; i <events.length ; i++){
    if( events[i].date == clicked){
      eventForDay.push(events[i]);
    }
  };

    const start = document.querySelector('.start');
    const end   = document.querySelector('.end');
    const title =document.querySelector('.text');
    let check = 1;
    for(let i = 0; i<eventForDay.length; i++){
      const u = eventForDay[i].startTime;
      const v = eventForDay[i].endTime;
      if(canAdd(start.value, end.value ,u , v  ) == false){
        check = 0;
        break;
      }
  
    }

    if(checktime(start.value , end.value ) ||  start.value == "" ||  end.value == ""){
      window.alert('Please check  the time you entered ');
    } else if( title.value == ""){
      window.alert('Input your event');
    } else if(check == 0){
      window.alert('Your event is overlap');
      } else {
      events.push(
        {
          date : clicked,
          startTime :start.value,
          endTime : end.value,
          data : title.value,
        }
      );
      eventForDay.push({
        date : clicked,
        startTime : start.value,
        endTime : end.value,
        data : title.value, 
      });

    localStorage.setItem('events', JSON.stringify(events));
    showEvent(eventForDay); 
        }

});


function showEvent(){
  const eventForDay = new Array;
  for(let i =0; i <events.length ; i++){
    if( events[i].date == clicked){
      eventForDay.push(events[i]);
    }
  };


  const dellView = document.querySelectorAll('.view');
  if( dellView.length != 0){
    dellView[0].remove();
  }
  const view = document.createElement('div');
  view.classList.add('view');
  eventView.appendChild(view);
  Sort(eventForDay);



  for(let i = 0; i< eventForDay.length ; i++){
    const myEvent = document.createElement('div');
    myEvent.classList.add('list'); 
    view.appendChild(myEvent);
    const startTime = document.createElement('div');
    startTime.classList.add('startTime');
    startTime.innerHTML =eventForDay[i].startTime;
    myEvent.appendChild(startTime);

    const to = document.createElement('div');
    to.classList.add('to');
    to.innerHTML='&#8594;';
    myEvent.appendChild(to);

    const endTime = document.createElement('div');
    endTime.classList.add('endTime');
    endTime.innerHTML =eventForDay[i].endTime;
    myEvent.appendChild(endTime);


    const data = document.createElement('div');
    data.classList.add('yourEvent');
    data.innerHTML =eventForDay[i].data;
    myEvent.appendChild(data);

    const dell = document.createElement('div');
    dell.classList.add('dell');
    dell.innerHTML= 'Dell';
    myEvent.appendChild(dell);
    dell.addEventListener('click', (e)=>{
      events = events.filter(e => ((e.startTime != eventForDay[i].startTime && e.date == clicked))  || e.date != clicked);
      for(let j = i; j<eventForDay.length-1 ; j++){
        eventForDay[j]=eventForDay[j+1];
        eventForDay.pop();
        }


      myEvent.remove();
      localStorage.setItem('events', JSON.stringify(events));
    });
  }
}



function openModal(date) {
  clicked = date;
  const eventForDay = new Array;
  for(let i =0; i <events.length ; i++){
    if( events[i].date == date){
      eventForDay.push(events[i]);
    }
  }

  showEvent();
  eventView.style.display = 'block';
  backDrop.style.display = 'block';
  backDrop.addEventListener('click', (e)=>{
	  backDrop.style.display = 'none';
    eventView.style.display = 'none';
    for(let i= 0; i<eventForDay.length ; i++){
      eventForDay.pop();
        }
    load();

  });





}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const dayInlastMouth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';
  var k;
  if( (paddingDays + daysInMonth) % 7 ==0){
    k =paddingDays +daysInMonth;
  }
  else{
    k =paddingDays +daysInMonth- (paddingDays + daysInMonth) % 7 +7;

  }



  for(let i = 1; i <= k ; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    // daySquare.style.boxShadow = "0px 0px 7px rgb(124,252,0)";

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    if( i- paddingDays <= 0){
      daySquare.innerText= dayInlastMouth + i - paddingDays;  
      // daySquare.id='anotherMouth';

      daySquare.addEventListener('click', ()=>{
        nav--;
        load();
      } )
    }

    if (i-paddingDays > 0 & i <= paddingDays +daysInMonth) {
      daySquare.innerText = i - paddingDays;
      eventForDay = events.find(e => e.date === dayString);
      if(eventForDay) {
        let numberOfEvent =0;
        for(let i =0; i <events.length ; i++){
          if( events[i].date == dayString){
            numberOfEvent++;
          }
        };
        
        daySquare.style.boxShadow = "0px 0px 10px rgb(124,252,0)";
        daySquare.style.color = " rgb(124,252,0)";
        daySquare.innerText= daySquare.innerText +"\n\n" +numberOfEvent+ " Metting";
      }
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }
      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }
    if( i > daysInMonth + paddingDays){
      daySquare.innerText= i - daysInMonth -paddingDays;
      daySquare.addEventListener('click', ()=>{
        nav++;
        load();
      } )
    }
     calendar.appendChild(daySquare);    
 }

}


function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

 
}

initButtons();
load();



function checktime(a, b){
  if (a.split(":")[0]*1 > b.split(":")[0]*1 ) return true;
  else if(a.split(":")[0]*1 < b.split(":")[0]*1)  return false;
  else if(a.split(":")[1]*1 >= b.split(":")[1]*1) return true;
  return false
}

var timeStart = ['10:10', '09:00'];
var timeEnd = ['10:20', '09:10'];

function canAdd(start, end, timeStart, timeEnd){
      if(checktime(start, timeStart) == true){
          if(checktime(start, timeEnd) == false) 
          return false;

      } else{
          if(checktime(timeStart, end)== false) 
           return false;

      }
  return true;
}

function Sort( eventForDay){
  for(let i= 0; i< eventForDay.length; i++){
    for(let j = i; j<eventForDay.length; j++){
      if(checktime(eventForDay[j].startTime, eventForDay[i].startTime) == false ){
      const temp = eventForDay[i];
      eventForDay[i]= eventForDay[j];
      eventForDay[j] =temp;
    }}

  }
}
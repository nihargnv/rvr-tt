const weeks = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const TimingsTable = {
  "1-8": "222",
  "1-9": "223",
  "1-10": "225",
  "1-11": "l",
  "1-12": "262",
  "1-13": "262",
  "1-14": "262",
  "2-8": "221",
  "2-9": "224",
  "2-10": "mc4",
  "2-11": "l",
  "2-12": "261",
  "2-13": "261",
  "2-14": "261",
  "3-8": "263",
  "3-9": "263",
  "3-10": "263",
  "3-11": "l",
  "3-12": "224",
  "3-13": "223",
  "3-14": "222",
  "4-8": "sl-2",
  "4-9": "sl-2",
  "4-10": "222",
  "4-11": "l",
  "4-12": "221",
  "4-13": "225",
  "4-14": "lib",
  "5-8": "223",
  "5-9": "221",
  "5-10": "224",
  "5-11": "l",
  "5-12": "sl-2",
  "5-13": "225",
  "5-14": "222",
  "6-8": "222",
  "6-9": "224",
  "6-10": "225",
  "6-11": "l",
  "6-12": "221",
  "6-13": "224",
  "6-14": "sp",
};

const subNames = {
  "221": "Computational Statistics ",
  "222": "Artificial Intelligence ",
  "223": "Operating systems ",
  "224": "Software Engineering ",
  "225": "DAA",
  "261": "Computational Stat. Lab",
  "262": "AI Lab",
  "263": "DAA Lab",
  "l": "Lunch",
  "sl-2": "Server-side Scripting",
  "mc4": "Srofessional Ethics & Human values ",
  "lib": "Library and Sports",
  "sp": "Sports",
};

function updateTime() {
  const date = new Date();

  // Determine the current hour and highlight the corresponding cell
  let toDay = date.getDay();
  let currentHour = date.getHours();
  var timeTxt, timeKey, subKey, pTxt, nTxt, fTxt;

  const prev = document.getElementById("prev");
  const prevTxt = document.getElementById("prev-txt");

  const pres = document.getElementById("pres");
  const presTxt = document.getElementById("pres-txt");

  const futr = document.getElementById("futr");
  const futrTxt = document.getElementById("futr-txt");

  const timeBar = document.getElementById("time-stat");

  if (currentHour > 12) {
    timeTxt = `${date.getDate()}-${date.getMonth() + 1}-${
      date.getFullYear() % 100
    }, ${weeks[toDay]} ${currentHour-12}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} PM`;
  } else {
    timeTxt = `${date.getDate()}-${date.getMonth() + 1}-${
      date.getFullYear() % 100
    }, ${weeks[toDay]} ${currentHour}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} AM`;
  }

  timeBar.innerText = timeTxt;


  if (toDay == 0) {
    prev.classList.add("disp-none");
    futr.classList.add("disp-none");
    presTxt.innerText = "It's Funday!";
  }
  else {
    if (date.getHours() > 7 && date.getHours() < 15) {
      timeKey = `${toDay}-${currentHour}`;
      subKey = TimingsTable[timeKey];
      nTxt = `CM${TimingsTable[timeKey].toUpperCase()}-${subNames[subKey]}`;
      if(currentHour == 11){
        nTxt = `${subNames[subKey]}`;
        pTxt = `CM${TimingsTable[`${toDay}-${currentHour-1}`]}-${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
        
        fTxt = `CM${TimingsTable[`${toDay}-${currentHour+1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
      }
      else if(currentHour == 8){
        prev.classList.add('disp-none');
        if(currentHour+1 == 11){
          fTxt = `${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
        }
        else{
        fTxt = `CM${TimingsTable[`${toDay}-${currentHour+1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
        }
      }
      else if(currentHour == 14){
        futr.classList.add('disp-none');
        if(currentHour-1 == 11){
          pTxt = `${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
        }
        else{
        pTxt = `CM${TimingsTable[`${toDay}-${currentHour-1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
        }
      }
      else{
        if(currentHour+1 == 11){
          fTxt = `${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
          pTxt = `CM${TimingsTable[`${toDay}-${currentHour-1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
        }
        else if(currentHour-1 == 11){
          pTxt = `${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
          fTxt = `CM${TimingsTable[`${toDay}-${currentHour+1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
        }
        else{
        pTxt = `CM${TimingsTable[`${toDay}-${currentHour-1}`]}-${subNames[TimingsTable[`${toDay}-${currentHour-1}`]]}`;
        
        fTxt = `CM${TimingsTable[`${toDay}-${currentHour+1}`].toUpperCase()}-${subNames[TimingsTable[`${toDay}-${currentHour+1}`]]}`;
        }
      }
      
      prevTxt.innerText = pTxt;
      presTxt.innerText = nTxt;
      futrTxt.innerText = fTxt;
    }
    else{
      prev.classList.add('disp-none');
      futr.classList.add('disp-none');
      presTxt.innerText = "No Classes Scheduled!";
    }
  }
  
}

// Update time and highlight every minute
updateTime();
setInterval(updateTime, 10000);

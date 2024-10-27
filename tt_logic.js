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
  "1-8": "214",
  "1-9": "214",
  "1-10": "212",
  "1-11": "l",
  "1-12": "211",
  "1-13": "213",
  "1-14": "sl-1",
  "2-8": "251",
  "2-9": "251",
  "2-10": "251",
  "2-11": "l",
  "2-12": "215",
  "2-13": "215",
  "2-14": "213",
  "3-8": "213",
  "3-9": "211",
  "3-10": "mc3",
  "3-11": "l",
  "3-12": "215",
  "3-13": "215",
  "3-14": "lib",
  "4-8": "212",
  "4-9": "mc3",
  "4-10": "214",
  "4-11": "l",
  "4-12": "sl-1",
  "4-13": "sl-1",
  "4-14": "211",
  "5-8": "252",
  "5-9": "252",
  "5-10": "252",
  "5-11": "l",
  "5-12": "212",
  "5-13": "sl-1",
  "5-14": "213",
  "6-8": "253",
  "6-9": "253",
  "6-10": "253",
  "6-11": "l",
  "6-12": "211",
  "6-13": "214",
  "6-14": "212",
};

const subNames = {
  "211": "Probability and Statistics",
  "212": "Discrete Mathematics",
  "213": "Computer Organisation",
  "214": "DBMS",
  "215": "OOPS",
  "251": "Prob. and Stat Lab",
  "252": "DBMS Lab",
  "253": "OOPS Lab",
  "l": "Lunch",
  "sl-1": "Web Development",
  "mc3": "DTPI",
  "lib": "Library and Sports"
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

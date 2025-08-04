const weeks = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

// Timetable for CM-3A (A-section)
const TimingsTable = {
  "1-10": "CM314",
  "1-11": "LIB",
  "1-12": "CM313",
  "1-13": "CM311",
  "1-14": "LIB",
  "1-15": "SPORTS",

  "2-10": "CM313",
  "2-11": "CM311",
  "2-12": "CM312",
  "2-13": "CM352",
  "2-14": "CM352",
  "2-15": "CM352",

  "3-10": "CM314",
  "3-11": "CM313",
  "3-12": "CM315",
  "3-13": "CM351",
  "3-14": "CM351",
  "3-15": "CM351",

  "4-10": "CM312",
  "4-11": "CM311",
  "4-12": "CM314",
  "4-13": "CM353",
  "4-14": "CM353",
  "4-15": "CM353",

  "5-10": "CM315",
  "5-11": "CM312",
  "5-12": "CM311",
  "5-13": "CM314",
  "5-14": "LIB",
  "5-15": "SPORTS",

  "6-10": "CM312",
  "6-11": "CM313",
  "6-12": "CM315",
  "6-13": "CMSL3",
  "6-14": "CMSL3",
  "6-15": "CMSL3"
};

const subNames = {
  "CM311": "Automata Theory & Formal Languages",
  "CM312": "Computer Networks",
  "CM313": "Data & Visual Analytics in AI",
  "CM314": "Cloud Computing (PE - I)",
  "CM315": "Internet of Things (OE - I)",

  "CM351": "Data & Visual Analytics in AI Lab",
  "CM352": "Cloud Computing Lab",
  "CM353": "Summer Internship",
  "CMSL3": "Soft Skills (SOC - III)",

  "LIB": "Library",
  "SPORTS": "Sports",
  "l": "Lunch"
};

function updateTime() {
  const date = new Date();

  let toDay = date.getDay();
  let currentHour = date.getHours();

  const prev = document.getElementById("prev");
  const prevTxt = document.getElementById("prev-txt");

  const pres = document.getElementById("pres");
  const presTxt = document.getElementById("pres-txt");

  const futr = document.getElementById("futr");
  const futrTxt = document.getElementById("futr-txt");

  const timeBar = document.getElementById("time-stat");

  const formatHour = (h) => h > 12 ? `${h - 12} PM` : `${h} AM`;

  // Format current time
  const timeTxt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear() % 100}, ${weeks[toDay]} ${formatHour(currentHour)}:${date.getMinutes().toString().padStart(2, "0")}`;
  timeBar.innerText = timeTxt;

  // Sunday check
  if (toDay === 0) {
    prev.classList.add("disp-none");
    futr.classList.add("disp-none");
    presTxt.innerText = "It's Funday!";
    return;
  }

  // Valid class hour check (10 AM to 4 PM)
  if (currentHour >= 10 && currentHour <= 15) {
    const timeKey = `${toDay}-${currentHour}`;
    const subKey = TimingsTable[timeKey];
    const currentSub = subNames[subKey] || "Free";

    const prevKey = `${toDay}-${currentHour - 1}`;
    const nextKey = `${toDay}-${currentHour + 1}`;

    const prevSub = subNames[TimingsTable[prevKey]] || null;
    const nextSub = subNames[TimingsTable[nextKey]] || null;

    // Set current
    presTxt.innerText = subKey === "LIB" || subKey === "SPORTS" || subKey === "l" ? currentSub : `CM${subKey.slice(2)} - ${currentSub}`;

    // Set previous
    if (currentHour === 10 || !prevSub) {
      prev.classList.add("disp-none");
    } else {
      prev.classList.remove("disp-none");
      prevTxt.innerText = TimingsTable[prevKey] === "LIB" || TimingsTable[prevKey] === "SPORTS" || TimingsTable[prevKey] === "l"
        ? prevSub
        : `CM${TimingsTable[prevKey].slice(2)} - ${prevSub}`;
    }

    // Set next
    if (currentHour === 15 || !nextSub) {
      futr.classList.add("disp-none");
    } else {
      futr.classList.remove("disp-none");
      futrTxt.innerText = TimingsTable[nextKey] === "LIB" || TimingsTable[nextKey] === "SPORTS" || TimingsTable[nextKey] === "l"
        ? nextSub
        : `CM${TimingsTable[nextKey].slice(2)} - ${nextSub}`;
    }
  } else {
    // Outside class hours
    prev.classList.add("disp-none");
    futr.classList.add("disp-none");
    presTxt.innerText = "No Classes Scheduled!";
  }
}

// Initial call and refresh every 10 seconds
updateTime();
setInterval(updateTime, 10000);

const SelectMenu = document.querySelectorAll("select"),
      Content = document.querySelector(".content"),
      CurrentTime = document.querySelector("h1"),
      SetAlarmButton = document.querySelector("button")

let AlarmTime, IsAlarmSet = false,
RingTone = new Audio("./assets/files/ringtone.mp3")

for (let i = 12 ; i > 0 ; i--) {
    i = i < 10 ? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    SelectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 59 ; i >= 0 ; i--) {
    i = i < 10 ? "0" + i : i
    let option = `<option value="${i}">${i}</option>`
    SelectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option)
}

for (let i = 2 ; i > 0 ; i--) {
    let AmPm = i == 1 ? "AM" : "PM"
    let option = `<option value="${AmPm}">${AmPm}</option>`
    SelectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option)
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    AmPm = "AM"
    if(h >= 12) {
        h = h - 12
        AmPm = "PM"
    }
    h = h == 0 ? h = 12 : h
    h = h < 10 ? "0" + h : h
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
    CurrentTime.innerText = `${h}:${m}:${s} ${AmPm}`

    if(AlarmTime == `${h}:${m} ${AmPm}`) {
        RingTone.play()
        RingTone.loop = true
    }
}, 1000)

function SetAlarm() {
    if(IsAlarmSet) {
        AlarmTime = ""
        RingTone.pause()
        Content.classList.remove("disable")
        SetAlarmButton.innerText = "Set Alarm"
        return IsAlarmSet = false
    }

    let Time = `${SelectMenu[0].value}:${SelectMenu[1].value} ${SelectMenu[2].value}`

    if(Time.includes("Hour") || Time.includes("Minute") || Time.includes("AM/PM")) {
        return alert("Please select a valid time...")
    }
    IsAlarmSet = true
    AlarmTime = Time
    Content.classList.add("disable")
    SetAlarmButton.innerText = "Clear Alarm"
}

SetAlarmButton.addEventListener("click", SetAlarm)
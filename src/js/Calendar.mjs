function renderCalendar(dataSource) {
    let date=new Date(); // creates a new date object with the current date and time
    let year=date.getFullYear(); // gets the current year
    let month=date.getMonth(); // gets the current month (index based, 0-11)

    const day=document.querySelector(".calendar-dates"); // selects the element with class "calendar-dates"
    const currdate=document.querySelector(".calendar-current-date"); // selects the element with class "calendar-current-date"
    const prenexIcons=document.querySelectorAll(".calendar-navigation span"); // selects all elements with class "calendar-navigation span"

    const months=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"]; // array of month names

    // function to generate the calendar
    const manipulate= async ()=> {
        const events = await dataSource.getEvents(year, month+1)

        let dayone=new Date(year, month, 1).getDay();
        let lastdate=new Date(year, month + 1, 0).getDate();
        let dayend=new Date(year, month, lastdate).getDay();
        let monthlastdate=new Date(year, month, 0).getDate();

        let lit="";

        for (let i=dayone; i > 0; i--) {
            lit+=`<li class="day inactive">${monthlastdate - i + 1}</li>`;
        }

        for (let i=1; i <=lastdate; i++) {
            var eventDay = i
            if (i < 10) {
                eventDay = `0${i}`
            }

            var eventMonth = `${month+1}`
            if (month < 9) {
                eventMonth = `0${eventMonth}`
            }

            let eventsToday = ""
            events.forEach((item) => {
                var cssClass = "event fa-li"
                let localEvent = item.event.replace("(Northern Hemisphere)", "")
                let event = ""
                if (item.date == `${year}-${eventMonth}-${eventDay}`) {
                    if (localEvent.includes("birthday")) {
                        event = `<i class="fa-solid fa-cake-candles"></i>` + localEvent.replace("'s birthday", "")
                    } else if (localEvent.toLowerCase().includes("shopping")) {
                        event = `<i class="fa-solid fa-cart-shopping"></i>` + localEvent
                    } else {
                        event = `<i class="fa-regular fa-calendar-days"></i>` + localEvent
                    }
                    if (!item.event.includes("Southern Hemisphere")) {
                        eventsToday+=`<li class="${cssClass}">${event}</li>`
                    }
                }
            })

            let isToday=i===date.getDate() && month===new Date().getMonth() && year===new Date().getFullYear() ? "active": "";
            lit+=`<li class="day ${isToday}">${i}<ul class="event-list fa-ul">${eventsToday}</ul></li>`;
        }

        for (let i=dayend; i < 6; i++) {
            lit+=`<li class="day inactive">${i - dayend + 1}</li>`
        }

        currdate.innerText=`${months[month]} ${year}`;

        day.innerHTML=lit;
    }

    manipulate();

    prenexIcons.forEach(icon=> {

    icon.addEventListener("click", async ()=> {
            month=icon.id==="calendar-prev" ? month - 1 : month + 1;

            if (month < 0 || month > 11) {
                date=new Date(year, month, new Date().getDate());
                year=date.getFullYear();
                month=date.getMonth();
            }

            else {
                date=new Date();
            }

            manipulate();
            
        });
    });
}

export default class Calendar {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }

    async init() {

        renderCalendar(this.dataSource)
    }
}
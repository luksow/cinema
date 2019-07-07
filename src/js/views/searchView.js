


import { elements, clearContent } from './base';
import { Search } from '../models/Search';



// wyswietl dostepne dni do wyboru

export const chooseDay = () => {
    clearContent(elements.dateTitle);
    const markup = `Wybierz dzień`;
    elements.dateTitle.insertAdjacentHTML('beforeend', markup);
    [elements.cinemaTitle, elements.movieTitle].forEach(e => clearContent(e));
    [elements.searchCinema(), elements.searchMovie()].forEach(e => e.classList.add("inactive-select"));
}

export const changeDay = () => {
    clearContent(elements.dateTitle);
    const markup = `Możesz zmienić dzień`;
    elements.dateTitle.insertAdjacentHTML('beforeend', markup);
}

export const chooseCinemaMovie = () => {
    [elements.cinemaTitle, elements.movieTitle].forEach(e => clearContent(e));
    const markup1 = `Wybierz kino`;
    const markup2 = `... lub film`;
    elements.cinemaTitle.insertAdjacentHTML('beforeend', markup1);
    elements.movieTitle.insertAdjacentHTML('beforeend', markup2);
    [elements.searchCinema(), elements.searchMovie()].forEach(e => e.classList.remove("inactive-select"));
}

export const changeCinemaMovie = () => {
    [elements.cinemaTitle, elements.movieTitle].forEach(e => clearContent(e));
    const markup1 = `... lub kino`;
    const markup2 = `... lub film`;
    elements.cinemaTitle.insertAdjacentHTML('beforeend', markup1);
    elements.movieTitle.insertAdjacentHTML('beforeend', markup2);
}

export const inactiveClass = () => {
    let today = new Date().getDay();
    if (today === 0) {
        today = 7;
    };
    let inactive;
    let noInactive;

    if (today === 1) {
        inactive = [elements.friday, elements.saturday, elements.sunday];
        noInactive = [elements.monday, elements.tuesday, elements.wednesday, elements.thursday];
    }
    if (today === 2) {
        inactive = [elements.friday, elements.saturday, elements.sunday, elements.monday];
        noInactive = [elements.tuesday, elements.wednesday, elements.thursday];
    }
    if (today === 3) {
        inactive = [elements.friday, elements.saturday, elements.sunday, elements.monday, elements.tuesday];
        noInactive = [elements.wednesday, elements.thursday];
    }
    if (today === 4) {
        inactive = [elements.friday, elements.saturday, elements.sunday, elements.monday, elements.tuesday, elements.wednesday];
        noInactive = [elements.thursday];
    }
    if (today === 5) {
        inactive = [];
        noInactive = [elements.friday, elements.saturday, elements.sunday, elements.monday, elements.tuesday, elements.wednesday, elements.thursday];
    }
    if (today === 6) {
        inactive = [elements.friday];
        noInactive = [elements.saturday, elements.sunday, elements.monday, elements.tuesday, elements.wednesday, elements.thursday];
    }
    if (today === 7) {
        inactive = [elements.friday, elements.saturday];
        noInactive = [elements.sunday, elements.monday, elements.tuesday, elements.wednesday, elements.thursday];
    }
    
    inactive.forEach(event => event.classList.add("inactive-day"));
    noInactive.forEach(event => event.classList.remove("inactive-day"));
};


// odczytaj, jaki dzień wybrał użytkownik

const currentDay = (clickedDay) => {
    [elements.friday, elements.saturday, elements.sunday, elements.monday, elements.tuesday, elements.wednesday, elements.thursday].forEach(event => event.classList.remove("current"));

    let current;
    
    if (clickedDay === 1) {
        current = elements.monday;
    }
    if (clickedDay === 2) {
        current = elements.tuesday;
    }
    if (clickedDay === 3) {
        current = elements.wednesday;
    }
    if (clickedDay === 4) {
        current = elements.thursday;
    }
    if (clickedDay === 5) {
        current = elements.friday;
    }
    if (clickedDay === 6) {
        current = elements.saturday;
    }
    if (clickedDay === 7) {
        current = elements.sunday;
    }

    current.classList.add("current");
}

export const daysNumbers = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
}

export const addDays = (clickedDay) => {

    let daysToAdd;
    let today = new Date().getDay();
    if (today === 0) {
        today = 7;
    };

    if (((today >= 5) && (clickedDay >= today)) || ((today <= 4) && (clickedDay >= today) && (clickedDay <= 4)))  {
        daysToAdd = clickedDay - today; 
        currentDay(clickedDay);
        console.log(moment().add(daysToAdd, 'days').format("YYYY-MM-DD"));
        return moment().add(daysToAdd, 'days').format("YYYY-MM-DD");
    };
    if ((today >= 5) && (clickedDay >= 1) && (clickedDay <= 4)) {
        daysToAdd = clickedDay + 7 - today;
        currentDay(clickedDay);
        console.log(moment().add(daysToAdd, 'days').format("YYYY-MM-DD"));
        return moment().add(daysToAdd, 'days').format("YYYY-MM-DD");
    }
}

// loader

export const renderLoader = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.loader`);
    if (loader) loader.parentElement.removeChild(loader);
};


// wyświetl odpowiednie filmy i kina do wyboru dla danego dnia

const renderCinemaName = (name) => {
    const markup = `<option value="${name}">${name}</option>`;
    elements.searchCinema().insertAdjacentHTML('beforeend', markup);
};

export const renderCinemasNames = (cinemas) => {
    const names = cinemas.map(m => m.displayName);
    console.log(names);
    const markup1 = `<option>wszystkie kina</option>`;
    const markup2 = `<option>Warszawa - wszystkie kina</option>`;
    const markup3 = `<option>Kraków - wszystkie kina</option>`;
    [markup1, markup2, markup3].forEach(e => elements.searchCinema().insertAdjacentHTML('beforeend', (e)));
    // elements.searchCinema().insertAdjacentHTML('beforeend', `<option>wszystkie</option>`);
    names.forEach(renderCinemaName);
};

const renderMovieTitle = (title) => {
    const markup = `<option value="${title}">${title}</option>`;
    elements.searchMovie().insertAdjacentHTML('beforeend', markup);
};

export const renderMoviesTitles = (movies) => {
    const titles = movies.map(m => m.name).sort();
    console.log(titles);
    elements.searchMovie().insertAdjacentHTML('beforeend', `<option>wszystkie filmy</option>`);
    titles.forEach(renderMovieTitle);
};

export const searchSettings = () => {
    if (elements.header.style.display === "none") {
        clearContent(elements.showHideTxt);
        elements.showHideTxt.insertAdjacentHTML('beforeend', 'ukryj');
        elements.header.style.display = "grid";
    } else {
        clearContent(elements.showHideTxt);
        elements.showHideTxt.insertAdjacentHTML('beforeend', 'pokaż');
        elements.header.style.display = "none";
    }
};



// odczytaj, jaki film/kino wybrał użytkownik

export const getCinema = () => elements.searchCinema().value;
export const getMovie = () => elements.searchMovie().value;
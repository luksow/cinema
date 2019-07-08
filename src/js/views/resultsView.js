import { elements, clearContent } from './base';
import { watchingChanges } from '../index'

const fixedTrailer = (oldURL) => {
    const newURL = oldURL.replace("watch?v=", "embed/");
    return newURL;
}

const wrongAtt = ['drama', 'horror', 'animation', 'family', 'fantasy', 'comedy', 'musical', 'action', 'sci-fi', 'thriller', 'war', 'bez-ograniczen', '12-plus', '15-plus', '2d', '3d', '4dx', 'subbed', 'first-subbed-lang-pl', 'dubbed', 'dubbed-lang-pl', 'original-lang-en-us', 'local-language', 'original-lang-pl', 'na', 'vip'];
    
const fixedAttributes = (oldAtt) => {
    const rightAtt = ['dramat', 'horror', 'film animowany', 'film rodzinny', 'fantasy', 'komedia', 'musical', 'film akcji', 'science-fiction', 'thriller', 'film wojenny', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    const indexNumber = wrongAtt.indexOf(oldAtt);
    if (indexNumber > -1) {
        return rightAtt[indexNumber];
    } else {
        return '';
    }
};

const renderAttributes = (list) => {
    const att = list.map(fixedAttributes).filter(function (el) {
        return el != '';
    });
    return att.join(', ');
}

const fixedAgeLimits = (oldAgeAtt) => {
    const rightAtt = ['', '', '', '', '', '', '', '', '', '', '', 'bez ograniczeń wiekowych', 'ograniczenie wiekowe: od 12 lat', 'ograniczenie wiekowe: od 15 lat', '', '', '', '', '', '', '', '', '', '', ''];
    const indexNumber = wrongAtt.indexOf(oldAgeAtt);
    if (indexNumber > -1) {
        return rightAtt[indexNumber];
    } else {
        return '';
    }
}

const renderAgeLimits = (ageLimit) => {
    return ageLimit.map(fixedAgeLimits).filter(function (el) {
        return el != '';
    });
}

const fixedTime = (oldTime) => {
    const newTime = oldTime.split('T')[1].slice(0, 5);
    return newTime;
}

const eventsAttribues = (oldEventAtt) => {
    const rightAtt = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '2d', '3d', '4dx', 'napisy', '', 'dubbing', '', '', '', '', '', 'VIP'];
    const indexNumber = wrongAtt.indexOf(oldEventAtt);
    if (indexNumber > -1) {
        return rightAtt[indexNumber];
    } else {
        return '';
    }
};

const renderEventsAttributes = (list) => {
    const att = list.map(eventsAttribues).filter(function (el) {
        return el != '';
    });
    return att.join(', ');
}

const eventsTimesAndBooking = (events) => {
    return events.map(el => {
        return `<a target="_blank" href="${el.booking}" title="${renderEventsAttributes(el.eventAttributes)}">${fixedTime(el.time)}</a>`;
    }).join(' ');
}






export const clearWhenSearchChange = () => {
    [elements.selection_panel(), elements.cinemaInfo(), elements.cinemaResults(), elements.movieInfo(), elements.movieResults(), elements.theEnd()].forEach(e => clearContent(e));
}




export const renderCinemaInfo = cinemaDetails => {
    const markup = `
        <p class="cinema_info_name"><a target="_blank" href="${cinemaDetails.link}">${cinemaDetails.displayName}</a></p>
        <p class="cinema_info_address">adres: ${cinemaDetails.address}</p>
    `;
    elements.cinemaInfo().insertAdjacentHTML('beforeend', markup);
};

const renderCinemaResults = (result) => {
    const markup = `
        <li class="single_cinema_result"> 
            <div class="cinema_results_watching">
                <div class="towatch">
                    <i class="watching_${result.movieID} towatch_${result.movieID} towatch_icon fas fa-eye fa-2x"></i>
                </div>
                <div class="watched">
                    <i class="watching_${result.movieID} watched_${result.movieID} watched_icon far fa-calendar-check fa-2x"></i>                                
                </div>
            </div>   
            <div class="cinema_results_name">
                <p class="cinema_results_title"><a target="_blank" href="${result.link}">${result.movieName}</a></p>
            </div>     
            <figure class="cinema_results_poster">
                <img src="${result.poster}" width="220" alt="Plakat filmu ${result.movieName}">
            </figure>
            <div class="cinema_results_data">
                <p class="cinema_results_attributes">${renderAttributes(result.movieAttributes)}</p>
                <p class="cinema_results_attributes">${renderAgeLimits(result.movieAttributes)}</p>
                <p class="cinema_results_lasting">czas trwania: ${result.length} min</p>
                <p class="cinema_results_year">rok premiery: ${result.year}</p>
                <p class="cinema_results_time">godziny seansów: ${eventsTimesAndBooking(result.events)}</p>
                
            </div>
            <div class="trailer_${result.movieID} cinema_results_trailer">
                <p class="trailer_text_${result.movieID} cinema_results_trailer_text">pokaż zwiastun</p>
                <iframe class="trailer_video_${result.movieID} cinema_results_trailer_video" width="400" height="310" src="${fixedTrailer(result.video)}" frameborder="0"></iframe>
            </div>
        </li>
    `;
    elements.cinemaResults().insertAdjacentHTML('beforeend', markup);

    

};

export const renderResultsForCinema = (list) => {
    list.forEach(renderCinemaResults);
    console.log(list);
};



const eventsTimesAndBookingWawKrk = (events, cinemaName) => {
    return events.map(el => {
        return `<a target="_blank" href="${el.booking}" title="${cinemaName}, ${renderEventsAttributes(el.eventAttributes)}">${fixedTime(el.time)}</a>`;
    }).join(' ');
}

export const renderTitleWawKrk = (city) => {
    if (elements.cinemaInfo().innerHTML === "") {
        const markup = `<p class="title_waw_krk">${city}:</p>`
        elements.cinemaInfo().insertAdjacentHTML('beforeend', markup);
    };
};

export const renderCinemaInfoWawKrk = (cinemaDetails) => {
    const markup = `
        <p class="cinema_info_wawkrk"><a target="_blank" href="${cinemaDetails.link}">${cinemaDetails.displayName}</a> adres: ${cinemaDetails.address}</p>
    `;
    elements.cinemaInfo().insertAdjacentHTML('beforeend', markup);
};

const renderCinemaResultsWawKrk = (result) => {

    if (!elements.cinemaResults().contains(document.querySelector(`.result_${result.movieID}`))) {
        const markup1 = `
            <li class="single_cinema_result result_${result.movieID}"> 
                <div class="cinema_results_watching">
                    <div class="towatch">
                        <i class="watching_${result.movieID} towatch_${result.movieID} towatch_icon fas fa-eye fa-2x"></i>
                    </div>
                    <div class="watched">
                        <i class="watching_${result.movieID} watched_${result.movieID} watched_icon far fa-calendar-check fa-2x"></i>                                
                    </div>
                </div>   
                <div class="cinema_results_name">
                    <p class="cinema_results_title"><a target="_blank" href="${result.link}">${result.movieName}</a></p>
                </div>     
                <figure class="cinema_results_poster">
                    <img src="${result.poster}" width="220" alt="Plakat filmu ${result.movieName}">
                </figure>
                <div class="cinema_results_data">
                    <p class="cinema_results_attributes">${renderAttributes(result.movieAttributes)}</p>
                    <p class="cinema_results_attributes">${renderAgeLimits(result.movieAttributes)}</p>
                    <p class="cinema_results_lasting">czas trwania: ${result.length} min</p>
                    <p class="cinema_results_year">rok premiery: ${result.year}</p>
                    <p class="cinema_results_time time_${result.movieID}">godziny seansów: ${eventsTimesAndBookingWawKrk(result.events, result.cinemaName)}</p>
                </div>
                <div class="trailer_${result.movieID} cinema_results_trailer">
                    <p class="trailer_text_${result.movieID} cinema_results_trailer_text">pokaż zwiastun</p>
                    <iframe class="trailer_video_${result.movieID} cinema_results_trailer_video" width="400" height="310" src="${fixedTrailer(result.video)}" frameborder="0"></iframe>
                </div>
            </li>
        `;
        elements.cinemaResults().insertAdjacentHTML('beforeend', markup1);
    } else {
        const markup2 = `
            ${eventsTimesAndBookingWawKrk(result.events, result.cinemaName)}
        `
        document.querySelector(`.time_${result.movieID}`).insertAdjacentHTML('beforeend', markup2);
    };
};

export const renderResultsForCinemaWawKrk = (list) => {
    list.forEach(movie => renderCinemaResultsWawKrk(movie));
    console.log(list);
};

export const renderMovieInfo = (movieDetails) => {
    const markup = `
        <div class="movie_info_details">
            <div class="movie_info_watching">
                <div class="towatch">
                    <i class="watching_${movieDetails.movieID} towatch_${movieDetails.movieID} towatch_icon fas fa-eye fa-2x"></i>
                </div>
                <div class="watched">
                    <i class="watching_${movieDetails.movieID} watched_${movieDetails.movieID} watched_icon far fa-calendar-check fa-2x"></i>                                
                </div>
            </div>   
            <div class="movie_info_name">
                <p class="movie_info_title"><a target="_blank" href="${movieDetails.link}">${movieDetails.movieName}</a></p>
            </div>     
            <figure class="movie_info_poster">
                <img src="${movieDetails.poster}" width="220" alt="Plakat filmu ${movieDetails.movieName}">
            </figure>
            <div class="movie_info_data">
                <p class="movie_info_attributes">${renderAttributes(movieDetails.movieAttributes)}</p>
                <p class="movie_info_attributes">${renderAgeLimits(movieDetails.movieAttributes)}</p>
                <p class="movie_info_lasting">czas trwania: ${movieDetails.length} min</p>
                <p class="movie_info_year">rok premiery: ${movieDetails.year}</p>
            </div>
            <iframe class="movie_info_trailer" width="400" height="310" src="${fixedTrailer(movieDetails.video)}" frameborder="0"></iframe>
        </div>
    `;
    elements.movieInfo().insertAdjacentHTML('beforeend', markup);
};

const renderMovieResults = result => {
    const markup = `
        <li class="single_movie_result">
            <p class="movie_results_name"><a target="_blank" href="${result.cinema.cinemaLink}">${result.cinema.cinemaName}</a></p>
            <p class="movie_results_address">adres: ${result.cinema.cinemaAddress}</p>
            <p class="movie_results_time">godziny seansów: ${eventsTimesAndBooking(result.events)}</p>
        </li>
    `;
    elements.movieResults().insertAdjacentHTML('beforeend', markup);
};

export const renderResultsForMovie = (list) => {
    console.log(list);
    list.forEach(renderMovieResults);
};





export const addCitiesSelection = () => {
    const markup = `
    <div class="pl_waw_krk_title">Dla wybranego filmu wyświetl:</div>
    <div class="pl_waw_krk">
        <div class="pl current to_click" id="pl">
            <div class="pl-title">wszystkie kina</div>
            <div class="pl_pic city_pic"><img src="img/pl.png" height="60"></div>
        </div>
        <div class="waw to_click" id="waw">
            <div class="waw-title">tylko kina warszawskie</div>
            <div class="waw_pic city_pic"><img src="img/waw.png" height="60"></div>
        </div>
        <div class="krk to_click" id="krk">
            <div class="krk-title">tylko kina krakowskie</div>
            <div class="krk_pic city_pic"><img src="img/krk.png" height="50"></div>
        </div>
    </div>
    `;
    elements.selection_panel().insertAdjacentHTML('beforeend', markup);
}

export const addMoviesSelection = () => {
    const markup = `
    <div class="watching_selection_title">Dla wybranego kina wyświetl:</div>
    <div class="watching_selection">
        <div class="watching_selection_allmovies current to_click">wszystkie filmy</div>
        <div class="watching_selection_towatch to_click">tylko "chcę obejrzeć"</div>
        <div class="watching_selection_watched to_click">bez obejrzanych</div>
    </div>
    `;
    elements.selection_panel().insertAdjacentHTML('beforeend', markup);
}



export const currentCity = (clickedCity) => {
    [elements.pl(), elements.waw(), elements.krk()].forEach(event => event.classList.remove("current"));
    clickedCity.classList.add("current");
}

export const currentMovies = (clickedElement) => {
    [elements.selection_allmovies(), elements.selection_towatch(), elements.selection_watched()].forEach(event => event.classList.remove("current"));
    clickedElement.classList.add("current");
}



export const renderTheEnd = () => {
    if (elements.cinemaResults().innerHTML || elements.movieResults().innerHTML) {
        elements.theEnd().insertAdjacentHTML('beforeend', 'The End.');
    } 
}




















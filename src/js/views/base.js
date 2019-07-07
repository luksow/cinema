export const elements = {
    layout: document.querySelector('.layout'),
    header: document.querySelector('.header'),
    dateTitle: document.querySelector('.date-title'),
    cinemaTitle: document.querySelector('#cinema_title'),
    movieTitle: document.querySelector('#movie_title'),
    weekdays: document.querySelector('.date'),
    friday: document.querySelector('.fri'),
    saturday: document.querySelector('.sat'),
    sunday: document.querySelector('.sun'),
    monday: document.querySelector('.mon'),
    tuesday: document.querySelector('.tue'),
    wednesday: document.querySelector('.wed'),
    thursday: document.querySelector('.thu'),
    searchDate: document.querySelector('#date'),
    searchMovie: () => document.querySelector('#movie'),
    searchCinema: () => document.querySelector('#cinema'),
    res: () => document.querySelector('.results'),
    cinemaInfo: () => document.querySelector('.cinema_info'),
    cinemaResults: () => document.querySelector('.cinema_results_list'),
    movieInfo: () => document.querySelector('.movie_info'),
    movieResults: () => document.querySelector('.movie_results_list'),
    trailer: () => document.querySelector('.cinema_results_trailer'),
    trailerVideo: () => document.querySelector('.cinema_results_trailer_video'),
    trailerText: () => document.querySelector('.cinema_results_trailer_text'),
    trailerTextAll: () => document.querySelectorAll('.cinema_results_trailer_text'),
    theEnd: () => document.querySelector('.theend'),
    pl_waw_krk: document.querySelector('.pl_waw_krk'),
    pl: () => document.querySelector('.pl'),
    waw: () => document.querySelector('.waw'),
    krk: () => document.querySelector('.krk'),
    selection_panel: () => document.querySelector('.selection_panel'),
    selection_allmovies: () => document.querySelector('.watching_selection_allmovies'),
    selection_towatch: () => document.querySelector('.watching_selection_towatch'),
    selection_watched: () => document.querySelector('.watching_selection_watched'),
    showHideTxt: document.querySelector('.show_hide_text'),
    showHideBtn: document.querySelector('.show_hide_settings'),
    watching_item: () => document.querySelector('.item')
};

export const clearContent = (e) => {
    if (e.innerHTML) {
        e.innerHTML = '';
    } 
};


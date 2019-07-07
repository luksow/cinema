import { elements } from './base';
import { limitRecipeTitle } from './searchView';
import { resultsForAMovie } from '../index';

export const toggleWatchingBtn = (movieID, listType, appearsOnList) => {
    const iconString = appearsOnList ? '#14a614' : '#1c501c';
    document.querySelector(`.${listType}_${movieID}`).style.color = iconString;
};

export const toggleWatchingMenu = (listType, numItems) => {
    const iconString = numItems > 0 ? '#14a614' : '#1c501c';
    document.querySelector(`.${listType}_main`).style.color = iconString;
    const cursor = numItems > 0 ? 'pointer' : 'not-allowed';
    document.querySelector(`.${listType}_main`).style.cursor = cursor;
};

const limitName = (title, limit = 30) => {
    const newTitle = [];
    //console.log(title);
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

export const renderItem = (item) => {
    //console.log(item);
    const markup = `
        <li class="${item.movieName}">
            <div class="item item_${item.listType}_${item.movieID}">
                <p>${limitName(item.movieName)}</p>
                <figure class="watching_poster">
                    <img src="${item.moviePoster}" height="100" alt="Plakat filmu ${item.movieName}">
                </figure>
            </div>
        </li>
    `;
    document.querySelector(`.${item.listType}_list`).insertAdjacentHTML('beforeend', markup);

    const theItem = document.querySelector(`.item_${item.listType}_${item.movieID}`).parentElement;
    theItem.addEventListener('click', function () {
        //console.log(theItem.getAttribute("class"));
        resultsForAMovie(theItem.getAttribute("class"), 'pl');
        elements.searchMovie().value = theItem.getAttribute("class");
    });
};


export const deleteItem = (listType, movieID) => {
    const el = document.querySelector(`.item_${listType}_${movieID}`).parentElement;
    if (el) el.parentElement.removeChild(el);
}



// export const toggleWatchedBtn = (isOnList, movieID) => {
//     const iconString = isOnList ? '#14a614' : '#1c501c';
//     document.querySelector(`.watched_${movieID}`).style.color = iconString;
// };

import axios from 'axios'

export const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = BASE_URL + '/discover/movie?sort_by=vote_count.desc&' + API_KEY;
export const searchURL = BASE_URL + '/search/movie?' + API_KEY;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';


export function getMovies(page) {
    let listTempFilterDate = [];
    return (dispatch) => {
        for (let i = 0; i < page; i++) {
            axios.get(API_URL + "&page=" + (i + 1)).then(res => {
                let listTemp = res.data.results
                for (let x of listTemp) {
                    listTempFilterDate.push(x)
                }
                if (i === (page - 1)) {
                    return dispatch({ type: 'GET_MOVIE', data: listTempFilterDate })
                }
            })
        }
    }
}


export function searchMovie(title, date, page) {
    console.log(page)
    let listTempFilterDate = [];
    return (dispatch) => {
        for (let i = 0; i < page; i++) {
            axios.get(searchURL + '&query=' + title + "&page=" + (i + 1)).then(res => {
                let listTemp = res.data.results
                if (date !== '') {
                    for (let x of listTemp) {
                        if (x.release_date === date) {
                            listTempFilterDate.push(x)
                        }
                    }
                } else {
                    for (let x of listTemp) {
                        listTempFilterDate.push(x)
                    }
                }
                if (i === (page - 1)) {
                    console.log(listTempFilterDate.length)
                    return dispatch({ type: 'SEARCH_MOVIE', data: listTempFilterDate, pageState: 'search' })
                }
            })
        }

    }
}

export function setTitle(newTitle) {
    let tempList = ['']
    return (dispatch) => {
        axios.get(searchURL + '&query=' + newTitle).then(res => {
            let counter = 0
            for (let x of res.data.results) {
                if (counter === 8) break;
                tempList.push(x)
                counter = counter + 1
            }
            return dispatch({
                type: 'SET_TITLE',
                data: newTitle,
                suggest: tempList
            })
        })
    }
}

export function setFilterDate(newDate) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_DATE',
            data: newDate
        })
    }
}

export function updatePage(isNewSearch) {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_PAGE',
            isNewSearch: isNewSearch
        })
    }
}

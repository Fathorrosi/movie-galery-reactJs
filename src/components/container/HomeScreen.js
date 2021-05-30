import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IMG_URL } from '../action/action'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as action from '../action/action'
import './HomeScreen.css'
import Popup from './Popup';

class HomeScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            detail: []
        }
        this.props.getMovies(this.props.page)
    }

    searchMovie(isNewSearch) {
        this.props.updatePage(isNewSearch)
        setTimeout(() => {
            this.props.searchMovie(this.props.title, this.props.filterDate, this.props.page)
            console.log(this.props.pageState)
        }, 500);
    }

    loadMore(isNewSearch) {
        console.log(this.props.pageState)
        if (this.props.pageState === 'search') {
            this.props.updatePage(isNewSearch)
            setTimeout(() => {
                this.props.searchMovie(this.props.title, this.props.filterDate, this.props.page)
            }, 500);
        } else {
            this.props.updatePage(isNewSearch)
            console.log(this.props.page)
            setTimeout(() => {
                this.props.getMovies(this.props.page)
            }, 500);
        }
    }

    handleChangeTitle = (val) => {
        this.props.setTitle(val.target.value)
    }

    handleChangeDate = (val) => {
        if (this.convertDate(val.target.value) !== "1970-01-01") {
            this.props.setFilterDate(this.convertDate(val.target.value))
        } else {
            this.props.setFilterDate('')
        }
    }

    togglePopup() {
        this.setState({ showPopup: false })
    }

    showDetail(movie) {
        this.setState({ showPopup: true, detail: movie })
        console.log(this.state.detail)
    }

    convertDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    render() {
        return (
            <div>
                <body>
                    <header>
                        <input type="text" onChange={this.handleChangeTitle} placeholder="Search" class="search" list="datalist1" />
                        <datalist id="datalist1">
                            {this.props.suggest.map(function (suggest) {
                                return <option value={suggest.title} />
                            })}
                        </datalist>
                        <button onClick={() => this.searchMovie(true)} class="searchBtn">Search</button>
                    </header>
                    <filter>
                        <div class="datepicker">
                            <h3>Filter</h3>
                            <DatePickerComponent onChange={this.handleChangeDate} placeholder="Enter date"></DatePickerComponent>
                        </div>
                    </filter>
                    <InfiniteScroll
                        dataLength={this.props.listMovie.length}
                        next={() => this.loadMore(false)}
                        hasMore={true}
                    >
                        <main>
                            {this.props.listMovie.map((movie, i) =>
                                <div className="movie">
                                    <img alt={i} onClick={() => this.showDetail(movie)} src={IMG_URL + movie.poster_path} />
                                    <div class="movie-info">
                                        <h3>{movie.title}</h3>
                                    </div>
                                </div>
                            )}

                        </main>

                    </InfiniteScroll>
                    {this.state.showPopup ?
                        <Popup
                            title={this.state.detail.title}
                            overview={this.state.detail.overview}
                            releaseDate={this.state.detail.release_date}
                            voteAverage={this.state.detail.vote_average}
                            voteCount={this.state.detail.vote_count}
                            language={this.state.detail.original_language}
                            poster={IMG_URL + this.state.detail.poster_path}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </body>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps, action)(HomeScreen);

import React from 'react'
import './popup.css'

class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className='popup_img'>
                        <img src={this.props.poster} /> <br></br>
                    </div>
                    <button onClick={this.props.closePopup} class="closeButton">Close</button>
                    <h2>{this.props.title}</h2>
                    <hr></hr>
                    <h4>Overview</h4>
                    <p>{this.props.overview}</p>
                    <p><bold>Release date : &nbsp; </bold> {this.props.releaseDate}</p>
                    <p><bold>Vote average : &nbsp; </bold> {this.props.voteAverage}</p>
                    <p><bold>Vote count : &nbsp; </bold> {this.props.voteCount}</p>
                    <p><bold>Language : &nbsp; </bold> {this.props.language}</p>
                </div>
            </div>
        );
    }
}

export default Popup;
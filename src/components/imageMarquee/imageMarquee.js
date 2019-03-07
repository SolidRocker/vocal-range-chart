import React, {Component} from 'react';
import './imageMarquee.css'
import Marquee from "react-smooth-marquee"

class ImageMarquee extends Component {

    renderImage(i) {
        console.log(i);
        return <img
            src={require("../../images/longImage.png")}
            alt={i}
            className="slideshow"/> 
    }

    render() {
        return(
            <div className="slideshow-section">
                {this.renderImage(1)}
               
            </div>
        )
    }
}

export default ImageMarquee;
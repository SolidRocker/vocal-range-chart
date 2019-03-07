import React, {Component} from 'react';
import './imageMarquee.css'

class ImageMarquee extends Component {

    renderImage(i) {
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
import React from 'react'
import { Carousel } from "antd"
import "./ImageSlider.css"

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {
                    /* props.images == [] ?
                    <div className="img-image">
                        <h2>hasdflo</h2>
                    </div> : */
                    props.images.map((image, index) =>(
                    <div key={index}>
                        <img className="img-image" src={`http://localhost:5000/${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider

import React, {useState} from 'react'
import Dropzone from "react-dropzone"
import {Icon} from "antd"
import "./FileUpload.css"
import Axios from "axios"
import { PromiseProvider } from 'mongoose'


function FileUpload(props) {

    const [images, setImages] = useState([]);

    const onDrop =(files)=> {
        let formData = new FormData();
        const config = {
            header: {"content-type": "multipart/form-data"}
        }
        formData.append("file", files[0])

        //save the Image
        Axios.post("/api/product/uploadImage", formData, config)
        .then(response => {
            if(response.data.success){
                setImages([...images, response.data.image])
                props.refreshFunction([...images, response.data.image])
            }else{
                alert("Failed to save the Image")
            }
        })
    }
    const onDelete = (image) =>{
        const currentIndex = images.indexOf(image);
        let newImages = [...images]
        newImages.splice(currentIndex, 1)
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div className="div-main">
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div className="div-dropzone"
                        {...getRootProps()}
                    >
                        {/* {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })} */}
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

                <div className="div-displayImage">
                    {images.map((image, index)=>(
                        <div onClick={() => onDelete(image)}>
                            <img className="img-images" src={`http://localhost:5000/${image}`} alt={`productImg-${index}`}></img>
                        </div>
                    ))}
                </div>
        </div>
    )
}


export default FileUpload

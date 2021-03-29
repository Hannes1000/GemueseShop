import React, { useState } from 'react'
import "./AddProductPage.css"
import {Typography, Button, Form, Message, Input, Icon} from "antd";
import FileUpload from "../../utils/FileUpload"
import { string } from 'yup';
import Axios from 'axios';
import { PromiseProvider } from 'mongoose';

const { Title } = Typography
const { TextArea } = Input

function UploadProductPage(props) {
    const [nameValue, setNameValue] = useState("")
    const [typeValue, setTypeValue] = useState("")
    const [priceValue, setPriceValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [availableValue, setAvailableValue] = useState(true)
    const [images, setImages] = useState([])

    const onNameChange = (event) =>{
        setNameValue(event.currentTarget.value)
    }
    const onTypeChange = (event) =>{
        setTypeValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event) =>{
        setDescriptionValue(event.currentTarget.value)
    }
    const onAvailableChange = (event) =>{
        setAvailableValue(!availableValue)
    }
    const onPriceChange = (event) =>{
        setPriceValue(event.currentTarget.value)
    }
    const updateImages =(newImages) =>{
        //console.log(newImages)
        setImages(newImages)
    }
    const onSubmit = (event) =>{
        event.preventDefault();

        const variables = {
            name: nameValue,
            type: typeValue,
            description: descriptionValue,
            available: availableValue,
            images: images,
            price: priceValue
        }

        Axios.post("/api/product/uploadProduct", variables)
        .then(response =>{
            if(response.data.success){
                //alert("product uploaded")
                props.history.push("/product/view")
            }else{
                alert("Failed to upload Product")
            }
        })
    }

    return (
        <div>
            <div id="div-form">
                <div id="div-title">
                    <Title level={2}>Produkt hinzufügen</Title>
                </div>
                <div id="linie1" style={{top: "150px"}}></div>
                <Form className="form-input" onSubmit={onSubmit}>

                    <FileUpload refreshFunction={updateImages}></FileUpload>
                    <br></br>
                    <br></br>
                    <label>Gemüse Name [max. 25 Buchstaben]</label>
                    <Input 
                        onChange={onNameChange}
                        value={nameValue}
                        type="text"
                        maxLength={25}
                        >
                        
                    </Input>
                    <br></br>
                    <label>Gemüse Art [max. 25 Buchstaben]</label>
                    <Input 
                        onChange={onTypeChange}
                        value={typeValue}
                        type="text"
                        maxLength={25}>

                    </Input>
                    <br></br>
                    <label>Preis</label>
                    <Input 
                        onChange={onPriceChange}
                        value={priceValue}
                        type="Number" 
                        pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" 
                        data-type="currency">
                        
                    </Input>
                    <br></br>
                    <label>Beschreibung</label>
                    <Input
                        onChange={onDescriptionChange}
                        value={descriptionValue}
                        rows="5"
                        >

                    </Input>
                    <br></br>
                    <br></br>
                    <div className="div-checkbox">
                        <label>Vorhanden</label>
                        <Input 
                            style={{width:"30px", height:"30px"}}
                            type="checkbox" 
                            name="available"
                            onChange={onAvailableChange}
                            value={availableValue}
                            defaultChecked
                        ></Input>
                    </div>
                    <br></br>
                    <br></br>
                    <Button
                        onClick={onSubmit}>
                        Hinzufügen
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default UploadProductPage

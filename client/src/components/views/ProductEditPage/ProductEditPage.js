import React, { useState, useEffect } from 'react'
import "./ProductEditPage.css"
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
                props.history.push("/")
            }else{
                alert("Failed to upload Product")
            }
        })
    }

    useEffect(() =>{
        Axios.post('/api/product/getProductByID/' + props.match.params.id)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.product)
                }else{
                    alert("Failed to load Product")
                }
            })
    }, [])



    return (
        <div>
            <div style={{maxWidth: '700px', margin:'2rem auto'}}>
                <div style={{textAlign:'center', marginBottom:'2rem'}}>
                    <Title level={2}>Produkt bearbeiten</Title>
                </div>
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
                    <TextArea
                        onChange={onDescriptionChange}
                        value={descriptionValue}
                        rows="5"
                        >

                    </TextArea>
                    <br></br>
                    <br></br>
                    <label>Vorhanden</label>
                    <br></br>
                    <Input 
                        style={{width:"30px", height:"30px"}}
                        type="checkbox" 
                        name="available"
                        onChange={onAvailableChange}
                        value={availableValue}
                        defaultChecked
                        ></Input>
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

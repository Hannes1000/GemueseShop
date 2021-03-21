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


    return (
        <div>
            <div style={{maxWidth: '700px', margin:'2rem auto'}}>
                <div style={{textAlign:'center', marginBottom:'2rem'}}>
                    <Title level={2}>Produkt hinzufügen</Title>
                </div>
                <Form className="form-input" onSubmit={onSubmit}>

                    <FileUpload refreshFunction={updateImages}></FileUpload>
                    <br></br>
                    <br></br>
                    <label>Gemüse Name</label>
                    <Input 
                        onChange={onNameChange}
                        value={nameValue}
                        type="text">
                        
                    </Input>
                    <br></br>
                    <label>Gemüse Art</label>
                    <Input 
                        onChange={onTypeChange}
                        value={typeValue}
                        type="text">

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
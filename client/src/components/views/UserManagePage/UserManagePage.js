import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./UserManagePage.css"
import { Card, Col, Row, Input, Button, Switch} from 'antd';
import ImageSlider from "../../utils/ImageSlider"
import { set } from 'mongoose';
const {Meta} = Card;

function ProductViewPage(props) {

    const [users, setUsers] = useState([])


    useEffect(() =>{
        getUsers()
    }, [])

    const getUsers = () => {
        Axios.post("/api/users/getAllUsers")
        .then(response =>{
            if(response.data.success){
                setUsers(response.data.users)
                //console.log(response.data.users)
            }else{
                alert("Failed to fetch product data")
            }
        })
    }

    const onSelectedSwitch =(user)=>{
        let value = user.role;
        if(value == 1){
            value = 0;
        }else{
            value = 1;
        }
        const variables ={
            role: value
        }
        user.role = value;

        Axios.post("/api/users/setUserByID/"+user._id, variables)
        .then(response =>{
            if(response.data.success){
                //console.log("updated")
            }else{
                alert("Failed to update user data")
            }
        })
    }
    
    //lg = largeSize; md = mediumSize; xs = smallSize
    const renderCards = users.map((user, index)=>{

        return <Col lg={6} md={12} xs={24} key={index}>
                <Card 
                className="usercard" 
                key={index}
                id={index}
                >
                    <div style={{position:"absolute", left: "20px", top: "0px", fontSize: "20px"}}>
                        {user.name}
                    </div>
                    <div style={{position:"absolute", left: "20px", top: "22px"}}>
                        {user.email}
                    </div>
                    <Switch style={{position:"absolute", right:"10px", bottom: "10px"}} defaultChecked={(user.role == 1)} onChange={()=> onSelectedSwitch(user)} />
                </Card>
            </Col>

    })

    return (
        <div className="div-main-title">
            <div className="div-head">
                <div className="title">
                    <h2>Alle Benutzer</h2>
                    <div id="linie"></div>
                </div>
            </div>
            <br></br>
            {users.length === 0 ?
                <div className="div-no-products">
                    <h2>Benutzer werden geladen....</h2>
                </div> :
                <div className="div-products">
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
        </div>
    )
}

export default ProductViewPage

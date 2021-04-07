import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./ProductViewPage.css"
import { Card, Col, Row, Input, Button, Switch} from 'antd';
import Popup from 'reactjs-popup';
import ImageSlider from "../../utils/ImageSlider"
import CheckboxFilter from './Sections/CheckboxFilter';
const {Meta} = Card;

function ProductViewPage(props) {

    const [products, setProducts] = useState([])
    const [availableValue, setAvailableValue] = useState(true)
    const [selectedValue, setSelectedValue] = useState([])
    const [amountValue, setAmountValue] = useState([])

    useEffect(() =>{
        //console.log(props)
        const variables = {
            available: availableValue
        }
        getProducts(variables);
    }, [])

    const getProducts = (variables) => {
        Axios.post("/api/product/getProduct", variables)
        .then(response =>{
            if(response.data.success){
                setProducts(response.data.product)
                response.data.product.forEach(product => {
                    //console.log(product.available)
                    setSelectedValue(oldArray => [...oldArray, false])
                    setAmountValue(oldArray => [...oldArray, "0"])
                });
            }else{
                alert("Failed to fetch product data")
            }
        })
    }

    const onAvailableChange = () =>{
        setAvailableValue(!availableValue);
        const variables = {
            available: !availableValue
        }
        getProducts(variables);
    }

    const handleFilters =(filters, category)=>{
        if(category === "available"){
            onAvailableChange();
        }
    }

    const onSelectedSwitch = (index) =>{
        //console.log(selectedValue)
        //console.log(index)
        let arr = selectedValue;
        var start_index = index
        var number_of_elements_to_remove = 1;
        //console.log(arr[index])
        var replacement;
        if(arr[index] == true){
            replacement = false;
        }else{
            replacement = true;
        }
        arr.splice(start_index, number_of_elements_to_remove, replacement);
        //console.log(arr)
        setSelectedValue(arr)
        // let arr = []
        // arr = selectedValue
        // console.log(arr)
        // arr.splice(index, 1, !arr.indexOf(index))
        // console.log(arr.indexOf(index))
        // setSelectedValue(arr)
    }

    const onOrderClick = ()=>{
        //console.log(props.user.userData._id)

        let arrSelectedProducts = [];
        let arrAmount = [];
        for(let i = 0; i < products.length; i++){
            if(selectedValue[i] == true && amountValue[i] != "0" && amountValue[i] != ""){
                //arrSelectedProducts.push(products[i]._id)
                arrSelectedProducts.push(products[i])
                arrAmount.push(amountValue[i])
            }
        }

        console.log(arrSelectedProducts)
        console.log(arrAmount)

        const variables ={
            user: props.user.userData._id,
            products: arrSelectedProducts,
            menge: arrAmount
        }

        Axios.post("/api/order/uploadOrder", variables)
        .then(response =>{
            if(response.data.success){
                props.history.push("/order/email/" + response.data.order)
            }else{
                alert("Failed to fetch product data")
            }
        })
    }

    const onChangeAmount = (event, index)=>{
        // console.log(index)
        // console.log(event.currentTarget.value)
        // console.log(amountValue)
        let arr = amountValue;
        var start_index = index
        var number_of_elements_to_remove = 1;
        //console.log(arr[index])
        var replacement;
        if(arr[index] === "0"){
            replacement = "0";
        }else{
            replacement = event.currentTarget.value;
        }
        arr.splice(start_index, number_of_elements_to_remove, event.currentTarget.value);
        //console.log(arr)
        setAmountValue(arr)
    }


    //lg = largeSize; md = mediumSize; xs = smallSize
    const renderCards = products.map((product, index)=>{

        return <Button className="productcard" key={index}>
                    <div id="productname">
                        {product.name}
                    </div>
                    <Switch style={{position:"absolute", right:"10px", bottom: "10px"}} defaultChecked={(selectedValue[index] == true)} onChange={()=> onSelectedSwitch(index)} />
                    <div id="description">
                        {product.description}
                    </div>
                    <div id="productimg">
                        <ImageSlider images={product.images} />
                    </div>
                    <Input
                        placeholder={"Menge Angeben"}
                        onChange={(event)=>onChangeAmount(event, index)}
                        style={{position:"absolute", right: "0px", top: "300px"}}
                    >
                    </Input>
                </Button>
            {/* <Card hoverable={true} cover={<ImageSlider images={product.images} />} bordered={true} >
                <Meta title={product.name} id="productname">
                </Meta>
                <Meta title={product.description} id="description">
>>>>>>> a4468e6edfbf2ab013fc7f41b45922edcad5dc99
                </Meta>
                <p className="amount-input">
                    Menge:
                </p>
<<<<<<< HEAD
                <Input
                    placeholder={"Menge Angeben"}
                    onChange={(event)=>onChangeAmount(event, index)}
                >
                </Input>
                <Switch style={{position:"absolute", right:"40px", top: "50px"}} defaultChecked={(selectedValue[index] == true)} onChange={()=> onSelectedSwitch(index)} />
            </Card>
        </Col>
=======
                <Input placeholder={"Menge Angeben"}>
                </Input>
                <Switch style={{position:"absolute", right:"40px", top: "50px"}} defaultChecked={selectedValue[index]} onChange={()=> onSelectedSwitch(index)} />

<<<<<<< HEAD
            </Card> */}
        {/* </Col> */}

    })

    return (
        <div className="div-main-title">
            <div className="div-head">
                <div className="title">
                    <h2>Unsere Produkte</h2>
                    <div id="linie"></div>
                </div>
            </div>
            <br></br>
            {products.length === 0 ?
                <div className="div-no-products">
                    <h2>Produkte werden geladen....</h2>
                </div> :
                <div className="div-products">
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "50px"}}>

                <Button onClick={()=>onOrderClick()}>
                    Bestellung Aufgeben
                </Button>
            </div>
        </div>
    )
}

export default ProductViewPage

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./ProductViewPage.css"
import { Card, Col, Row, Input, Button, Switch } from 'antd';
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
                arrSelectedProducts.push(products[i]._id)
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
        return <Col lg={6} md={12} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
                bordered={true}
                style={(selectedValue[index] == true) ? {border:"5px solid green", borderRadius:"10px"} : {border:"5px solid lightgray", borderRadius:"10px"}}
                // style={product.available ? {border:"5px solid darkgreen", borderRadius:"10px"} :{border:"5px solid red", borderRadius:"10px"}}
            >
                <Meta
                    title={product.name}
                    // description={product.description}
                >
                </Meta>
                <p 
                    className="amount-input"
                >
                    Menge: 
                </p>
                <Input
                    placeholder={"Menge Angeben"}
                    onChange={(event)=>onChangeAmount(event, index)}
                >
                </Input>
                <Switch style={{position:"absolute", right:"40px", top: "50px"}} defaultChecked={(selectedValue[index] == true)} onChange={()=> onSelectedSwitch(index)} />
            </Card>
        </Col>
    })

    return (
        <div className="div-main-title">
            <div className="div-head">
                <div className="div-title">
                    <h2>Unsere Produkte</h2>
                </div>
            </div>
            <br></br>


            {/* Filter  */}
            {/* <CheckboxFilter
                handleFilters={filters => handleFilters(filters, "available")}    
            > 

            </CheckboxFilter>*/}
            {/* <div>
                <label>vorhanden</label>
                <Input
                    type="checkbox" 
                    name="available"
                    onChange={onAvailableChange}
                    value={availableValue}
                    defaultChecked
                >
                </Input>
            </div> */}

            {/* Search  */}


            {products.length === 0 ?
                <div className="div-no-products">
                    <h2>Produkte werden geladen....</h2>
                </div> :
                <div>
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button 
                onClick={()=>onOrderClick()}>
                    Bestellung Aufgeben
                </Button>
            </div>
        </div>
    )
}

export default ProductViewPage

import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./ProductEditAllPage.css"
import { Card, Col, Row, Input, Button, Switch, Icon } from 'antd';
import ImageSlider from "../../../utils/ImageSlider"
import CheckboxFilter from '../Sections/CheckboxFilter';
import { Link } from 'react-router-dom';
const {Meta} = Card;

function ProductEditPage() {

    const [products, setProducts] = useState([])
    const [availableValue, setAvailableValue] = useState(false)

    useEffect(() =>{
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
                //console.log(response.data.product)
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

    const handleFilters =(filters)=>{
        if(filters[0] !== -1){
            onAvailableChange();
        }
    }

    const onCardClick =() =>{
        console.log("hi")
    }

    const gridStyle = {
        display: "flex",
        flexDirection: "row",
        width: '100',
        textAlign: 'center',
    };

    //switch available on Card and directly change in database
    const onSwitchAvailable =(index)=>{
        //console.log(event.currentTarget.value)
        let newProducts = [...products];
        newProducts[index].available = !newProducts[index].available;
        setProducts(newProducts);
        const variables ={
            "availabale": newProducts[index].available
        }
        //console.log(variables.availabale)

        Axios.post("/api/product/editProduct/available/" + newProducts[index]._id, variables)
        .then(response =>{
            if(response.data.success){
                //console.log("updated")
            }else{
                alert("Failed to update product data")
            }
        })
    }

    const onDeleteProduct=(index)=>{

        let newProducts = [...products];

        Axios.delete("/api/product/deleteProduct/" + newProducts[index]._id)
        .then(response =>{
            if(response.data.success){
                //console.log("updated")
            }else{
                alert("Failed to delete product data")
            }
        })

        newProducts.splice(index, 1);
        setProducts(newProducts);
    }

    //lg = largeSize; md = mediumSize; xs = smallSize
    const renderCards = products.map((product, index)=>{
        return <Col lg={6} md={12} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
                bordered={true}
                style={product.available ? {border:"5px solid darkgreen", borderRadius:"10px", width:"100%"} :{border:"5px solid red", borderRadius:"10px"}}
            >
                <div style={{display:"flex", flexDirection:"column"}}>
                    <Meta
                        title={<Link style={{ textDecoration: 'none', color:"black"}} to={"/product/edit/" + product._id}>{product.name}</Link>}
                        // description={product.description}
                    >
                    </Meta>
                    <p style={{paddingTop:"20px", marginBottom:"0px"}}>
                        {"Preis: " + product.price}
                    </p>
                    <Button style={{position:"absolute", right:"5px", top: "45px", fontSize:"15px", width:"30px", padding:"0px"}} 
                        onClick={() => onDeleteProduct(products.indexOf(product))}
                    >
                        <Icon type="delete"/>
                    </Button>
                    <Switch style={{position:"absolute", right:"40px", top: "50px"}} checked={products[products.indexOf(product)].available} onChange={() => onSwitchAvailable(products.indexOf(product)) } />
                    
                </div>
            </Card>
        </Col>
    })

    return (
        <div className="div-main-title">
            <div className="div-head">
                <div className="div-title">
                    <h2>Produkte Aktualisieren</h2>
                </div>
            </div>


            {/* Filter  */}
            <CheckboxFilter
                handleFilters={filters => handleFilters(filters)}    
            >

            </CheckboxFilter>
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


        </div>
    )
}

export default ProductEditPage

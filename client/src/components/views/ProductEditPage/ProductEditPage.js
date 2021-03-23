import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./ProductEditPage.css"
import { Card, Col, Row, Input, Button, Switch } from 'antd';
import ImageSlider from "../../utils/ImageSlider"
import CheckboxFilter from './Sections/CheckboxFilter';
import { Link } from 'react-router-dom';
const {Meta} = Card;

function ProductEditPage() {

    const [products, setProducts] = useState([])
    const [availableValue, setAvailableValue] = useState(true)

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

    const handleFilters =(filters, category)=>{
        if(category === "available"){
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

    const onSwitchAvailable =(index)=>{
        //console.log(event.currentTarget.value)
        console.log(index)
        console.log(products[index].available)
        products[index].available = !products[index].available
        console.log(products[index].available)
    }

    //lg = largeSize; md = mediumSize; xs = smallSize
    const renderCards = products.map((product, index)=>{
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                hoverable={true}
                cover={<Link to={"/edit/" + product._id}><ImageSlider images={product.images} /> </Link>}
                bordered={true}
                style={product.available ? {border:"5px solid darkgreen", borderRadius:"10px", width:"100%"} :{border:"5px solid red", borderRadius:"10px"}}
            >
                <div style={{display:"flex", flexDirection:"row"}}>
                    <Meta
                        title={product.name}
                        // description={product.description}
                    >
                    </Meta>
                    
                    <Switch style={{position:"absolute", right:"10px"}} defaultChecked={products[index].available} onChange={() => onSwitchAvailable(index)} />
                </div>
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


            {/* Filter  */}
            <CheckboxFilter
                handleFilters={filters => handleFilters(filters, "available")}    
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

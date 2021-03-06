import React, {useEffect, useState} from 'react'
import Axios from "axios";
import "./ProductViewPage.css"
import { Card, Col, Row, Input, Button } from 'antd';
import ImageSlider from "../../utils/ImageSlider"
import CheckboxFilter from './Sections/CheckboxFilter';
const {Meta} = Card;

function ProductViewPage() {

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

    //lg = largeSize; md = mediumSize; xs = smallSize
    const renderCards = products.map((product, index)=>{
        return <Col lg={6} md={12} xs={24} key={index}>
            <Card
                onClick={onCardClick}
                hoverable={true}
                cover={<ImageSlider images={product.images} />}
                bordered={true}
                style={{border:"5px solid lightgray", borderRadius:"10px"}}
                // style={product.available ? {border:"5px solid darkgreen", borderRadius:"10px"} :{border:"5px solid red", borderRadius:"10px"}}
            >
                <Meta
                    title={product.name}
                    // description={product.description}
                >

                </Meta>
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

export default ProductViewPage

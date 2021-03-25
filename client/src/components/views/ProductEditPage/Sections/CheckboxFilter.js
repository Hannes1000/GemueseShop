import React, { useState } from 'react'
import {Checkbox, Collapse} from "antd"
const {Panel} = Collapse;

//in case to add more filters
const filters = [
    {
        "_id": -1,
        "name": "Nur verfügbare Produkte anzeigen"
    },
    // {
    //     "_id": -1,
    //     "name": "Preis"
    // }
]

function CheckboxFilter(props) {

    const [checked, setChecked] = useState([1])

    const handleToggle =(value)=>{
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked)
    }

    return (
        <div>
            <h3>Filter</h3>
            <Collapse defaultActiveKey={["0"]}>
                <Panel
                    header
                    key="1"
                >
                    {filters.map((value, index) =>(
                        <React.Fragment key={index}>
                            <Checkbox
                                onChange={() => handleToggle(value._id)}
                                type="checkbox"
                                checked={checked.indexOf(value._id) === -1 ? false : true}
                            >
                            <span>{value.name}</span>
                            </Checkbox>
                        </React.Fragment>
                    ))}
                </Panel>
            </Collapse>
            <br></br>
            <br></br>
        </div>
    )
}

export default CheckboxFilter

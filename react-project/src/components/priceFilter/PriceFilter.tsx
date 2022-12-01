import './PriceFilter.css';
import Range from 'rc-slider';
import "rc-slider/assets/index.css";
import React, {useState} from 'react';

export interface Iprops {
	minPrice:number;
    maxPrice:number;
    setMinPrice:(minPrice:number)=>void;
    setMaxPrice:(maxPrice:number)=>void;
}

function PriceFilter(props:Iprops){

    let value = [0,10000000];
    const handleChange = (value:number[]|number) =>{
        if(typeof value === "number"){
            props.setMaxPrice(value)
            props.setMinPrice(0)
        }else{
            console.log(value[0])
            console.log(value[1])
            props.setMaxPrice(value[1])
            props.setMinPrice(value[0])
        }
    }
    return(
        <div style={{width:'50vw'}}>
            <Range
                defaultValue={[0,10000000]}
                value={value}
                onChange={(value)=>handleChange(value)}
                //allowCross={false}
                min={0}
                max={10000000}
                tabIndex={[0,10000000]}
                />
                <p> 최저가: {props.minPrice}</p>
                {
                    (props.maxPrice===10000000)?
                    <p>최고가: {props.maxPrice}+</p>
                    :
                    <p>최고가: {props.maxPrice}</p>
                }
        </div>
    );

}

export default PriceFilter;
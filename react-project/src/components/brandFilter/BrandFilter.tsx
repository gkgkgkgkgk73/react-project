import './BrandFilter.css';
import React, {useState, useEffect} from 'react';
import api, {getBrands, selectAPI,} from '../../store/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';


export interface Iprops {
	brand:string;
    setBrand:(brand:string)=>void
}

const BrandFilter = (props:Iprops) => {
    const dispatch = useDispatch<AppDispatch>();
    const brands = useSelector(selectAPI).brands;
    const [filterOpen, setFilterOpen] = useState(false);
    useEffect(()=>{
            const res = dispatch(getBrands()); 
            console.log(res)
    },[])
    
    return(
        <div>
            <h4 style={{textAlign:'left'}} onClick={()=>setFilterOpen(!filterOpen)}>Brand</h4>
            <div>{filterOpen &&
                    brands.map((i, k)=>{
                        return(
                        <div key={k} style={{display:'flex'}}>
                            <p onClick={()=>{
                                if (props.brand === i.name){
                                    props.setBrand("")
                                }
                                else{
                                props.setBrand(i.name)
                                console.log(props.brand)}
                            }}>{i.name}</p>
                            {(props.brand === i.name) && 
                                <p>적용</p>
                            }
                        </div>
                        );
                    })
                }  
            </div>
        </div>
    );
}

export default BrandFilter;
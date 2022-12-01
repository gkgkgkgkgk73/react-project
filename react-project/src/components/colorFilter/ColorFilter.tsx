import './ColorFilter.css';
import React, {useEffect, useState} from 'react';
import api, {getColors, selectAPI, Color} from '../../store/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export interface Iprops {
	color:string;
    setColor:(color:string)=>void
}

const ColorFilter = (props:Iprops) => {
    const dispatch = useDispatch<AppDispatch>();
    const colors = useSelector(selectAPI).colors;

    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(()=>{
            const res = dispatch(getColors()); 
            console.log(res)
    },[])
    
    return(
        <div>
            <h4 style={{textAlign:'left'}}onClick={()=>setFilterOpen(!filterOpen)}>Color</h4>

            <div>{filterOpen && 
                    colors.map((i, k)=>{
                            return(
                            <div key={k} style={{display:'flex'}}>
                                <p onClick={()=>{
                                    if (props.color === i.name){
                                        props.setColor("")
                                    }
                                    else{
                                    props.setColor(i.name)
                                    console.log(props.color)}
                                }}>{i.name}</p>
                                {(props.color === i.name) && 
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

export default ColorFilter;
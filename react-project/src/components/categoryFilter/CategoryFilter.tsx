import './CategoryFilter.css';
import React, {useEffect, useState} from 'react';
import api, {getColors, selectAPI, Category, getCategories} from '../../store/slices/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export interface Iprops {
	category:number;
    setCategory:(category:number)=>void
}

const CategoryFilter = (props:Iprops) => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector(selectAPI).categories;
    const [filterOpen, setFilterOpen] = useState(false);
    const [rootList, setRootList] = useState<Category[]>([]);
    useEffect(()=>{
            const res = dispatch(getCategories()); 
            console.log(res)
            setRootList(categories.filter((c)=>{

                return c.parent_id===null
            }))
    },[])
    
    return(
        <div>
            <h4 style={{textAlign:'left'}} onClick={()=>setFilterOpen(!filterOpen)}>Category</h4>
            <div>{filterOpen && 
                    rootList.map((i,k)=>{
                        return (
                            <div>
                        <div key={k} style={{display:'flex'}}>
                            <p onClick={()=>{
                                if (props.category === i.id){
                                    props.setCategory(0)
                                }
                                else{
                                props.setCategory(i.id)
                                console.log(props.category)
                                }
                            }}>{i.name}</p>
                            {(props.category === i.id) && 
                                <p>적용</p>
                            }
                        </div>
                            {categories.filter((c)=>{
                                return (
                                    c.parent_id === i.id
                                )
                            }).map((child, key)=>{
                                return(
                                    <div key={key} style={{paddingLeft:'20px', display:'flex'}}>
                                <p onClick={()=>{
                                    props.setCategory(child.id)
                                    console.log(props.category)
                                }}>{child.name}</p>
                                {(props.category === child.id) && 
                                    <p>적용</p>
                                }
                            </div>
                            )
                        })}
                        </div>)
                    })
                    
                }  
            </div>
        </div>
    );
}
export default CategoryFilter;
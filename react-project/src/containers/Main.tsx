import './Main.css';
import ColorFilter from '../components/colorFilter/ColorFilter';
import BrandFilter from '../components/brandFilter/BrandFilter';
import CategoryFilter from '../components/categoryFilter/CategoryFilter';
import PriceFilter from '../components/priceFilter/PriceFilter';
import {apiSlice, getBrands, getCategories, getColors, getProducts, selectAPI} from '../store/slices/api';
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSelector } from 'react-redux';
import ProductInfo from '../components/productInfo/ProductInfo';
import Pagination from 'react-js-pagination';

function Main(){
    const dispatch = useDispatch<AppDispatch>();
    const [color, setColor] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000000);
    const products = useSelector(selectAPI).products;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page:number) => {
        setCurrentPage(page);
    }
    useEffect(()=>{

        const res = dispatch(getProducts({
            page: currentPage, //요청 페이지 번호, 미입력시 1페이지 기준 응답
            color: color, //색상명
            maxPrice: maxPrice, //최고 가격
            minPrice: minPrice, //최저 가격
            brand: brand, //브랜드명
            categoryId: category//category //카테고리 번호
        }))
        console.log(res)
        console.log(color)
        setCurrentPage(1)

    },[color, brand, category, minPrice, maxPrice])
    useEffect(()=>{

        const res = dispatch(getProducts({
            page: currentPage, //요청 페이지 번호, 미입력시 1페이지 기준 응답
            color: color, //색상명
            maxPrice: maxPrice, //최고 가격
            minPrice: minPrice, //최저 가격
            brand: brand, //브랜드명
            categoryId: category//category //카테고리 번호
        }))
        console.log(res)
        console.log(color)

    },[currentPage])

    return(
        <div>
            <div style={{display:'flex'}}>
                <ColorFilter color = {color} setColor={setColor}/>
                <BrandFilter brand = {brand} setBrand={setBrand}/>
                <CategoryFilter category= {category} setCategory={setCategory}/>
                <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}/>
            </div>
            <div
            style={{
                //margin: "50px",
                //padding: "50px",
                width: "100vw",
                display: "grid",
                gridTemplateRows: "1fr 1fr 1fr 1fr",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              }}
            >
            {products.products.map((i,k)=>{
                return (
                    <div key={k}
                        style={{
                            width:'20vw',
                            height:'30vw'
                        }}>
                        <ProductInfo thumnail={i.image}
                        brand={i.brand}
                        name={i.name}
                        price={i.sales_price}
                        salerate={i.original_price/i.sales_price}/>
                    </div>
                );
            })}
            </div>
            <Pagination
                
                activePage={currentPage}
                itemsCountPerPage={20}
                totalItemsCount={products.total}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={handlePageChange}
            />
        </div>

    );
}

export default Main;
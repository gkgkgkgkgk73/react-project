import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "..";

export interface APIState {
    queryParams: QueryParams | null;
	products:Products;
    categories:Category[];
    brands:Brand[];
    colors:Color[];
}

const initialState: APIState = {
	queryParams: null,
	products:{
        products:[],
        total:0
    },
    categories:[],
    brands:[],
    colors:[]
};


export interface QueryParams {
    page?:number; //요청 페이지 번호, 미입력시 1페이지 기준 응답
    color?: string; //색상명
    maxPrice?: number; //최고 가격
    minPrice?: number; //최저 가격
    brand?: string; //브랜드명
    categoryId?: number; //카테고리 번호
}

export interface Product{
    id: number; //상품 고유번호
    name: string; //상품명
    image: string; //상품 이미지 url
    category_id: number; //카테고리 번호
    brand: string; //브랜드명
    color: string; //색상명 ex) 'black'
    original_price: number; //정가
    sales_price: number; //판매가
    retailer_id: number;
}

export interface Products {
    products: Product[];
    total: number; //요청 조건에 맞는 전체 상품 수
}

export interface Category{
        id: number; //해당 카테고리의 id입니다.
        parent_id: number; //상위 카테고리의 id입니다. null인 경우 root 카테고리입니다.
        name: string; //카테고리명입니다.
    }
    
export interface Brand{
        name: string; //브랜드 이름입니다.
    }

export interface Color{
        name: string;
    }

export const getProducts = createAsyncThunk("/api/getProducts/",
    async (queryParams:QueryParams,) => {
        console.log("query..")
        console.log(queryParams)
        if(queryParams.brand===""){
            delete queryParams.brand;
        }
        if(queryParams.categoryId===0){
            delete queryParams.categoryId
        }
        if(queryParams.color===""){
            delete queryParams.color
        }
        if(queryParams.maxPrice===10000000){
            delete queryParams.maxPrice
        }
        if(queryParams.minPrice===0){
            delete queryParams.minPrice
        }
        if(queryParams.page===1){
            delete queryParams.page
        }
        const res = await axios.get<Products>(process.env.REACT_APP_PRODUCT,{params:queryParams});
        console.log(res.data)
        return res.data;
    }    
);

export const getCategories = createAsyncThunk("/api/getCategories/",
    async () => {
        const res = await axios.get<Category[]>(process.env.REACT_APP_CATEGORIES);
        console.log(res.data)
        return res.data;
    }    
);

export const getBrands = createAsyncThunk("/api/getBrands/",
    async () => {
        const res = await axios.get<Brand[]>(process.env.REACT_APP_BRANDS);
        console.log(res.data)
        return res.data;
    }    
);

export const getColors = createAsyncThunk("/api/getColors/",
    async () => {
        const res = await axios.get<Color[]>(process.env.REACT_APP_COLORS);
        console.log(res.data)
        return res.data;
    }    
);

export const apiSlice = createSlice({
	name: "api",
	initialState,
	reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getProducts.fulfilled, (state:APIState, action:PayloadAction<Products>) => {
                state.products = action.payload;
            });
            builder.addCase(getBrands.fulfilled, (state:APIState, action:PayloadAction<Brand[]>) => {
                state.brands = action.payload;
            });
            builder.addCase(getColors.fulfilled, (state:APIState, action:PayloadAction<Color[]>) => {
                state.colors = action.payload;
            });
            builder.addCase(getCategories.fulfilled, (state:APIState, action:PayloadAction<Category[]>) => {
                state.categories = action.payload;
            })
        },
});

export const apiActions = apiSlice.actions;
export const selectAPI = (state: RootState) => state.api;
export default apiSlice.reducer;
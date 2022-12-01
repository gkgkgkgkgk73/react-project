import './ProductInfo.css';

export interface Iprops {
	thumnail: string; //이미지 주소
    brand: string; //브랜드명
    name: string; //상품명
    price: number; //판매가
    salerate: number; //정가 대비 판매가
}

function ProductInfo(props:Iprops){

    return(
        <div>
            <img src={props.thumnail} height={'100vh'} width={'100vw'}/>
            <p>브랜드명: {props.brand}</p>
            <p>상품명: {props.name}</p>
            <p>판매가: {props.price}원</p>
            <p>할인율: {props.salerate}%</p>
        </div>
    );
}

export default ProductInfo;
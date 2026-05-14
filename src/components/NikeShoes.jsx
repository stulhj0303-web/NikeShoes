import "./NikeShoes.css";

function NikeShoes({ shoes, isLoggedIn, onMembership, onOpenPopup}) {

    const memberPrice = shoes.price*0.9;

    return(
        <div className="shoes-card">
            <div className="img-box" onClick={()=>onOpenPopup(shoes)}>
                <img src={shoes.imgUrl} alt={shoes.name} className="shoes-img"/>
                <div className="hover-overlay"><p>자세히 보기</p></div>
            </div>
            <div className="info-box">
                <p className="shoes-state">{shoes.state}</p>
                <p className="shoes-name">{shoes.name}</p>
                <p className="shoes-type">{shoes.type}</p>
                <div className="price-area">
                    {isLoggedIn ? (
                        <>
                        <span className="sale-color">
                            {memberPrice.toLocaleString()}원
                        </span>
                           
                        <span className="member-price">                     
                            <span className="original-price strike">{shoes.price.toLocaleString()}원
                        </span>
                        <span className="sale-tag">10% 할인</span>
                                
                            </span>
                        </>
                    ):(
                        <>
                            <span className="original-price">{shoes.price.toLocaleString()}원</span>
                            <button className="membership-sale-btn" onClick={onMembership}>나이키 회원할인</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NikeShoes;
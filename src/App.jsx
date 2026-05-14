import { useState, useEffect,} from "react";
import NikeShoes from "./components/NikeShoes";
import "./App.css";

import logo from './assets/nike-logo.png';

function App(){

  const [currentView, setCurrentView] = useState("home");
  const [selectedShoes, setSelectedShoes] = useState(null);

  const savedUserDB = localStorage.getItem("userDB");
  const initialUserDB = savedUserDB ? JSON.parse(savedUserDB) : [
    {id: "admin", pw: "1234", name: "관리자"},
    {id: "hajin", pw: "1234", name: "하진"}
  ];

  const [userDB, setUserDB] = useState(initialUserDB);

  const storedShoes = localStorage.getItem("shoes");
  const initialShoes = storedShoes ? JSON.parse(storedShoes) : [
    {
      id: 1,
      state: "품절",
      name: "나이키 P-6000 스웨이드",
      type: "남성 신발",
      price: 149000,
      imgUrl: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/478a35f5-e35a-4292-808c-1e85f60f66d1/NIKE+P-6000+SE.png"
    },
    {
      id: 2,
      state: "베스트셀러",
      name: "나이키 에어 포스 1'07",
      type: "남녀 공용",
      price: 159000,
      imgUrl: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3989822d-5079-4b58-95cc-d884a12d5be8/W+AIR+FORCE+1+%2707.png"
    },
    {
      id: 3,
      name: "나이키 V5 RNR",
      type: "주니어 신발",
      price: 99000,
      imgUrl: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7c0b3bf7-b881-448e-b726-6a67bf2d67c4/NIKE+V5+RNR+BG.png"
    }
  ];

  const [shoesN, setShoesN] = useState(initialShoes);

  const savedLoginUser = localStorage.getItem("loggedInUser");
  const initialLoginUser = savedLoginUser ? JSON.parse(savedLoginUser) : null;
  const [loggedInUser, setLoggedInUser] = useState(initialLoginUser);

  useEffect(() => {
    localStorage.setItem("shoesN", JSON.stringify(shoesN));
  }, [shoesN]);

  useEffect(() => {
    if(loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }else{
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputName, setInputName] = useState("");

  const [newShoesState, setNewShoesState] = useState("");
  const [newShoesType, setNewShoesType] = useState("");
  const [newShoesName, setNewShoesName] = useState("");
  const [newShoesPrice, setNewShoesPrice] = useState("");
  const [newShoesImg, setNewShoesImg] = useState("");

  const handleSignup = () =>{
    if(!inputId || !inputPw || !inputName){
      return alert("정보를 모두 입력해주세요.");
    }
    if(userDB.find((u) => u.id === inputId)) {
      return alert("이미 존재하는 아이디입니다.")
    }

    setUserDB([...userDB, {id: inputId, pw:inputPw, name:inputName}]);
    alert("가입 완료! 로그인을 진행해주세요.");

    setInputId("");
    setInputPw("");
    setInputName("");
    setCurrentView("login");
  };

  const handleLogin = () =>{
    const user = userDB.find((u) => u.id === inputId && u.pw === inputPw);
    if(user) {
      setLoggedInUser(user);
      setInputId("");
      setInputPw("");

      if(user.id === "admin"){
        setCurrentView("admin");
      }else{
        setCurrentView("home");
      }
    }else{
      alert("아이디 또는 비밀번호가 틀렸습니다.")
    }
  };

  const handleMembershipLogin = () =>{
    alert("회원특가를 보시려면 로그인을 해주세요!")
    setCurrentView("login");
  };

  const handleAddShoes = () =>{
    if(!newShoesName || !newShoesPrice || !newShoesType){
      return alert("상품명, 가격, 종류를 모두 입력해주세요!");
    }

    const newShoes = {
      id:Date.now(),
      name: newShoesName,
      price: Number(newShoesPrice),
      imgUrl: newShoesImg,
      type: newShoesType,
      state: newShoesState
    };

    setShoesN([...shoesN, newShoes]);
    alert("새 상품이 등록되었습니다!");

    setNewShoesImg("");
    setNewShoesState("");
    setNewShoesType("");
    setNewShoesName("");
    setNewShoesPrice("");
  };

  const handleDeleteShoes = (targetId) => {
    setShoesN(shoesN.filter((p) => p.id !== targetId));
  };

  const openPopup = (shoes) => {
    setSelectedShoes(shoes);
  };

  const closePopup = () =>{
    setSelectedShoes(null);
  };

  return(
    <div className="app-wrap">
      <header className="nike-header">
        <img src={logo} onClick={() => setCurrentView("home")}/>
        <nav className="top-nav">
          <span className="nav-item" onClick={() => setCurrentView("home")} style={{ marginRight: '18px' }}>SHOES</span>

          {loggedInUser?.id === "admin" && (
            <span className="nav-item admin-tag" onClick={() => setCurrentView("admin")} style={{ marginRight: '18px' }}> 상품 관리 </span>
          )}

          {loggedInUser ? (
            <span className="nav-item" onClick={() => {setLoggedInUser(null); setCurrentView("home");}}> LOGOUT</span>
          ) : (
            <span className="nav-item" onClick={() => setCurrentView("login")}> LOGIN</span>
          )}
        </nav>
      </header>
        
        <main className="main-content">
          {currentView === "home" && (
            <div className="home-view">
              <h2 className="section-title" >SHOES</h2>
              <div className="shoes-grid">
                {shoesN.map((shoes) => (
                  <NikeShoes key={shoes.id} shoes={shoes} isLoggedIn={loggedInUser !== null} onMembership = {handleMembershipLogin} onOpenPopup={openPopup}/>
                ))}
              </div>
            </div>
          )}

          {currentView === "login" && (
            <div className="auth-container">
             <h2 className="auth-title">로그인</h2>
              <div className="auth-content">
                <input type="text" placeholder="ID" value={inputId} onChange={(e)=>setInputId(e.target.value)} className="auth-input"/>
                <input type="password" placeholder="PASSWORD" value={inputPw} onChange={(e)=>setInputPw(e.target.value)} className="auth-input"/>
                <button className="auth-btn" onClick={handleLogin}>SIGN IN</button>
                <div className="sign-up">
                  아직 회원이 아니신가요?
                  <button className="auth-signup" onClick={() => setCurrentView("signup")}>회원가입</button>
                </div>
              </div>
            </div>
          )}

          {currentView === "signup" && (
            <div className="auth-container">
              <h2 className="auth-title">나이키 멤버 되기</h2>
              <div className="auth-content">
                <input type="text" placeholder="ID" value={inputId} onChange={(e)=>setInputId(e.target.value)} className="auth-input"/>
                <input type="password" placeholder="PASSWORD" value={inputPw} onChange={(e)=>setInputPw(e.target.value)} className="auth-input"/>
                <input type="text" placeholder="NAME" value={inputName} onChange={(e)=>setInputName(e.target.value)} className="auth-input"/>
                <button className="auth-btn black" onClick={handleSignup}>SIGN UP</button>
                <div className="sign-up">
                  이미 아이디가 있으신가요?
                  <button className="auth-signup" onClick={() => setCurrentView("login")}>로그인</button>
                </div>
              </div>
            </div>
          )}

          {currentView === "admin" && loggedInUser?.id === "admin" && (
            <div className="admin-container">
              
              <h3>상품 등록</h3>
              <div className="admin-input-box">
                <input type="text" placeholder="상품명" value={newShoesName} onChange={(e)=> setNewShoesName(e.target.value)} className="input-url"/>
                <div className="admin-input-box1">
                  <input type="text" placeholder="종류" value={newShoesType} onChange={(e)=> setNewShoesType(e.target.value)}/>
                  <input type="number" placeholder="가격(원)" value={newShoesPrice} onChange={(e)=> setNewShoesPrice(e.target.value)}/>
                </div>
                <input type="text" placeholder="이미지 URL 주소" value={newShoesImg} onChange={(e)=> setNewShoesImg(e.target.value)} className="input-url"/>
                <button className="add-shoes-btn" onClick={handleAddShoes}>Add</button>
              </div>

              <div className="admin-list-box">
                <h3>상품 관리</h3>
                <div className="admin-list-box1">
                  {shoesN.map((shoes) => (
                    <div className="admin-list-item" key={shoes.id}>
                      <img src={shoes.imgUrl} />
                      <span>{shoes.name} ({shoes.price.toLocaleString()}원)</span>
                      <button onClick={() => handleDeleteShoes(shoes.id)}>삭제</button>
                    </div>
                  ))}
                </div>
            </div>
            </div>
          )}
        </main>

        {selectedShoes && (
          <div className="modal-overlay" onClick={closePopup}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closePopup}>X</button>
              <img src={selectedShoes.imgUrl} alt={selectedShoes.name} className="modal-img"/>
              <div className="modal-info">
                <h2>{selectedShoes.name}</h2>
                <p className="modal-type">{selectedShoes.type}</p>
                {loggedInUser ? (
                  <p className="modal-price sale">
                    할인가: {(selectedShoes.price*0.9).toLocaleString()}원
                  </p>
                ):(
                  <p className="modal-price">
                    정가: {selectedShoes.price.toLocaleString()}원
                  </p>
                )}
                <button className="buy-final-btn">
                  구매
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default App;
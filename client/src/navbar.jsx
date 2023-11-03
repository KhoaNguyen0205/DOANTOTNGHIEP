/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "./userContext";


export default function Navbar() {

    const [menu,setMenu] = useState(false);
    const {user} =useContext(UserContext)

    function showMenu() {
        setMenu(true);
    }
    function hideMenu() {
        setMenu(false);
    }
    return(
        <>
        <div className="nav-bar">
            <div className="Contact">
                <Link to={'https://www.facebook.com/nho0205/' }target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 
                    226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 
                    27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 
                    38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
                </Link>

                <Link to={'https://www.instagram.com/ngocc_khoaa/'} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 
                    114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 
                    74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 
                    0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 
                    27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 
                    1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 
                    93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 
                    36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 
                    9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 
                    9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 
                    42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 
                    8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 
                    176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 
                    17.1-54 17.1-76.8 0L0 176z"/>
                    </svg><h6>ngockhoa2k2@gmail.com</h6>
            </div>
            <Link to={'/'} className="name">
                <img src="Images/name.png" alt="" />
            </Link>
            
            {user ? (
                <div className="acc-option">
                    <button>{user.name}</button>
                </div>
            ):(
                <div className="acc-option">
                  <Link to={'/login'}>
                    <button>Login</button>
                  </Link>
                </div>
            )}

        </div>

        <div className="side-bar">
            <div>
                {!menu ? (
                    <button onClick={showMenu}>MENU</button>
                ): (
                    <button onClick={hideMenu}>HIDE</button>
                )} 
            </div>
            <div>
                <svg onClick={'#'}
                     xmlns="http://www.w3.org/2000/svg" 
                     height="1em"  
                     viewBox="0 0 512 512">
                     <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 
                            177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 
                            53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 
                            256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 
                            15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 
                            37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 
                            24.14 4.54 17.09 15.62z"/>
                </svg>
            </div>
        </div>
        {menu && (
            <div className="menu">
                
                <Link to={'/personal'}><button>Personal</button></Link>
                
                <button>
                       <svg xmlns="http://www.w3.org/2000/svg" height="3vh" width="3vh" fill="red" 
                            viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24
                             0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 
                             152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 
                             23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 
                             0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 
                             0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 
                             0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                       </svg>Cart
                </button>
                <button>
                       <svg xmlns="http://www.w3.org/2000/svg" 
                            height="1em" viewBox="0 0 640 512 "fill="green">
                            <path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 
                            96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 
                            32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 
                            114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 
                            160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 
                            1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                        Delivery
                </button>
                <button>Nike</button>
                <button>Adidas</button>
                <button>Puma</button>
            </div>
        )}


        </>
    )
}
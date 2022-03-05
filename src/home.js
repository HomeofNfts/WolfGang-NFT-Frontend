import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { useDispatch, useSelector } from "react-redux";
import { connectM } from "./redux/blockchain/blockchainActions";
import { fetchDataM } from "./redux/data/dataActions";
import "./image/hero.gif";
import './styles/home.css';
import { Image } from "./data"

const home = () => {
  return (
    <div className="homeContainer">
    <div className="intro">
    <img src="https://i.ibb.co/dpGjR2C/wolfemoji.png" alt="" className="wolf" />
    <p className="h1">WolfGang NFT</p>
    </div>
    <div className="hero">
    <div className="svgcont">
        <img src="https://i.ibb.co/bRbS9Yg/welcome.png" alt="" className="heroimg" />
    </div>
    <div className="herotext">

    <p className="h2">Mint and Stake WolfGang to earn Wolf Tokens</p>
    <div className="text">
    <p>Mint WolfGang at a price of 0.1 BNB</p>
    <p>Stake your WolfGang NFT to earn passive income earn cool WOLF Tokens</p>
    </div>
    <Link className="button" to="/mint"><p className="h3">Join The Gang</p></Link>
    </div>
    </div>
    <div>
    <h1 className="container">Mint WolfGang</h1>
        <div className="carousel">
        <div className="image-list">
                {Image.map ((item) => (
                <img key={item.id} src={item.img} className="caroimg" />
                ))}
            </div>
        </div>
    </div>
    <div className="link">
    <Link className="stake" to="/stake">Stake</Link>
    <Link className="mint" to="/mint">Mint</Link>
    </div>
    <div className="footer">Made with  <img src="https://i.ibb.co/44ZjM2B/pngwing-com.png" alt="pngwing-com" className="love"/> WolfGang Team</div>
        {/* <li className="mintbox" onClick={(e) => {
                    e.preventDefault();
                    dispatch(connectM());
                }}>
                <Link to="/mint">MINT</Link>
                </li> */}

    </div>
  )
}

export default home
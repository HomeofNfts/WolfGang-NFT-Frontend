import { HashLink as Link } from 'react-router-hash-link'
import { useDispatch, useSelector } from "react-redux";
import { connectM } from "./redux/blockchain/blockchainActions";
import { fetchDataM } from "./redux/data/dataActions";

import "./styles/navbar.css"
const Navbar = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
        dispatch(fetchDataM(blockchain.account));
        }
    };

    getData();

    
    
    return (
        <nav className="nav-wrap">
            <ul>
            <Link className="logo" to="/"><img src="https://i.ibb.co/dpGjR2C/wolfemoji.png" width="63" height="60"/></Link>
             <li className="mintbox" onClick={(e) => {
                    e.preventDefault();
                    dispatch(connectM());
                }}>
                <Link to="/mint">MINT</Link>
                </li>
                <li className="stakebox"><Link to="/staking">STAKE</Link></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;

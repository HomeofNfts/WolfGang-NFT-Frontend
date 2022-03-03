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
            <div className="logo"><img src="https://i.ibb.co/BLz05gQ/image.png" width="63" height="60"/></div>
             <li className="mintbox" onClick={(e) => {
                    e.preventDefault();
                    dispatch(connectM());
                }}>
                <Link to="/">MINT</Link>
                </li>
                <li className="stakebox"><Link to="/staking">STAKE</Link></li>
            </ul>
        </nav>
    );
}
 
export default Navbar;

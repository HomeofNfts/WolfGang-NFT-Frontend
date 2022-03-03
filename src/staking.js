import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectM } from "./redux/blockchain/blockchainActions";
import { connect, isConnected } from "./redux/stakeBlockchain/blockchainActions";
import { fetchData, balance, rewards} from "./redux/stakeData/dataActions";
import {fetchDataM, hasApproved } from "./redux/data/dataActions2";

import "./styles/stake.css";

const Staking = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState("STAKE");
    const [claiming, setClaiming] = useState(false)
    const [staking, setStaking] = useState(false);
    const [unstaking, setUnstaking] = useState(false);
    const [hasStaked, setHasStaked] = useState(false);
    const [_stake, _unStake] = useState("STAKE");
    const account = blockchain.account;
    const [tokenId, setTokenId] = useState([]);
    const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
    useEffect(()=>{
        dispatch(connectM())
        
    },[])

    useEffect(()=>{
        setTimeout(() => {
            hasApproved ? dispatch(connect()) : dispatch(connectM())
        }, 3000);
    },[])
    const getConfig = async () => {
    const configResponse = await fetch("/stakeConfig/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
        SET_CONFIG(config);
    };
    const getDataM = () => {
        if (account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchDataM())
        }
    };
    const getData = () => {
        if (account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData())
        }
    };
    useEffect(() => {
        getConfig();
    }, []);
    useEffect(() => {
        getDataM();
        getData();
    }, [account]);

    const stake = (tokenId) => {
        setStaking(true);
        setFeedback("BUSY")
        dispatch(connect())
        blockchain.smartContract.methods.stakeByIds([tokenId])
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setStaking(false)
            })
            .then((Response)=>{
                setStaking(false)
            })
        
        setFeedback("STAKE")   
    }


    const unStake = async (tokenId) => {
        setUnstaking(true)
        dispatch(connect())
        blockchain.smartContract.methods.unstakeByIds([tokenId])
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setUnstaking(false)
            })
            .then((Response)=>{
                setUnstaking(false)
            })
    }

    const unstakeAll = () => {
        setUnstaking(true)
        dispatch(connect())
        blockchain.smartContract.methods.unstakeAll()
            .send({
                to: CONFIG.CONTRACT_ADDRESS,
                from: account
            })
            .once("error", (err) => {
                console.log(err)
                setUnstaking(false)
            })
            .then((Response)=>{
                setUnstaking(false)
            })                
    }
    
    const approve = async () => {
        dispatch(connectM());
        await blockchain.smartContract.methods
        .setApprovalForAll(CONFIG.CONTRACT_ADDRESS, true)
        .send({
            to: CONFIG.CONTRACT_ADDRESS,
            from: account
        })
        dispatch(connect())
    }

    const claim = async (tokenId) => {
        setClaiming(true)
        dispatch(connect())
        await blockchain.smartContract.methods.claimAll()
        .send({
            to: CONFIG.CONTRACT_ADDRESS,
            from: account
        })
            .once("error", (err) => {
                console.log(err)
                setClaiming(false)
            })
            .then((Response)=>{
                setClaiming(false)
            })
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setTokenId(parseInt(e.target.value.split(" ")));
    }

    return ( 
        <main className="stake-app">
            <h1 style={{color: "#ff5722"}}>STAKE</h1>
            <h2>Stake WOLFGANG NFT($WOLF) to earn WOLF TOKEN($WOLF)</h2>
            <h2>
                {staking ? "staking.." : ""}
                {unstaking ? "unstaking.." : ""}
                {claiming ? "claiming.." : ""}
            </h2>
            {/* <button 
                className="connect-btn"
                onClick={(e)=>{
                    !isConnected ?
                    dispatch(connectM())
                    : e.preventDefault()
                } }
            >
                {!isConnected ? "CONNECT WALLET" : account.slice(0, 10)}
            </button> */}
            <div className="card-container">
                <div>
                    <div>
                        <p>Stake WOLFGANG NFT</p>
                        <p>Earn WOLF</p>
                    </div>
                    <blockquote className="reward"><span>BALANCE</span>
                    {' '}
                    {balance / 10 ** 18}
                    {' '}$WOLF
                    </blockquote>
                     <blockquote className="reward"><span>REWARDS</span>
                    {' '}
                    {rewards / 10 ** 18}
                    {' '}$WOLF
                    </blockquote>
                    <form className="form" onChange={handleChange}>
                       <input
                            type="all"
                            placeholder="Enter TokenId"
                            className=""
                            required
                        />
                        <button 
                            className="btn stake-btn" 
                            onClick={hasApproved ? (e) => {
                                e.preventDefault()
                                stake(tokenId)
                                } : 
                                (e) => {
                                e.preventDefault()
                                approve(tokenId)
                                }}
                                >
                            {hasApproved ? "STAKE" : "APPROVE"}
                        </button>
                    </form>
                    <form className="form" onChange={handleChange}>
                        <input
                            type="all"
                            placeholder="Enter TokenId"
                            className=""
                            required
                        />
                        <button 
                            className="btn stake-btn" 
                            onClick={(e)=> {
                                e.preventDefault()
                                unStake(tokenId)
                            }}>
                            UNSTAKE
                        </button>
                    </form>
                    <div>
                        <button 
                            className="btn"
                            onClick={claim}>
                            CLAIM TT
                        </button>
                    </div>
                    <div className="">
                        <button 
                            className="btn mb-5"
                            onClick={unstakeAll}>
                            UNSTAKE ALL
                        </button>
                    </div>
                </div>
                
            </div>
        </main>
    );
}
export default Staking ;
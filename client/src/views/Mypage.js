/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState,useEffect } from "react";


// reactstrap components
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import "../assets/css/custermized.css";
import tempImg from "../assets/img/bg1.jpg";
import details from "components/details/details.js";
import Web3 from 'web3';
import { getMetaMask, getKaikas } from '../models/getWallet';
import axios from "axios";
const myPage = () => {
	const [web3, setWeb3] = useState();
  const [account, setAccount] = useState();
  useEffect(async() => {
		if (typeof window.ethereum !== 'undefined') {
			// window.ethereum이 있다면
			try {
				const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
				setWeb3(web);
        const account = getMetaMask();
       await account.then((res=>{
        setAccount(res);
    axios.post('https://mttm1.herokuapp.com/mypage',{
    account:res
  }).then((res)=>{
    console.log(res);
    setNFTList(res.data)
  })

       }))
      

       
			} catch (err) {
				console.log(err);
			}
		}
	}, []);

  
 
  

 
  //  console.log(NFTList);

  const [type, setType] = useState("all");
  const [chain, setChain] = useState("all");
  const [option, setOption] = useState("htl");//high to low
  const blockChainList = ["Ethereum", "Klaytn"];
  const ethereumTypeList = ["ERC-721", "ERC-1155"];
  const klaytnTypeList = ["KIP-17"];
  const [NFTList, setNFTList] = useState([]
  );
  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">My Page</h2>
            <p className="category">
              {account}
            </p>
          </div>
        }
      />


      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              <Row>
                <Col md={6} />
                <Col md={3}>
                  <div className="item-element width-full">
                    <select name="blockchain" value={chain} onChange={(e) => setChain(e.target.value)} className="element-input sort-list width-full" >
                      <option value="all" selected>Block Chain </option>
                      {blockChainList.map((el, index) => {
                        return <option key={index} value={el}>{el}</option>
                      })}
                    </select>
                  </div>

                </Col>
                <Col md={3}>

                  <div className="item-element width-full">
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="element-input sort-list width-full" >

                      {chain === "" ? <option value=""> </option> :
                        chain === "Ethereum" ? ethereumTypeList.map((el, index) => {
                          return <option key={index} value={el}>{el}</option>
                        })
                          :
                          chain === "Klaytn" ?
                            klaytnTypeList.map((el, index) => {
                              return <option key={index} value={el}>{el}</option>
                            })
                            : <option value="all">Type</option>
                      }
                    </select>
                  </div>
                </Col>

              </Row>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {
                NFTList.map((el, index) => {
                  return <Col md={3} >
                    <Card className="padding-none">
                      <CardHeader>
                        <CardBody className="padding-none">
                          <img src={el.data.metadata.imgURI} alt="no img" className="nft-market-img" />
                          <div className="nft-market-item">
                            <div>
                              <label>Name:&nbsp;</label>{el.data.metadata.name}
                            </div>
                            <div>
                              <label>TokenId:&nbsp;</label>{el.data.tokenId}
                            </div>
                            <div>
                              <label>Price:&nbsp;</label>{el.data.metadata.price} eth

                            </div>
                            <div className="main-btn-set">
                              <div className="main-btn-set-element main-btn-set-element-rightspace">
                                <input type="button" value="Detail" className="element-btn" onClick={(e) => {
                                    e.preventDefault();
                                   return details(el);
                                }} />
                              </div>

                              <div className="main-btn-set-element">
                                <input type="button" value="Sale" className="element-btn" onClick={(e) => {
                                  e.preventDefault();

                                }} />
                              </div>

                            </div>


                          </div>
                        </CardBody>
                      </CardHeader>
                    </Card>
                  </Col>
                })
              }


            </Row>


          </CardBody>
        </Card>
      </div>

    </>
  );
}

export default myPage;

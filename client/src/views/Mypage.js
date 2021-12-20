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
import React, { useState, useLayoutEffect } from "react";


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
import details from "components/details/details.js";
import "../assets/css/custermized.css";
import tempImg from "../assets/img/bg1.jpg";
import { getMetaMask, getKaikas } from "../models/getWallet";
const myPage = () => {
  const [type, setType] = useState("all");
  const [chain, setChain] = useState("all");
  const [accountAddress, setAddress] = useState("");
  const blockChainList = ["Ethereum", "Klaytn"];
  const ethereumTypeList = ["ERC-721", "ERC-1155"];
  const klaytnTypeList = ["KIP-17"];
  const [NFTList, setNFTList] = useState([
    { name: "nft1", img: tempImg, address: "0x1234" },
    { name: "nft2", img: tempImg },
    { name: "nft3", img: tempImg },
    { name: "nft4", img: tempImg },
    { name: "nft5", img: tempImg },
    { name: "nft6", img: tempImg }]
  );


  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">My Page</h2>
            <p className="category">
              {accountAddress}
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
                  return <Col md={3} key={index} >
                    <Card className="padding-none">
                      <CardHeader>
                        <CardBody className="padding-none">
                          <img src={el.img} alt="no img" className="nft-market-img" />
                          <div className="nft-market-item">
                            <div>
                              <label>Name:&nbsp;</label>{el.name}
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

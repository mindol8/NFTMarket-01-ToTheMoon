import React, { useState, useEffect } from "react";


// reactstrap components
import {
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Row,
  Col

} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import details from "components/details/details.js";
import pay from "../models/pay/index.js";
import "../assets/css/custermized.css";
import tempImg from "../assets/img/bg1.jpg";
import { getContract, ownerOfToken, transferToken } from "../models/create/erc721/index.js";
import { getMetaMask, getKaikas } from "../models/getWallet";
import axios from "axios";
const mainPage = () => {
  const [type, setType] = useState("all");
  const [chain, setChain] = useState("all");
  const [option, setOption] = useState("htl");//high to low
  const blockChainList = ["Ethereum", "Klaytn"];
  const ethereumTypeList = ["ERC-721", "ERC-1155"];
  const klaytnTypeList = ["KIP-17"];
  const [nft, setNft] = useState([]);
  useEffect(() => {
    axios.get('https://mttm1.herokuapp.com/Main')
      .then((res) => {
        setNft(res.data)
      })
  }, []);

  const buyNFT = async (tokenId, owner, price) => {
    console.log(tokenId, owner, price);
    const account = await getMetaMask();
    const tokenContract = getContract();
    const ownerOfNFT = String(await ownerOfToken(tokenId, account, tokenContract)).toLowerCase();
    console.log(ownerOfNFT)
    if (ownerOfNFT === tokenContract.utils.toChecksumAddress(account)) {
      alert("본인 소유 NFT는 구매하실 수 없습니다.");
    } else {
      if (ownerOfNFT === owner) {
        if (!await pay(owner, account, price)) {
          alert("송금에 실패했습니다.");
          return;
        }
        const transfer = await transferToken(account, owner, tokenId, tokenContract);
        if (transfer) {
          alert("성공적으로 구매 했습니다.");
          //metadata 수정
        } else {
          alert("구매 실패 했습니다.");
        }
      } else {
        alert("이미 판매가 완료된 NFT입니다.");
      }
    }

  }
  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h2 className="title">To The Moon</h2>
            <p className="category">
              NFT Market
            </p>
          </div>
        }
      />
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              <Row>
                <Col md={3}>

                </Col>

                <Col md={3}>
                  <div className="item-element width-full">
                    <select name="blockchain" value={chain} onChange={(e) => setChain(e.target.value)} className="element-input sort-list width-full" >
                      <option defaultValue="all">Block Chain </option>
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
                <Col md={3}>
                  <div className="item-element width-full">
                    <select name="blockchain" value={option} onChange={(e) => setOption(e.target.value)} className="element-input sort-list width-full" >
                      <option value="htl">Price: high to low </option>
                      <option value="lth">Price: low to high</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              {
                nft.map((el, index) => {
                  return <Col md={3} key={index}>
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
                                <input type="button" value="BUY" className="element-btn" onClick={(e) => {
                                  e.preventDefault();
                                  return buyNFT(el.data.tokenId, el.data.account, el.data.metadata.price);
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

export default mainPage;

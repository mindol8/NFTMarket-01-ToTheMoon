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
* Customized by mindol8
*/
import React, { useEffect, useRef, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardBody } from "reactstrap";
import fileImg from "../assets/img/create-insert-file.jpg";
import { minting, getContract } from "../models/create/erc721/index.js";
import { getMetaMask, getKaikas } from "../models/getWallet";
import "../assets/css/custermized.css";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { fileFormatingIpfs } from '../models/ipfs/ipfs.js';
const Create = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [chain, setChain] = useState("");
  // const [collection, setCollection] = useState("");
  const blockChainList = ["Ethereum", "Klaytn"];
  const ethereumTypeList = ["ERC-721", "ERC-1155"];
  const klaytnTypeList = ["KIP-17"];

  const fileUploader = useRef(null);

  const handleClick = (e) => {
    fileUploader.current.click();
  }
  const handleChange = (e) => {
    const maxSize = 100 * 1024 * 1024;

    if (e.target.files[0].size > maxSize) {
      alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.")
    } else {
      //add file handler
      //console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }

  }

  const checkElement = () => {
    if (name && file && type && chain) {
      return true;
    }
    return false;
  }

  const onClickBtn = async (e) => {
    e.preventDefault();
    if (checkElement()) {
      //minting.
      const account = await getMetaMask();
      alert(account);
      const nftContract = getContract();
      const newNftTokenURI = await minting(account, nftContract);
      if (newNftTokenURI) {
        alert("성공적으로 발행되었습니다. :" + newNftTokenURI);
        console.log(await fileFormatingIpfs(file));
        setFile(null);
        setName("");
        setLink("");
        setDescription("");
        setType("");
        setChain("");

      }
      /*
        1. ipfs에 이미지 파일 등록
        2.heroku요청을 tokenURI로 nft입력정보 db에 넣음
        
      */

    } else {
      alert("필수항목을 모두 채워주세요.")
    }
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Card>
          <CardHeader>
            <h5 className="title">Create New Item</h5>
            <div>Image, Video, Audio, or 3D Model<sup className="sup-red">*</sup></div>
          </CardHeader>
          <CardBody>
            <div className="item-data-form">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</div>
            <div className="input-box">
              <div className="input-box-file" onClick={handleClick}>
                <img src={file ? URL.createObjectURL(file) : fileImg} alt="no img" className={file ? "input-box-file-img-change" : "input-box-file-img"} />
                <input
                  type="file"
                  ref={fileUploader}
                  onChange={handleChange}
                  accept="image/*, audio/*, video/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
            <div className="item-element">
              <div className="element-label">Name<sup className="sup-red">*</sup></div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="element-input" />
            </div>

            <div className="item-element">
              <div className="element-label">External Link</div>
              <input type="text" value={link} onChange={(e) => setLink(e.target.value)} className="element-input" />
            </div>

            <div className="item-element">
              <div className="element-label">Description</div>
              <textarea className="element-input element-textarea"
                value={description} onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="item-element">
              <div className="element-label">Block chain<sup className="sup-red">*</sup></div>
              <select name="blockchain" value={chain} onChange={(e) => setChain(e.target.value)} className="element-input" >
                <option value=""> </option>
                {blockChainList.map((el, index) => {
                  return <option key={index} value={el}>{el}</option>
                })}
              </select>
            </div>

            <div className="item-element">
              <div className="element-label">Type<sup className="sup-red">*</sup></div>
              <select name="type" value={type} onChange={(e) => setType(e.target.value)} className="element-input" >
                <option value=""> </option>
                {chain === "" ? <option value=""> </option> :
                  chain === "Ethereum" ? ethereumTypeList.map((el, index) => {
                    return <option key={index} value={el}>{el}</option>
                  })
                    :
                    klaytnTypeList.map((el, index) => {
                      return <option key={index} value={el}>{el}</option>
                    })
                }
              </select>
            </div>
            {/*
                <div className="item-element">
              <div className="element-label">Collection<sup className="sup-red">*</sup></div>
              <select name="collection" value={collection} onChange={(e) => setCollection(e.target.value)} className="element-input" >
                <option value=""></option>
                <option value="testSet">testSet</option>
              </select>
            </div>
                */}

            <div className="item-element">
              <input type="button" value="create" className="element-btn" onClick={onClickBtn} />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Create;

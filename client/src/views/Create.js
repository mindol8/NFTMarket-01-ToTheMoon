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
import "../assets/css/custermized.css";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

const Create = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [chain, setChain] = useState("");
  const blockChainList = ["Ethereum", "Klaytn"];
  const EthereumTypeList = ["ERC-721", "ERC-1155"];
  const KlaytnTypeList = ["KIP-17"];

  const fileUploader = useRef(null);
  const handleClick = (e) => {
    fileUploader.current.click();
  }
  const handleChange = (e) => {
    const maxSize = 100 * 1024 * 1024;
    const fileUploaded = e.target.files[0];
    if (fileUploaded.size > maxSize) {
      alert("첨부파일 사이즈는 100MB 이내로 등록 가능합니다.")
    } else {
      //add file handler
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
                <img src={fileImg} alt="no img" className="input-box-file-img" />
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
              <select name="type" value={chain} onChange={(e) => setChain(e.target.value)} className="element-input" >
                <option> </option>
                {blockChainList.map((el, index) => {
                  <option key={index} value={el}>el</option>
                })}
              </select>
            </div>

          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Create;

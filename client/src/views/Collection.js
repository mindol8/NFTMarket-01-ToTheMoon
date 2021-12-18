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
import React from "react";

// reactstrap components
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import "../assets/css/custermized.css";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function FullScreenMap() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Card>
          <CardHeader>
            <h5 className="title">Collection</h5>

          </CardHeader>
          <CardBody>

          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default FullScreenMap;

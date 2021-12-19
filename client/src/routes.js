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
import MainPage from "views/MainPage.js";
import Create from "views/Create.js";
import Mypage from "views/Mypage.js";

var dashRoutes = [
  {
    path: "/mainpage",
    name: "Home",
    icon: "design_app",
    component: MainPage,
    layout: "/admin",
  },
  {
    path: "/create",
    name: "Create",
    icon: "design_image",
    component: Create,
    layout: "/admin",
  },
  {
    path: "/mypage",
    name: "My page",
    icon: "users_single-02",
    component: Mypage,
    layout: "/admin",
  },


];
export default dashRoutes;

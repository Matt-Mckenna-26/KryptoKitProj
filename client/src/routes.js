/*!

=========================================================
* KryptoKit - v1.0.0
=========================================================

* Custom Code by CodingDojo Group Project Dev Team

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
//import Profile from "views/Profile.js";
//import Maps from "views/Maps.js";
import Register from "views/Register.js";
import Login from "views/Login.js";
import Customers from "views/Customers.js";
import Wallet from "views/Wallet.js";
//import Trade from "views/Trade.js";
import Buysell from "views/BuySell.js";
import SellView from "views/SellView.js"
import Marketcap from "views/Marketcap.js";
//import Coin from "views/Coin";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-planet text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "My Coin Portfolio",
    icon: "ni ni-credit-card text-info",
    component: Wallet,
    layout: "/admin",
  },
  // {
  //   path: "/trade",
  //   name: "Trading",
  //   icon: "ni ni-chart-bar-32 text-orange",
  //   component: Trade,
  //   layout: "/admin",
  // },
  {
    path: "/buy",
    name: "Buy",
    icon: "ni ni-money-coins text-green",
    component: Buysell,
    layout: "/admin",
  },
  {
    path: "/sell",
    name: "Sell",
    icon: "ni ni-money-coins text-danger",
    component: SellView,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "My Wallet",
  //   icon: "ni ni-credit-card text-grey",
  //   component: Wallet,
  {
    path: "/marketcap",
    name: "Marketcap",
    icon: "ni ni-sound-wave text-purple",
    component: Marketcap,
    layout: "/admin",
  },
  // {
  //   path: "/trade",
  //   name: "Trading",
  //   icon: "ni ni-chart-bar-32 text-orange",
  //   component: Trade,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Customers",
  //   icon: "ni ni-bullet-list-67 text-pink",
  //   component: Customers,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-red",
    component: Register,
    layout: "/auth",
  },
  // email
  // {
  //   path: "/user-profile",
  //   name: "",
  //   icon: "",
  //   component: Profile,
  //   layout: "/admin",
  // },
];
export default routes;

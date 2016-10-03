import React from "react";
import ReactDOM from "react-dom";
require('../sass/app.scss');

import Layout from "./components/layout";

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);

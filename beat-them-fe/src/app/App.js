"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = require("../pages/home/Home");
const SessionPage_1 = require("../pages/session/SessionPage");
const NotFoundPage_1 = require("../pages/notfound/NotFoundPage");
const router = (0, react_router_dom_1.createBrowserRouter)([
    { path: '/', element: <Home_1.default /> },
    { path: '/:sessionId', element: <SessionPage_1.default /> },
    { path: '/notfound', element: <NotFoundPage_1.default /> }
]);
function App() {
    return (<react_router_dom_1.RouterProvider router={router}/>);
}
exports.default = App;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const App_tsx_1 = require("./app/App.tsx");
require("./main.css");
client_1.default.createRoot(document.getElementById('root')).render(
// <React.StrictMode>
<App_tsx_1.default />
// </React.StrictMode>,
);

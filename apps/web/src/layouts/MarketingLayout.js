import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
export function MarketingLayout({ children }) {
    return (_jsxs("div", { className: "min-h-screen bg-ice text-navy", children: [_jsx(Navbar, {}), _jsx("main", { children: children }), _jsx(Footer, {})] }));
}

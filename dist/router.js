"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//websocket
const webSocketRoutes_1 = __importDefault(require("./routes/webSocketRoutes"));
// admin routes
const roleRoutes_1 = __importDefault(require("./routes/roleRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const areaRoutes_1 = __importDefault(require("./routes/areaRoutes"));
const masterAreaRoutes_1 = __importDefault(require("./routes/masterAreaRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
//customer routes
const orderRoutes_1 = __importDefault(require("./routes/customerRoutes/orderRoutes"));
const authCustomerRoutes_1 = __importDefault(require("./routes/customerRoutes/authCustomerRoutes"));
const keranjangRoutes_1 = __importDefault(require("./routes/customerRoutes/keranjangRoutes"));
const transaksiRoutes_1 = __importDefault(require("./routes/customerRoutes/transaksiRoutes"));
//sales routes
const orderRoutes_2 = __importDefault(require("./routes/salesRoutes/orderRoutes"));
const keranjangRoutes_2 = __importDefault(require("./routes/salesRoutes/keranjangRoutes"));
const transaksiRoutes_2 = __importDefault(require("./routes/salesRoutes/transaksiRoutes"));
const kulesRoutes_1 = __importDefault(require("./routes/salesRoutes/kulesRoutes"));
//ssAdmin routes
const transaksiRoutes_3 = __importDefault(require("./routes/ssAdminRoutes/transaksiRoutes"));
const historyRoutes_1 = __importDefault(require("./routes/ssAdminRoutes/historyRoutes"));
//spvSales router
const orderRoutes_3 = __importDefault(require("./routes/spvSalesRoutes/orderRoutes"));
const keranjangRoutes_3 = __importDefault(require("./routes/spvSalesRoutes/keranjangRoutes"));
const transaksiRoutes_4 = __importDefault(require("./routes/spvSalesRoutes/transaksiRoutes"));
const kulesRoutes_2 = __importDefault(require("./routes/spvSalesRoutes/kulesRoutes"));
//data analis router
const monitoringRoutes_1 = __importDefault(require("./routes/dataAnalisRoutes/monitoringRoutes"));
const router = express_1.default.Router();
//WebSocket
router.use("/", webSocketRoutes_1.default);
// Admin
router.use("/admin/roles", roleRoutes_1.default);
router.use("/admin/users", userRoutes_1.default);
router.use("/admin/area", areaRoutes_1.default);
router.use("/admin/masterarea", masterAreaRoutes_1.default);
router.use("/admin/product", productRoutes_1.default);
router.use("/admin/brand", brandRoutes_1.default);
router.use("/admin", authRoutes_1.default);
router.use("/admin/store", storeRoutes_1.default);
router.use("/admin/address", addressRoutes_1.default);
// Customer
router.use('/order', orderRoutes_1.default);
router.use("/", authCustomerRoutes_1.default);
router.use("/cart", keranjangRoutes_1.default);
router.use("/transaksi", transaksiRoutes_1.default);
//sales
router.use('/sales/order', orderRoutes_2.default);
router.use("/sales/cart", keranjangRoutes_2.default);
router.use("/sales/transaksi", transaksiRoutes_2.default);
router.use("/sales/kules", kulesRoutes_1.default);
//ssAdmin
router.use("/ssAdmin/transaksi", transaksiRoutes_3.default);
router.use("/ssAdmin/history", historyRoutes_1.default);
//spvSales
router.use('/spvSales/order', orderRoutes_3.default);
router.use("/spvSales/cart", keranjangRoutes_3.default);
router.use("/spvSales/transaksi", transaksiRoutes_4.default);
router.use("/spvSales/kules", kulesRoutes_2.default);
//dataAnalis
router.use("/dataAnalis/monitoring", monitoringRoutes_1.default);
exports.default = router;

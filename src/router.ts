import express, { Request, Response, Router } from "express";

//middleware
import { authenticateToken } from "./middleware/authMiddleware";

//websocket
import websocketRoutes from "./routes/webSocketRoutes"

// admin routes
import roleRoutes from "./routes/roleRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import areaRoutes from "./routes/areaRoutes";
import masterAreaRoutes from "./routes/masterAreaRoutes";
import productRoutes from "./routes/productRoutes";
import brandRoutes from "./routes/brandRoutes";
import storeRoutes from "./routes/storeRoutes";
import addressRoutes from "./routes/addressRoutes";

//customer routes
import orderRoutes from "./routes/customerRoutes/orderRoutes";
import authCustomerRoutes from "./routes/customerRoutes/authCustomerRoutes"
import keranjangRoutes from "./routes/customerRoutes/keranjangRoutes";
import transaksiRoutes from "./routes/customerRoutes/transaksiRoutes"

//sales routes
import orderSalesRoutes from "./routes/salesRoutes/orderRoutes";
import keranjangSalesRoutes from "./routes/salesRoutes/keranjangRoutes";
import transaksiSalesRoutes from "./routes/salesRoutes/transaksiRoutes"
import kulesRoutes from "./routes/salesRoutes/kulesRoutes"

//ssAdmin routes
import transaksiSSAdminRoutes from "./routes/ssAdminRoutes/transaksiRoutes"
import historySSAdminRoutes from "./routes/ssAdminRoutes/historyRoutes"

//spvSales router
import orderspvSalesRoutes from "./routes/spvSalesRoutes/orderRoutes";
import keranjangspvSalesRoutes from "./routes/spvSalesRoutes/keranjangRoutes";
import transaksispvSalesRoutes from "./routes/spvSalesRoutes/transaksiRoutes"
import kulesspvSalesRoutes from "./routes/spvSalesRoutes/kulesRoutes";

//data analis router
import monitoringDataAnalisRoutes from "./routes/dataAnalisRoutes/monitoringRoutes"

const router: Router = express.Router();

//WebSocket
router.use("/", websocketRoutes)

// Admin
router.use("/admin/roles", roleRoutes);
router.use("/admin/users", userRoutes);
router.use("/admin/area", areaRoutes);
router.use("/admin/masterarea", masterAreaRoutes);
router.use("/admin/product", productRoutes);
router.use("/admin/brand", brandRoutes);
router.use("/admin", authRoutes);
router.use("/admin/store", storeRoutes)
router.use("/admin/address", addressRoutes);

// Customer
router.use('/order', orderRoutes)
router.use("/", authCustomerRoutes)
router.use("/cart", keranjangRoutes)
router.use("/transaksi", transaksiRoutes)

//sales
router.use('/sales/order', orderSalesRoutes)
router.use("/sales/cart", keranjangSalesRoutes)
router.use("/sales/transaksi", transaksiSalesRoutes)
router.use("/sales/kules", kulesRoutes)

//ssAdmin
router.use("/ssAdmin/transaksi", transaksiSSAdminRoutes)
router.use("/ssAdmin/history", historySSAdminRoutes)

//spvSales
router.use('/spvSales/order', orderspvSalesRoutes)
router.use("/spvSales/cart", keranjangspvSalesRoutes)
router.use("/spvSales/transaksi", transaksispvSalesRoutes)
router.use("/spvSales/kules", kulesspvSalesRoutes)

//dataAnalis
router.use("/dataAnalis/monitoring", monitoringDataAnalisRoutes)

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const websocket_1 = require("../websocket");
const router = express_1.default.Router();
router.post('/send-notifications', (req, res) => {
    const { userId, status, title, message } = req.body;
    (0, websocket_1.sendNotificationToUser)(userId, status, title, message);
    res.status(200).send('Notification sent');
});
router.get('/connected-users', (req, res) => {
    const connectedUsers = (0, websocket_1.getConnectedUsers)();
    res.json(connectedUsers);
});
exports.default = router;

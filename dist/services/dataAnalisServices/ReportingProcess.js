"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportingProcess = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const reportingProcess = (fileName) => {
    try {
        // Baca file JSON
        const filePath = path_1.default.join(__dirname, `../../uploads/${fileName}`);
        const rawData = fs_1.default.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(rawData);
        console.log(jsonData);
        // Validasi struktur JSON
        if (!jsonData[0].calculate.tr || !jsonData[0].calculate.multi) {
            throw new Error('Struktur file JSON tidak valid');
        }
        // Fungsi untuk menghitung Line Amount dan reach Kode BP berdasarkan grup di TR (berdasarkan AREA dan NEW BG)
        const calculateTR = (data) => {
            const result = {};
            data.forEach((item) => {
                const { 'Line Amt': lineAmount, 'Kode BP': kodeBp, 'NEW BG': newBG, 'Area TR': area } = item;
                // Inisialisasi area jika belum ada
                if (!result[area]) {
                    result[area] = {
                        totalLineAmount: 0,
                        reachCount: new Set(),
                        groupByNewBG: {},
                    };
                }
                const areaData = result[area];
                // Hitung Line Amount berdasarkan NEW BG dalam Area
                if (!areaData.groupByNewBG[newBG]) {
                    areaData.groupByNewBG[newBG] = 0;
                }
                areaData.groupByNewBG[newBG] += lineAmount;
                // Total Line Amount per Area
                areaData.totalLineAmount += lineAmount;
                // Hitung reach Kode BP, tambahkan ke Set untuk menghindari duplikat
                areaData.reachCount.add(kodeBp);
            });
            // Ubah reachCount dari Set ke jumlah total
            Object.keys(result).forEach((area) => {
                result[area].totalReach = result[area].reachCount.size;
                delete result[area].reachCount; // Hapus Set reachCount setelah perhitungan
            });
            return result;
        };
        // Fungsi untuk menghitung Line Amount dan reach Kode BP berdasarkan grup di Multi (berdasarkan AREA dan TRX)
        const calculateMulti = (data) => {
            const result = {};
            data.forEach((item) => {
                const { 'Line Amt': lineAmount, 'Kode BP': kodeBp, 'Trx Organization': trx, 'Area Multi': area } = item;
                // Inisialisasi area jika belum ada
                if (!result[area]) {
                    result[area] = {
                        totalLineAmount: 0,
                        reachCount: new Set(),
                        groupByTRX: {},
                    };
                }
                const areaData = result[area];
                // Hitung Line Amount berdasarkan TRX dalam Area
                if (!areaData.groupByTRX[trx]) {
                    areaData.groupByTRX[trx] = 0;
                }
                areaData.groupByTRX[trx] += lineAmount;
                // Total Line Amount per Area
                areaData.totalLineAmount += lineAmount;
                // Hitung reach Kode BP
                areaData.reachCount.add(kodeBp);
            });
            // Ubah reachCount dari Set ke jumlah total
            Object.keys(result).forEach((area) => {
                result[area].totalReach = result[area].reachCount.size;
                delete result[area].reachCount; // Hapus Set reachCount setelah perhitungan
            });
            return result;
        };
        // Menghitung untuk bagian TR
        const trData = jsonData[0].calculate.tr;
        const trResult = calculateTR(trData);
        // Menghitung untuk bagian Multi
        const multiData = jsonData[0].calculate.multi;
        const multiResult = calculateMulti(multiData);
        return {
            trResult: trResult,
            multiResult: multiResult,
        };
    }
    catch (error) {
        console.error('Error dalam memproses laporan:', error);
        return null; // Kembalikan null jika terjadi error
    }
};
exports.reportingProcess = reportingProcess;

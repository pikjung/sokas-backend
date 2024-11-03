"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitoringProcess = void 0;
const XLSX = __importStar(require("xlsx"));
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const monitoringProcess = (fileName, bp, brand) => {
    try {
        // console.log(bp)
        const filePath = path_1.default.join(__dirname, `../../uploads/${fileName}`);
        // console.log(`Reading Excel file from: ${filePath}`);
        // Baca file Excel dari filePath
        const workbook = XLSX.readFile(filePath);
        // console.log('Workbook read successfully.');
        // Ambil data dari sheet pertama (atau sesuaikan jika ada sheet lain yang ingin digunakan)
        const sheetName = workbook.SheetNames[0]; // Mengambil sheet pertama
        const sheet = workbook.Sheets[sheetName];
        // Mengonversi sheet menjadi array objek
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = data[0]; // Mengambil header dari baris pertama
        const rows = data.slice(1); // Mengambil baris data setelah header
        const formattedData = rows.map((row) => {
            return headers.reduce((acc, header, index) => {
                acc[header] = row[index]; // Membuat objek dengan key dari header dan value dari row
                return acc;
            }, {});
        });
        // return formattedData;
        // console.log(data);
        // console.log(`Data from sheet '${sheetName}' has been converted to array. Total rows: ${data.length}`);
        const missingArea = [];
        // console.log(data)
        const monitoringTrb = formattedData.filter((row) => row["Trx Organization"] === "P11-TRB" &&
            !row["Invoice"].match(/FLL|FCT|CNN|CNT/));
        // console.log(`Monitoring TRB filtered. Total rows: ${monitoringTrb.length}`);
        // console.log(monitoringTrb)
        // Proses untuk menentukan vendorbu
        monitoringTrb.forEach((row, index) => {
            if (typeof row["vendorbu"] !== "string") {
                const new_bu = index - 1;
                row["vendorbu"] = monitoringTrb[new_bu]["vendorbu"];
            }
        });
        // console.log(`Vendor BU processed for TRB.`);
        // Normalisasi Kode BP
        monitoringTrb.forEach((row) => {
            row["Kode BP"] = row["Kode BP"] ? row["Kode BP"].replace(/^0+/, '') : '0';
        });
        // console.log(`Kode BP normalized for TRB.`);
        // Merge dengan mapping TR berdasarkan "Kode BP"
        const mergedTrb = lodash_1.default.map(monitoringTrb, row => {
            const matchedBp = lodash_1.default.find(bp, { "Kode BP": row["Kode BP"] });
            // Jika tidak menemukan "Area Multi", simpan Kode BP ke variabel
            if (!matchedBp || !matchedBp["Area TR"]) {
                missingArea.push({
                    kodeBp: row["Kode BP"],
                    businessPartner: row["Business Partner "] // Menyimpan Business Partner juga
                });
            }
            return Object.assign(Object.assign({}, row), { "Area TR": (matchedBp === null || matchedBp === void 0 ? void 0 : matchedBp["Area TR"]) || null // Jika tidak ada, berikan nilai null
             });
        });
        // console.log(`Merged TRB with Area TR. Missing Areas: ${missingAreaTrb.length}`);
        // Merge dengan newbg berdasarkan "vendorbu"
        const newbg = [
            { vendorbu: '1. LED', "NEW BG": '1. Digital Product' },
            { vendorbu: '2. Lamps', "NEW BG": '2. Conventional Product' },
            { vendorbu: '3. Prof', "NEW BG": '3. Digital Solution' },
            { vendorbu: '4. Home', "NEW BG": '1. Digital Product' },
        ];
        const finalTrb = lodash_1.default.map(mergedTrb, row => (Object.assign(Object.assign({}, row), lodash_1.default.find(newbg, { vendorbu: row["vendorbu"] }))));
        // console.log(`Final TRB merged with newbg.`);
        // console.log(brand)
        const finalTrbWithBrand = lodash_1.default.map(finalTrb, row => {
            // Cari data di brand berdasarkan trx_organization
            const matchedBrand = lodash_1.default.find(brand, { trx: row["Trx Organization"] });
            return Object.assign(Object.assign({}, row), { 
                // Jika ada match, tambahkan properti 'Brand' dari brand, atau null jika tidak ada
                Brand: matchedBrand ? matchedBrand.brand : null });
        });
        // Filter data berdasarkan "Trx Organization" dan "Invoice"
        const monitoringMulti = formattedData.filter((row) => row["Trx Organization"] && // Pastikan Trx Organization ada
            row["Trx Organization"].match(/P21-PAN|P81-SUP|P71-SCH|P101-REN|P61-OTH/) && // Kemudian lakukan pencocokan
            row["Invoice"] && // Pastikan Invoice ada
            !row["Invoice"].match(/FLL|FCT|CNN|CNT/) // Kemudian lakukan pencocokan
        );
        // console.log(`Monitoring Multi filtered. Total rows: ${monitoringMulti.length}`);
        // Normalisasi Kode BP
        monitoringMulti.forEach((row) => {
            row["Kode BP"] = row["Kode BP"] ? row["Kode BP"].replace(/^0+/, '') : '0';
        });
        // console.log(`Kode BP normalized for Multi.`);
        // Merge dengan mappingMulti berdasarkan "Kode BP"
        const mergedMulti = lodash_1.default.map(monitoringMulti, row => {
            const matchedBp = lodash_1.default.find(bp, { "Kode BP": row["Kode BP"] });
            // Jika tidak menemukan "Area Multi", simpan Kode BP ke variabel
            if (!matchedBp || !matchedBp["Area Multi"]) {
                missingArea.push({
                    kodeBp: row["Kode BP"],
                    businessPartner: row["Business Partner "] // Menyimpan Business Partner juga
                });
            }
            return Object.assign(Object.assign({}, row), { "Area Multi": (matchedBp === null || matchedBp === void 0 ? void 0 : matchedBp["Area Multi"]) || null // Jika tidak ada, berikan nilai null
             });
        });
        // console.log(`Merged Multi with Area Multi. Missing Areas: ${missingAreaMulti.length}`);
        const finalMultiWithBrand = lodash_1.default.map(mergedMulti, row => {
            // Cari data di brand berdasarkan trx_organization
            const brandMatch = lodash_1.default.find(brand, { "Trx Organization": row["Trx Organization"] });
            return Object.assign(Object.assign({}, row), { 
                // Jika ada match, tambahkan properti name dari brand ke finalTrb
                name: brandMatch ? brandMatch.name : "undefined" });
        });
        const uniqueMissingArea = lodash_1.default.uniqBy(missingArea, 'kodeBp');
        return [
            {
                calculate: {
                    tr: finalTrbWithBrand,
                    multi: finalMultiWithBrand,
                },
                nobp: uniqueMissingArea
            }
        ];
    }
    catch (error) {
        console.error(error);
    }
};
exports.monitoringProcess = monitoringProcess;

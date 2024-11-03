"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const generateId_1 = __importDefault(require("../../utils/generateId"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const monitoringProcess_1 = require("./monitoringProcess");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ReportingProcess_1 = require("./ReportingProcess");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const monitoringServices = {
    getMonitoring() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.monitoringFIle.findMany();
        });
    },
    uploadMonitoring(name, fileName, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield prisma.monitoringFIle.create({
                    data: {
                        id: (0, generateId_1.default)(),
                        name: name,
                        filename: fileName,
                        filepath: filePath,
                    },
                });
                return file;
            }
            catch (error) {
                throw new Error('Error saving file');
            }
        });
    },
    setDefaultMonitoring() {
    },
    deleteMonitoringFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield prisma.monitoringFIle.findUnique({
                where: { id: id }
            });
            if (!file) {
                throw new Error('File not found');
            }
            // Hapus file dari folder src/uploads
            const filePath = path_1.default.join(__dirname, '../../uploads/', file.filename);
            try {
                // Mengecek apakah file ada di sistem sebelum dihapus
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath); // Hapus file fisik
                    if (file.jsonfile) {
                        const jsonFilePath = path_1.default.join(__dirname, '../../uploads/', file.jsonfile);
                        if (fs_1.default.existsSync(jsonFilePath)) {
                            fs_1.default.unlinkSync(jsonFilePath);
                        }
                    }
                    // console.log(`File ${filePath} berhasil dihapus.`);
                }
                else {
                    // console.log(`File ${filePath} tidak ditemukan.`);
                }
            }
            catch (error) {
                console.error(`Gagal menghapus file: ${error.message}`);
            }
            return yield prisma.monitoringFIle.delete({ where: { id: id } });
        });
    },
    getAddress() {
        return prisma.address.findMany({
            select: {
                id: true,
                name: true
            }
        });
    },
    calculateMonitoring(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield prisma.monitoringFIle.findUnique({
                where: { id: id }
            });
            if ((file === null || file === void 0 ? void 0 : file.jsonfile) !== null) {
                return {
                    status: "saved",
                    data: file === null || file === void 0 ? void 0 : file.jsonfile
                };
            }
            const brand = yield prisma.brand.findMany({
                select: {
                    name: true,
                    trx_organization: true,
                    value: true
                }
            });
            const brandData = brand.map(item => ({
                trx: `${item.trx_organization}-${item.value}`,
                brand: item.name
            }));
            const store = yield prisma.store.findMany({
                select: {
                    kode: true,
                    Address: {
                        select: {
                            multi: {
                                select: {
                                    name: true
                                }
                            },
                            tr: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            const bp = store.map(item => {
                var _a, _b, _c, _d;
                return ({
                    "Kode BP": item.kode,
                    "Area TR": (_b = (_a = item.Address) === null || _a === void 0 ? void 0 : _a.tr) === null || _b === void 0 ? void 0 : _b.name,
                    "Area Multi": (_d = (_c = item.Address) === null || _c === void 0 ? void 0 : _c.multi) === null || _d === void 0 ? void 0 : _d.name
                });
            });
            if (file) {
                return {
                    status: "calculated",
                    data: (0, monitoringProcess_1.monitoringProcess)(file.filename, bp, brandData)
                };
            }
            return "false";
        });
    },
    inputAllBp(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Array.isArray(formData)) {
                    // console.log(formData)
                    throw new Error("Invalid input: formData must be an array");
                }
                // Buat promises untuk memproses setiap item dalam formData
                const formattedDataPromises = formData.map((item) => __awaiter(this, void 0, void 0, function* () {
                    const id = (0, generateId_1.default)(); // Menghasilkan ID unik
                    const hashedPassword = yield bcrypt_1.default.hash(id, 10); // Hash password
                    // Format ulang data sesuai dengan model Prisma
                    return {
                        id: id,
                        name: item.businessPartner,
                        latitude: "",
                        longitude: "",
                        no_telp: "008",
                        kode: item.kodeBp,
                        term_of_payment: 30,
                        password: hashedPassword,
                        full_address: "-",
                        addressId: item.area,
                    };
                }));
                // Tunggu sampai semua promises selesai dan mendapatkan array data yang diformat
                const formattedData = yield Promise.all(formattedDataPromises);
                // Gunakan Prisma untuk memasukkan data ke database
                const result = yield prisma.store.createMany({
                    data: formattedData,
                    skipDuplicates: true, // Pilihan untuk menghindari duplikat
                });
                return {
                    success: true,
                    message: 'Data inserted successfully',
                    count: result.count, // Jumlah record yang berhasil dimasukkan
                };
            }
            catch (error) {
                console.error('Error inserting data:', error);
                throw new Error("Error inserting data");
            }
        });
    },
    saveMonitoring(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield prisma.monitoringFIle.findUnique({
                where: { id: id }
            });
            const brand = yield prisma.brand.findMany({
                select: {
                    name: true,
                    trx_organization: true,
                    value: true
                }
            });
            const brandData = brand.map(item => ({
                trx: `${item.trx_organization}-${item.value}`,
                brand: item.name
            }));
            const store = yield prisma.store.findMany({
                select: {
                    kode: true,
                    Address: {
                        select: {
                            multi: {
                                select: {
                                    name: true
                                }
                            },
                            tr: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            const bp = store.map(item => {
                var _a, _b, _c, _d;
                return ({
                    "Kode BP": item.kode,
                    "Area TR": (_b = (_a = item.Address) === null || _a === void 0 ? void 0 : _a.tr) === null || _b === void 0 ? void 0 : _b.name,
                    "Area Multi": (_d = (_c = item.Address) === null || _c === void 0 ? void 0 : _c.multi) === null || _d === void 0 ? void 0 : _d.name
                });
            });
            if (file) {
                const jsonFileName = file.filename.split('.')[0] + '.json';
                const jsonFilePath = path_1.default.join(__dirname, '../../uploads/', jsonFileName);
                const mtp = (0, monitoringProcess_1.monitoringProcess)(file.filename, bp, brandData);
                try {
                    fs_1.default.writeFile(jsonFilePath, JSON.stringify(mtp, null, 2), 'utf-8', (err) => {
                        if (err) {
                            console.error('Error writing to file', err);
                            throw new Error("Error menulis ke json");
                        }
                    });
                    return prisma.monitoringFIle.update({
                        where: { id: id },
                        data: {
                            jsonfile: jsonFileName,
                            jsonfilepath: jsonFilePath
                        }
                    });
                }
                catch (error) {
                    throw new Error(error);
                }
            }
            return "false";
        });
    },
    reportMonitoring(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield prisma.monitoringFIle.findUnique({
                    where: { id: id }
                });
                if (!(file === null || file === void 0 ? void 0 : file.jsonfile)) {
                    throw new Error("Error");
                }
                else {
                    return (0, ReportingProcess_1.reportingProcess)(file === null || file === void 0 ? void 0 : file.jsonfile);
                }
            }
            catch (error) {
                return error;
            }
        });
    }
};
exports.default = monitoringServices;

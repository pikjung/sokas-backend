import { PrismaClient } from "@prisma/client";
import generateUniqueId from "../../utils/generateId";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { monitoringProcess } from "./monitoringProcess";
import bcrypt from "bcrypt";
import { reportingProcess } from "./ReportingProcess";

dotenv.config()

const prisma = new PrismaClient()

const monitoringServices = {
  async getMonitoring() {
    return await prisma.monitoringFIle.findMany()
  },

  async uploadMonitoring(name: string, fileName: string, filePath: string) {
    try {
      const file = await prisma.monitoringFIle.create({
        data: {
          id: generateUniqueId(),
          name: name,
          filename: fileName,
          filepath: filePath,
        },
      });
      return file;
    } catch (error) {
      throw new Error('Error saving file');
    }
  },

  setDefaultMonitoring() {

  },

  async deleteMonitoringFile(id: string) {
    const file = await prisma.monitoringFIle.findUnique({
      where: { id: id }
    });

    if (!file) {
      throw new Error('File not found');
    }

    // Hapus file dari folder src/uploads
    const filePath = path.join(__dirname, '../../uploads/', file.filename);


    try {
      // Mengecek apakah file ada di sistem sebelum dihapus
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Hapus file fisik
        if (file.jsonfile) {
          const jsonFilePath = path.join(__dirname, '../../uploads/', file.jsonfile);
          if (fs.existsSync(jsonFilePath)) {
            fs.unlinkSync(jsonFilePath);
          }
        }
        // console.log(`File ${filePath} berhasil dihapus.`);
      } else {
        // console.log(`File ${filePath} tidak ditemukan.`);
      }
    } catch (error: any) {
      console.error(`Gagal menghapus file: ${error.message}`);
    }

    return await prisma.monitoringFIle.delete({ where: { id: id } });
  },

  getAddress() {
    return prisma.address.findMany({
      select: {
        id: true,
        name: true
      }
    })
  },

  async calculateMonitoring(id: string) {
    const file = await prisma.monitoringFIle.findUnique({
      where: { id: id }
    });

    if (file?.jsonfile !== null) {
      return {
        status: "saved",
        data: file?.jsonfile
      }
    }

    const brand = await prisma.brand.findMany({
      select: {
        name: true,
        trx_organization: true,
        value: true
      }
    })

    const brandData = brand.map(item => ({
      trx: `${item.trx_organization}-${item.value}`,
      brand: item.name
    }))

    const store = await prisma.store.findMany({
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
    })

    const bp = store.map(item => ({
      "Kode BP": item.kode,
      "Area TR": item.Address?.tr?.name,
      "Area Multi": item.Address?.multi?.name
    }))

    if (file) {
      return {
        status: "calculated",
        data: monitoringProcess(file.filename, bp, brandData)
      }
    }

    return "false"
  },

  async inputAllBp(formData: any) {
    try {

      if (!Array.isArray(formData)) {
        // console.log(formData)
        throw new Error("Invalid input: formData must be an array");
      }
      // Buat promises untuk memproses setiap item dalam formData
      const formattedDataPromises = formData.map(async (item: any) => {
        const id = generateUniqueId(); // Menghasilkan ID unik
        const hashedPassword = await bcrypt.hash(id, 10); // Hash password

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
      });

      // Tunggu sampai semua promises selesai dan mendapatkan array data yang diformat
      const formattedData = await Promise.all(formattedDataPromises);

      // Gunakan Prisma untuk memasukkan data ke database
      const result = await prisma.store.createMany({
        data: formattedData,
        skipDuplicates: true, // Pilihan untuk menghindari duplikat
      });

      return {
        success: true,
        message: 'Data inserted successfully',
        count: result.count, // Jumlah record yang berhasil dimasukkan
      };
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error("Error inserting data");
    }
  },

  async saveMonitoring(id: string) {
    const file = await prisma.monitoringFIle.findUnique({
      where: { id: id }
    });

    const brand = await prisma.brand.findMany({
      select: {
        name: true,
        trx_organization: true,
        value: true
      }
    })

    const brandData = brand.map(item => ({
      trx: `${item.trx_organization}-${item.value}`,
      brand: item.name
    }))

    const store = await prisma.store.findMany({
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
    })

    const bp = store.map(item => ({
      "Kode BP": item.kode,
      "Area TR": item.Address?.tr?.name,
      "Area Multi": item.Address?.multi?.name
    }))

    if (file) {
      const jsonFileName = file.filename.split('.')[0] + '.json'
      const jsonFilePath = path.join(__dirname, '../../uploads/', jsonFileName);
      const mtp = monitoringProcess(file.filename, bp, brandData)
      try {
        fs.writeFile(jsonFilePath, JSON.stringify(mtp, null, 2), 'utf-8', (err) => {
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
        })
      } catch (error: any) {
        throw new Error(error);
      }
    }

    return "false"
  },

  async reportMonitoring(id: string) {
    try {
      const file = await prisma.monitoringFIle.findUnique({
        where: { id: id }
      });

      if (!file?.jsonfile) {
        throw new Error("Error");
      } else {
        return reportingProcess(file?.jsonfile)
      }
    } catch (error) {
      return error
    }
  }
}

export default monitoringServices;
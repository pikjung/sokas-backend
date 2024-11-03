import * as XLSX from 'xlsx';
import _ from 'lodash';
import path from 'path';

interface MissingArea {
  kodeBp: string;
  businessPartner: string; // Sesuaikan dengan tipe yang tepat jika perlu
}

export const monitoringProcess = (fileName: string, bp: any, brand: any) => {
  try {
    // console.log(bp)
    const filePath = path.join(__dirname, `../../uploads/${fileName}`);
    // console.log(`Reading Excel file from: ${filePath}`);

    // Baca file Excel dari filePath
    const workbook = XLSX.readFile(filePath);
    // console.log('Workbook read successfully.');

    // Ambil data dari sheet pertama (atau sesuaikan jika ada sheet lain yang ingin digunakan)
    const sheetName = workbook.SheetNames[0]; // Mengambil sheet pertama
    const sheet = workbook.Sheets[sheetName];

    // Mengonversi sheet menjadi array objek
    const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const headers = data[0]; // Mengambil header dari baris pertama
    const rows = data.slice(1); // Mengambil baris data setelah header

    const formattedData = rows.map((row) => {
      return headers.reduce((acc: any, header: any, index: any) => {
        acc[header] = row[index]; // Membuat objek dengan key dari header dan value dari row
        return acc;
      }, {} as any);
    });

    // return formattedData;

    // console.log(data);

    // console.log(`Data from sheet '${sheetName}' has been converted to array. Total rows: ${data.length}`);

    const missingArea: MissingArea[] = [];
    // console.log(data)

    const monitoringTrb = formattedData.filter((row: any) =>
      row["Trx Organization"] === "P11-TRB" &&
      !row["Invoice"].match(/FLL|FCT|CNN|CNT/)
    );
    // console.log(`Monitoring TRB filtered. Total rows: ${monitoringTrb.length}`);

    // console.log(monitoringTrb)

    // Proses untuk menentukan vendorbu
    monitoringTrb.forEach((row: any, index: number) => {
      if (typeof row["vendorbu"] !== "string") {
        const new_bu = index - 1;
        row["vendorbu"] = monitoringTrb[new_bu]["vendorbu"];
      }
    });
    // console.log(`Vendor BU processed for TRB.`);

    // Normalisasi Kode BP
    monitoringTrb.forEach((row: any) => {
      row["Kode BP"] = row["Kode BP"] ? row["Kode BP"].replace(/^0+/, '') : '0';
    });
    // console.log(`Kode BP normalized for TRB.`);

    // Merge dengan mapping TR berdasarkan "Kode BP"
    const mergedTrb = _.map(monitoringTrb, row => {
      const matchedBp = _.find(bp, { "Kode BP": row["Kode BP"] });

      // Jika tidak menemukan "Area Multi", simpan Kode BP ke variabel
      if (!matchedBp || !matchedBp["Area TR"]) {
        missingArea.push({
          kodeBp: row["Kode BP"],
          businessPartner: row["Business Partner "] // Menyimpan Business Partner juga
        });
      }

      return {
        ...row,
        "Area TR": matchedBp?.["Area TR"] || null // Jika tidak ada, berikan nilai null
      };
    });
    // console.log(`Merged TRB with Area TR. Missing Areas: ${missingAreaTrb.length}`);

    // Merge dengan newbg berdasarkan "vendorbu"
    const newbg = [
      { vendorbu: '1. LED', "NEW BG": '1. Digital Product' },
      { vendorbu: '2. Lamps', "NEW BG": '2. Conventional Product' },
      { vendorbu: '3. Prof', "NEW BG": '3. Digital Solution' },
      { vendorbu: '4. Home', "NEW BG": '1. Digital Product' },
    ];

    const finalTrb = _.map(mergedTrb, row => ({
      ...row,
      ..._.find(newbg, { vendorbu: row["vendorbu"] })
    }));
    // console.log(`Final TRB merged with newbg.`);

    // console.log(brand)
    const finalTrbWithBrand = _.map(finalTrb, row => {
      // Cari data di brand berdasarkan trx_organization
      const matchedBrand = _.find(brand, { trx: row["Trx Organization"] });

      return {
        ...row,
        // Jika ada match, tambahkan properti 'Brand' dari brand, atau null jika tidak ada
        Brand: matchedBrand ? matchedBrand.brand : null
      };
    });


    // Filter data berdasarkan "Trx Organization" dan "Invoice"
    const monitoringMulti = formattedData.filter((row: any) =>
      row["Trx Organization"] && // Pastikan Trx Organization ada
      row["Trx Organization"].match(/P21-PAN|P81-SUP|P71-SCH|P101-REN|P61-OTH/) && // Kemudian lakukan pencocokan
      row["Invoice"] && // Pastikan Invoice ada
      !row["Invoice"].match(/FLL|FCT|CNN|CNT/) // Kemudian lakukan pencocokan
    );
    // console.log(`Monitoring Multi filtered. Total rows: ${monitoringMulti.length}`);

    // Normalisasi Kode BP
    monitoringMulti.forEach((row: any) => {
      row["Kode BP"] = row["Kode BP"] ? row["Kode BP"].replace(/^0+/, '') : '0';
    });
    // console.log(`Kode BP normalized for Multi.`);

    // Merge dengan mappingMulti berdasarkan "Kode BP"
    const mergedMulti = _.map(monitoringMulti, row => {
      const matchedBp = _.find(bp, { "Kode BP": row["Kode BP"] });

      // Jika tidak menemukan "Area Multi", simpan Kode BP ke variabel
      if (!matchedBp || !matchedBp["Area Multi"]) {
        missingArea.push({
          kodeBp: row["Kode BP"],
          businessPartner: row["Business Partner "] // Menyimpan Business Partner juga
        });
      }

      return {
        ...row,
        "Area Multi": matchedBp?.["Area Multi"] || null // Jika tidak ada, berikan nilai null
      };
    });
    // console.log(`Merged Multi with Area Multi. Missing Areas: ${missingAreaMulti.length}`);

    const finalMultiWithBrand = _.map(mergedMulti, row => {
      // Cari data di brand berdasarkan trx_organization
      const brandMatch = _.find(brand, { "Trx Organization": row["Trx Organization"] });

      return {
        ...row,
        // Jika ada match, tambahkan properti name dari brand ke finalTrb
        name: brandMatch ? brandMatch.name : "undefined"
      };
    });

    const uniqueMissingArea = _.uniqBy(missingArea, 'kodeBp')

    return [
      {
        calculate: {
          tr: finalTrbWithBrand,
          multi: finalMultiWithBrand,
        },
        nobp: uniqueMissingArea
      }
    ];
  } catch (error) {
    console.error(error)
  }
};

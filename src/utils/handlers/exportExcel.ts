import * as exceljs from "exceljs";

export const exportExcel = (data: any[], fileName: string): Promise<void> => {
  const workbook: exceljs.Workbook = new exceljs.Workbook();
  const worksheet: exceljs.Worksheet = workbook.addWorksheet("Sheet 1");

  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  return workbook.xlsx.writeFile("/");
};

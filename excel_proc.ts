import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

// Excel's epoch starts on Jan 1, 1900
function excelDateToJSDate(excelDate: number): Date {
  return new Date((excelDate - 25569) * 86400 * 1000);
}

// Split "07:30 16:00" into checkIn and checkOut
function parseTimes(timeString: string): { checkIn: string; checkOut: string } {
  const parts = timeString.trim().split(' ');

  const checkIn = parts[0] ?? '';   // fallback to empty string if undefined
  const checkOut = parts[1] ?? '';  // fallback to empty string if undefined

  return { checkIn, checkOut };
}

function parseAttendanceFile(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0] ?? '';
  if (!sheetName) {
        throw new Error('No sheets found in workbook');
    } 

    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      throw new Error('Sheet not found in workbook');
    }

    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

  return rows.map(row => {
    const date = excelDateToJSDate(row['Date']);
    const dateString = date.toISOString().split('T')[0]; // "2026-06-21"
    const { checkIn, checkOut } = parseTimes(row['Time']);

    return {
      employee_id: row['No.ID'],
      name: row['Name'],
      work_date: date,
      checkIn: new Date(`${dateString}T${checkIn}:00.000Z`),
      checkOut: new Date(`${dateString}T${checkOut}:00.000Z`),
    };
  });
}

// Usage
const records = parseAttendanceFile('./Example Fingerprint Data.xlsx');
console.log(records);
  import * as readline from 'node:readline/promises';
  import prisma from './database/db.js';

  type RL = readline.Interface;
  //setup readline interface
  const rl : RL = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  //Function that converts string to time in minutes
  function timeToMinutes(time: string): number {
    if (time.length !== 5){
      throw new Error("Invalid time format. Please use HH:MM.");
    }
    else{
      //Splits string into hours and minutes, then converts them to numbers
      const att = time.split(":").map(Number);
      //checks the length of splitted array
      if (att.length !== 2){
        throw new Error("Invalid time format. Please use HH:MM.");
      }
      //Explicitly states hours and minutes mapped as two numbers, then calculates total minutes
      const [hours, minutes] = att.map(Number) as [number, number];
      return hours * 60 + minutes;
      
    }
  }

async function insert_employee(){
  const employee_name = await rl.question("Enter employee name: ");

  const employee = await prisma.employee.create({
    data: {
      name: employee_name
    }
  });

  console.log('Created employee:', employee);
  rl.close();
}


async function get_employee(){
  //Type is alread inferred from the return type of prisma.employee.findMany()
  const employee_col = await prisma.employee.findMany();
  for (const employee of employee_col){
    console.log(`Employee ID: ${employee.employee_id}, Name: ${employee.name}`);
  }
  rl.close();
}

async function attendance(){
  const check_in_time = await rl.question("Enter check-in time (HH:MM): ");
  const check_out_time = await rl.question("Enter check-out time (HH:MM): ");

  const today = new Date().toISOString().split('T')[0];
  
  const inserted_attendance = await prisma.attendance.create({
    data: {
      employee_id: 6, // Replace with the actual employee ID
      // then converting it to a Date object
      checkIn: new Date(`${today}T${check_in_time}:00`),
      checkOut: new Date(`${today}T${check_out_time}:00`),
      status: 'PRESENT',
    }
  });

  console.log('Attendance successfully recorded:', inserted_attendance.work_date);
  //Close the readline interface
  rl.close();
}


console.log("Welcome to the Employee Attendance System!");
console.log("Choose an option:");
console.log("1. Insert a new employee");
console.log("2. Get all employees");
console.log("3. Record attendance for an employee");
const choice = await rl.question("Enter your choice (1-3): ");
switch (choice) {
  case '1':
    insert_employee().catch((error) => {
      console.error('Error inserting employee:', error);
      rl.close();
    }).finally(async () => {
      await prisma.$disconnect();
    });
    break;
  case '2':
    get_employee().catch((error) => {
      console.error('Error retrieving employees:', error);
      rl.close();
    }).finally(async () => {
      await prisma.$disconnect();
    });
    break;
  case '3':
    attendance().catch((error) => {
      console.error('Error recording attendance:', error);
      rl.close();
    }).finally(async () => {
      await prisma.$disconnect();
    });
    break;
  default:
    console.log("Invalid choice. Please enter '1', '2', or '3'.");
    rl.close();
}
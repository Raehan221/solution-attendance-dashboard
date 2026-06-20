  import * as readline from 'node:readline/promises';
  import prisma from './database/db.js';

  type RL = readline.Interface;
  const today: Date = new Date();


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

insert_employee().catch((error) => {
  console.error('Error inserting employee:', error);
  rl.close();
}).finally(async () => {
  await prisma.$disconnect();
});
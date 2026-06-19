import * as readline from 'node:readline/promises';

const title : string = "Result is:";
type RL = readline.Interface;

//setup readline interface
const rl : RL = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Function that converts string to time in minutes
function timeToMinutes(time: string): number {
  if (time.length !== 5) {
    throw new Error("Invalid time format. Please use HH:MM.");
  }else{
      const [hours, minutes] = time.split(":").map(Number);
    
      return hours * 60 + minutes;

  }
}

//need to wrap readline inside a function to use async/await
async function attendance(){
  const check_in = await rl.question("Please enter your check-in time (HH:MM): ")
  const check_out  = await rl.question("Please enter your check-out time (HH:MM): ")

  rl.close();

  console.log('Checked in at:', check_in);
  console.log('Checked out at:', check_out);

  let checkInMinutes = timeToMinutes(check_in);
  let checkOutMinutes = timeToMinutes(check_out);

  let totalMinutes = checkOutMinutes - checkInMinutes;
}

attendance();

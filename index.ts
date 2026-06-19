import * as readline from 'node:readline/promises';

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

//need to wrap readline inside a function to use async/await
async function attendance(){
  console.log("Today's date is: ", today.toDateString());
  const employeeName = await rl.question("Employee Name: ")
  const check_in = await rl.question("Please enter your check-in time (HH:MM): ")
  const check_out  = await rl.question("Please enter your check-out time (HH:MM): ")

  rl.close();

  console.log('Checked in at:', check_in);
  console.log('Checked out at:', check_out);

  let checkInMinutes = timeToMinutes(check_in);
  let checkOutMinutes = timeToMinutes(check_out);

  let totalMinutes = checkOutMinutes - checkInMinutes;
  let totalHours = Math.floor(totalMinutes / 60);
  console.log(employeeName,"Total Worked Hour is:", totalHours,"Hours");
}

attendance();

import * as readline from 'node:readline/promises';
const title = "Result is:";
//setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//need to wrap readline inside a function to use async/await
async function attendance() {
    const check_in = await rl.question("Please enter your check-in time (HH:MM): ");
    const check_out = await rl.question("Please enter your check-out time (HH:MM): ");
    rl.close();
    console.log('Checked in at:', check_in);
    console.log('Checked out at:', check_out);
}
attendance();
//# sourceMappingURL=index.js.map
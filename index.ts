import prisma from './database/db.js'
import express from 'express'


const app = express()
const port = 3000

app.use(express.json());


//Get list of all attendance records
app.get('/get_attendance', async (req : express.Request, res : express.Response) => {
    const attendance = await prisma.attendance.findMany();
    res.json(attendance);
});


//Post request to create new attendance record
app.post('/add_attendance', async (req : express.Request, res : express.Response) => {
    const { employee_id, checkIn, checkOut } = req.body;
    const attendance = await prisma.attendance.create({
      data:{
        employee_id : employee_id,
        checkIn : new Date(checkIn),
        checkOut : new Date(checkOut)
      }
    })
    res.json(attendance)
})


//Start listening for request
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const color = ('color')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRouter = require('./routes/userRoutes')
const assignPlaceRouter = require('./routes/assignPlaceRoutes')
const adminRouter = require('./routes/adminRoutes')
const partyRoutes = require('./routes/partyRoutes')
const path = require('path')

dotenv.config()
connectDB();

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req, res) => {
    res.send('server is running')
})
app.use('/api/party', partyRoutes.routers)
app.use('/api/user', userRouter)
app.use('/api/place', assignPlaceRouter)
app.use('/api/admin', adminRouter)




app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000
app.listen(port, console.log(`server is running on ${port}`.green.bold))
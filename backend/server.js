import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

import cookieParser from 'cookie-parser'

// ------- App Config --------
const app = express()

app.use(cookieParser())
app.use(cors({credentials:true}))

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// console.log('PORT:', process.env.PORT);

// -------- Middlewares --------- 
app.use(express.json())
app.use(cors())

// --------- API endpoints -----------
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

// ----- Start the express server -------- 
app.listen(port, () => console.log('Server started on PORT : ' + port))
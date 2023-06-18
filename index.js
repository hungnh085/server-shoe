const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const connectDB = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoe-store.sgme4pd.mongodb.net/shoe-store?retryWrites=true&w=majority`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        console.log('connected DB')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

const PORT = 5000;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));
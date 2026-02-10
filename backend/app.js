import express from 'express';
import productRoutes from './routes/productRoutes.js';
import errorHandleMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());
app.use('/api/v1', productRoutes);

app.use(errorHandleMiddleware)


export default app
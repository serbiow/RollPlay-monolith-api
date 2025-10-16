import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import sheetRoutes from './routes/sheetRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import diceRoutes from './routes/diceRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/sheets', sheetRoutes);
app.use('/campaigns', campaignRoutes);
app.use('/dice', diceRoutes);

app.get('/', (req, res) => {
    res.send('RollPlay Monolith API is running!');
});

export default app;


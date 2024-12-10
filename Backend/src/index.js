import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import path from 'path';

import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/user.route.js';
import albumsRouter from './routes/Albmes.route.js';
import adminRouter from './routes/admin.route.js';
import authRouter from './routes/auth.route.js';
import statesRouter from './routes/states.route.js';
import songRouter from './routes/song.route.js';
import connectDb from './lib/db.js';
dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;     

app.use(express.json()) // to parse the res.body
app.use(clerkMiddleware())

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
);

// Mount the router
app.use('/api/user', userRouter);
app.use('/api/albums', albumsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/states', statesRouter);
app.use('/api/song', songRouter);



// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        message: process.env.NODE_ENV === "development" ? "Internal server error" : err.message
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});

//todo : socket io
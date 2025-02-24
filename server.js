
import express from 'express';
import db from './db/db.js';
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 8000;

// mongoose.connect(process.env.MONGO_URI, { dbName: 'unityConnect' })
await db();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Running' });
});

app.use('/users', userRouter);


app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ msg: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

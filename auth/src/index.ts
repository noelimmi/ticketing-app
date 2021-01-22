import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi Immi!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} !!!!!!`);
});

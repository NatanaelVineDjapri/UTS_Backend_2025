const app = require('./core/server');
const mongoose = require('mongoose');

const PORT = 3000;
const MONGO_URI = 'mongodb+srv://NatanaelVineDjapri:GguSHonF3MCz32du@cluster0.4tq7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server jalan di http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

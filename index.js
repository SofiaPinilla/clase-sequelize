const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

app.listen(PORT, () => console.log('servidor levantado en el puerto' + PORT))

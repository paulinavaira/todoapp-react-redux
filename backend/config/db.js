const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then(() => console.log("Database connected"))
.catch(error => console.log(error))
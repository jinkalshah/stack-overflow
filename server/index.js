    import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors'
    import userRoutes from './routes/users.js';
    import QuestionRoutes from './routes/Questions.js'
    import bodyParser from 'body-parser'
    import answerRoutes from './routes/Answers.js'
    import dotenv from 'dotenv'

    const app=express()
    dotenv.config();
    const PORT=process.env.PORT || 5000

    const DATABASE_URL=process.env.CONNECTION_URL
    mongoose.connect( DATABASE_URL, {useNewUrlParser : true , useUnifiedTopology: true})
       .then(()=>app.listen(PORT, ()=> {console.log(`server running on port ${PORT} jinkal`)}))
       .catch((err)=> console.log(err.message))
    app.use(express.json({extended: true}))
    app.use(express.urlencoded({extended: true}))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
   }));
    app.use(cors());

    app.get('/',(req,res)=> {
        res.send("This is stack overflow clone API")
    })
    


    app.use('/users',userRoutes)
    app.use('/questions',QuestionRoutes)
    app.use('/Answer',answerRoutes)
    
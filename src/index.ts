import express from 'express';
import connectDb from './database/config/db.config'; 
import userRoute from './routes/userRout';  
import swaggerUi from 'swagger-ui-express';
import specs from './utils/swagger';  
import cors from 'cors';
import passport from "passport";
import "./utils/passport";
import session from 'express-session';
import blogRouter from './routes/blogRout';
import comments from './routes/commentsLikesRout';
import contactRouter from './routes/contactRout';

const app = express();
// Middleware
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'qwertyuiop', 
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false }, 
  })
);
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 3000;
connectDb();

// swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/users', userRoute);
app.use('/blog', blogRouter);
app.use('/comments', comments)
app.use('/contact', contactRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

import express from "express";
import path from "path";
import posts from "./routes/post.js"; // posts
import logger from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notFound.js";

const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// app.get('/', (req,res) => {
// res.send('Hello World');
// res.send('<h1>Hello World</h1>');
// res.send({ name: 'Huseyin', age: 30 });
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req,res) => {
// res.send('About Page');
// res.send('<h1>Hello World</h1>');
// res.send({ name: 'Huseyin', age: 30 });
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api/posts", posts);

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));

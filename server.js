import express from "express";
import path from "path";
import posts from "./routes/post.js"; // posts
import logger from "./middleware/logger.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notFound.js";
import { fileURLToPath } from "url";

const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logger);

// setup static folder
app.use(express.static(path.join(__dirname, "public")));

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

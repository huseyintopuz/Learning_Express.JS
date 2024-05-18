const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

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

let posts = [
  { id: 1, title: "Post1", body: "This is post 1" },
  { id: 2, title: "Post2", body: "This is post 2" },
  { id: 3, title: "Post3", body: "This is post 3" },
];

// Get all posts

app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);
  const title = req.query.title;
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else if (title) {
    const filteredPosts = posts.filter((post) => post.title.includes(title));
    res.status(200).json(filteredPosts);
  } else {
    res.status(200).json(posts);
  }
});

// Get single post
app.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res
    .status(404)
    .json({ message: `Post with id ${id} not found` });
  }
  res.status(200).json(post);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

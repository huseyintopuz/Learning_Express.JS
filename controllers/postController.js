// get all posts
// get /api/posts
const text = "Post";
let posts = [
  { id: 1, title: "Post1", body: `${text} 1` },
  { id: 2, title: "Post2", body: `${text} 2` },
  { id: 3, title: "Post3", body: `${text} 3` },
];
const getPosts = (req, res) => {
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
};

// get single post
// get /api/posts/:id
const getPost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// create post
// post /api/posts
const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    body: `${text} ${posts.length + 1}`,
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 404;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

// update post
// put /api/posts/:id
const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  post.body = `${text} ${id}`;
  res.status(200).json(post);
};

// delete post
// delete /api/posts/:id
const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post with id ${id} not found`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};

export { getPosts, getPost, createPost, updatePost, deletePost };

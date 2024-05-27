const output = document.querySelector("#output");
const getPostsBtn = document.querySelector("#get-posts-btn");
const postForm = document.querySelector("#post-form");
// Get and Show Post

async function showPosts() {
  try {
    const res = await fetch("http://localhost:8000/api/posts");
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    const posts = await res.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      output.innerHTML += `<p>${post.title}</p>`;
    });
  } catch (error) {
    console.log(error);
  }
}

// submit form

async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      const message = `An error has occured: ${res.status}`;
      throw new Error(message);
    }
    const newPost = await res.json();

    const postEl = document.createElement("div");
    postEl.textContent = newPost.title;
    output.appendChild(postEl);
    showPosts();
  }
  catch (error) {
    console.log(error);
  }
}


// Event Listeners
getPostsBtn.addEventListener("click", showPosts);
postForm.addEventListener("submit", addPost);

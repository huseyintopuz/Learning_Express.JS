const output = document.querySelector("#output");
const getPostsBtn = document.querySelector("#get-posts-btn");

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
      output.innerHTML += `<p>${post.body}</p>`;
    });
  } catch (error) {
    console.log(error);
  }
}

// Event Listeners
getPostsBtn.addEventListener("click", showPosts);

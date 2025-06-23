const API = 'http://localhost:3000/posts';

function main() {
  displayPosts();
  addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);

// Display all post titles and images
function displayPosts() {
  fetch(API)
    .then(res => res.json())
    .then(posts => {
      const list = document.getElementById('post-list');
      list.innerHTML = '';
      posts.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${post.title}</h3><img src="${post.image}" width="100"/>`;
        div.addEventListener('click', () => handlePostClick(post.id));
        list.appendChild(div);
      });

      if (posts.length > 0) handlePostClick(posts[0].id); // Load first post
    });
}

// Show post details //

function handlePostClick(id) {
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById('post-detail');
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <img src="${post.image}" width="300" />
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.content}</p>
        <button id="edit-btn">Edit</button>
        <button id="delete-btn">Delete</button>
        `;


      document.getElementById('edit-btn').onclick = () => showEditForm(post);
      document.getElementById('delete-btn').onclick = () => deletePost(post.id);
    });
}

// Add new post
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Fetch dog image
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const dogData = await res.json();
  
      const newPost = {
        title: form.title.value,
        author: form.author.value,
        content: form.content.value,
        image: dogData.message // use dog image here
      };
  
      fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      })
      .then(res => res.json())
      .then(() => {
        displayPosts();
        form.reset();
      });
    });
  }

// Show edit form
function showEditForm(post) {
  const form = document.getElementById('edit-post-form');
  form.classList.remove('hidden');
  form['edit-title'].value = post.title;
  form['edit-content'].value = post.content;

  form.onsubmit = (e) => {
    e.preventDefault();
    const updated = {
      title: form['edit-title'].value,
      content: form['edit-content'].value
    };
    fetch(`${API}/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
    .then(() => {
      form.classList.add('hidden');
      displayPosts();
      handlePostClick(post.id);
    });
  };

  document.getElementById('cancel-edit').onclick = () => {
    form.classList.add('hidden');
  };
}

// Delete post
function deletePost(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE'
  }).then(() => {
    displayPosts();
    document.getElementById('post-detail').innerHTML = '<h2>Select a post to see details</h2>';
  });
}

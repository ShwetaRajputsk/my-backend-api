'use strict';


const API_URL = 'https://my-backend-api-9.onrender.com/api/blogs';
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");



navbarToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
    navbarToggler.classList.remove("active");
  });
}

/**
 * search toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    searchBox.classList.toggle("active");
  });
}

/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});
document.addEventListener('DOMContentLoaded', () => {
  fetchBlogs();

  const blogForm = document.getElementById('blogForm');
  blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
      const response = await fetch( API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        alert('Blog post added successfully!');
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        fetchBlogs(); // Refresh blog list
      } else {
        alert('Failed to add blog post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the blog post.');
    }
  });
});

async function fetchBlogs() {
  try {
    const response = await fetch(API_URL);
    const blogs = await response.json();
    const blogPostsDiv = document.getElementById('blog-posts');
    blogPostsDiv.innerHTML = ''; // Clear previous posts

    blogs.forEach(blog => {
      const blogDiv = document.createElement('div');
      blogDiv.innerHTML = `<h3>${blog.title}</h3><p>${blog.content}</p>`;
      blogPostsDiv.appendChild(blogDiv);
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}

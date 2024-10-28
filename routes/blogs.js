const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Adjust the path based on your structure

// Route to fetch all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Route to create a new blog
router.post('/blogs', async (req, res) => {
    const blog = new Blog(req.body);
    try {
      await blog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(400).json({ message: 'Error creating blog' });
    }
  });
// DELETE /api/blogs/:id
router.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting blog', error });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).send('Blog not found');
      res.json(blog);
    } catch (error) {
      res.status(500).send('Error fetching blog');
    }
  });
  
module.exports = router;

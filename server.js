const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Require the cors module
const blogRoutes = require('./routes/blogs');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(cors()); // Use the cors middleware
app.use(express.json());
// Use the blog routes
app.use('/api/blogs', blogRoutes); // The base path for the blog routes

// Serve static files
app.use(express.static(path.join(__dirname, 'assets')));

// Route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Assuming you have an index.html file
});

// Route for the blog page
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html')); // Send the blog.html file
});

// Fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');
    res.json(blog);
  } catch (error) {
    res.status(500).send('Error fetching blog');
  }
});

// Use the blog routes
app.use('/api', blogRoutes);

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shwetakashyap942001:hTCbVcFGgOUNtsr8@cluster1.kuymv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

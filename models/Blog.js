const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    excerpt: String,
    imageUrl: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

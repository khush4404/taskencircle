import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
    const { blog_title, blog_description, blog_status } = req.body;
    let blog_image = '';
    if (req.file) {
        blog_image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    try {
        const blog = new Blog({
            blog_title,
            blog_image,
            blog_description,
            blog_status,
            author: req.user._id
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'email');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this blog' });
        }

        // Update fields
        blog.blog_title = req.body.blog_title || blog.blog_title;
        blog.blog_description = req.body.blog_description || blog.blog_description;
        blog.blog_status = req.body.blog_status || blog.blog_status;

        // If a new image is uploaded
        if (req.file) {
            blog.blog_image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this blog' });
        }
        await blog.deleteOne();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id).populate('author', 'email');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
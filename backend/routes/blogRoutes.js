import express from 'express';
import multer from 'multer';
import {
    createBlog,
    getBlogs,
    getUserBlogs,
    updateBlog,
    deleteBlog,
    getBlogById
} from '../controllers/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.get('/user', authMiddleware, getUserBlogs);
router.post('/', authMiddleware, upload.single('blog_image'), createBlog);
router.put('/:id', authMiddleware,upload.single('blog_image'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

export default router;
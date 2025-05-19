import multer from 'multer';
import path from 'path';

// Cấu hình nơi lưu file và tên file
const storage = multer.diskStorage({
    destination: './src/public/product/', // Lưu file vào thư mục public/product/
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Cấu hình multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Giới hạn 1MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb('Lỗi: Chỉ chấp nhận file ảnh!');
        }
    }
}).single('image'); // Tên field trong form là "image"

export default upload;
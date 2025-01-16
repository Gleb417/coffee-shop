import multer from "multer";
import path from "path";

// Конфигурация для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/product"); // Папка, куда будут сохраняться изображения
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname).toLowerCase(); // Расширение файла
    cb(null, file.fieldname + "-" + uniqueSuffix + extname); // Имя файла
  },
});

// Мултер для обработки только изображений
const uploadimg = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Только изображения форматов JPG, JPEG, PNG, GIF"));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // Ограничение на размер файла (10MB)
}).single("image"); // Поле, в которое будет загружаться файл

export { uploadimg };

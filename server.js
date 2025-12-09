import express from "express";
import multer from "multer";
import path from "path";

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === ".txt") {
    cb(null, true);
  } else {
    cb(new Error("Only .txt files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

app.get("/", (req, res) => {
    return res.json("Server is live")
})

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded or invalid file type");
  }

  res.send(`Uploaded: ${req.file.filename}`);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

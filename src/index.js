// server.js

const express = require('express');
const multer = require('multer');
const ImageProcessingToolkit = require('image-processing-toolkit');

const imageToolkit = new ImageProcessingToolkit();

function createImageProcessingServer() {
  const app = express();

  // Middleware for parsing JSON and urlencoded form data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Multer configuration for handling file uploads
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Endpoint for uploading and processing images
  app.post('/process-image', upload.single('image'), async (req, res) => {
    try {
      // Ensure an image file was uploaded
      if (!req.file) {
        return res.status(400).send('No image uploaded');
      }

      // Get processing options from request body
      const { action, width, height, format } = req.body;

      // Perform specified image processing action
      let processedImageBuffer;
      if (action === 'resize') {
        processedImageBuffer = await imageToolkit.resizeImageBuffer(req.file.buffer, { width, height });
      } else if (action === 'convert') {
        processedImageBuffer = await imageToolkit.convertImageBuffer(req.file.buffer, format);
      } else {
        return res.status(400).send('Invalid action specified');
      }

      // Set content type as image
      res.contentType('image/jpeg');

      // Send the processed image back to the client
      res.send(processedImageBuffer);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).send('Error processing image');
    }
  });

  return app;
}

module.exports = createImageProcessingServer;

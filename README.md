# Image Processing Web Server

A simple Node.js web server for processing images using the `image-processing-toolkit` package.

## Installation

You can install the package via npm:

```
npm install image-processing-web-server
```

## Usage

```javascript
const createImageProcessingServer = require('image-processing-web-server');

const app = createImageProcessingServer();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This will start the image processing server on the specified port.

### Processing Images

Send a POST request to `/process-image` with the image file attached and specify the processing action in the request body.

- To resize the image, set `action` to `'resize'` and provide `width` and `height` parameters.
- To convert the image format, set `action` to `'convert'` and provide the desired `format` parameter.

Example using curl:

```bash
curl -X POST -F "image=@image.jpg" -F "action=resize" -F "width=300" -F "height=200" http://localhost:3000/process-image > resized_image.jpg
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

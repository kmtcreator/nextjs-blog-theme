
// Handle login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const express = require("express");
  const multer = require("multer");
  const bodyParser = require("body-parser");
  
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(bodyParser.urlencoded({ extended: false }));
  // Configure multer for file uploads
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  // Serve static files (uploaded files)
  app.use("/uploads", express.static("uploads"));
  app.get("/", (req, res) => {
    res.send("Welcome to the file upload app!");
  });
  // Sample route to handle file uploads
  app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
  
      if (!file) {
        return res.status(400).send("No file uploaded.");
      }
  
      // Initialize the Google Drive API client
function initGoogleDrive() {
    // Initialize the Google Drive API with your API Key
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'AIzaSyDQFROQMoTmo9CzmC5jX7f6Z-pdpcPtOb4',
            clientId: '69889029477-166jnh5rqutf585jv3adskh0mr2h2amc.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive.file',
        }).then(() => {
            // Authenticate user
            return gapi.auth2.getAuthInstance().signIn();
        }).then(() => {
            // Show the file upload box
            document.getElementById('uploadBox').style.display = 'block';
        }).catch((error) => {
            console.error('Google Drive API initialization error:', error);
        });
    });
  }

// Upload JSON file to Google Drive
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (file) {
        const metadata = {
            name: file.name,
            mimeType: 'application/json',
        };
  
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            gapi.client.drive.files.create({
                resource: metadata,
                media: {
                    mimeType: 'application/json',
                    body: content,
                },
            }).then((response) => {
                const fileLink = response.result.webViewLink;
                document.getElementById('outputBox').style.display = 'block';
                document.getElementById('outputLink').href = fileLink;
                document.getElementById('outputLink').textContent = fileLink;
            }).catch((error) => {
                console.error('Error uploading file:', error);
            });
        };
        reader.readAsDataURL(file);
    }
  }
  
  
      res.status(200).send("File uploaded successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred.");
    }
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

  // After successful login, initialize Google Drive
  initGoogleDrive();
}

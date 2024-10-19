const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
// Initialize Firebase Admin SDK (as before)
const serviceAccount = require('./serviceAccountKey.json');
if (!serviceAccount) console.log("Service Account Key Not Found");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'drn1fyyir', // Replace with your Cloudinary cloud name
  api_key: process.env.API_KEY, // Replace with your Cloudinary API key
  api_secret: process.env.API_SECRET, // Replace with your Cloudinary API secret
});
1
// Set up multer for handling image uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'projects', // Optional: Folder name in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
  },
});
const upload = multer({ storage: storage });

// Routes

// 1. Add a Project (POST)
app.post('/projects', upload.single('image'), async (req, res) => {
  const { projectName, status, startDate, endDate, location, category } = req.body;

  try {
    // Store project details including image URL from Cloudinary
    const projectRef = db.collection('projects').doc();
    await projectRef.set({
      projectName,
      image: req.file.path, // Cloudinary URL for the uploaded image
      status, // Either "Upcoming", "Running", or "Complete"
      startDate,
      endDate,
      location,
      category,
    });
    res.status(201).send({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 2. Get All Projects (GET)
app.get('/projects', async (req, res) => {
  try {
    const projectsRef = db.collection('projects');
    const snapshot = await projectsRef.get();
    const projects = [];
    snapshot.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 3. Update Project Status (PUT)
app.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const projectRef = db.collection('projects').doc(id);
    await projectRef.update({ status });
    res.status(200).send({ message: 'Project status updated successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 4. Delete Project (DELETE)
app.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const projectRef = db.collection('projects').doc(id);
    await projectRef.delete();
    res.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/contact', async (req, res) => {
  console.warn("Contact API is hitting");
  const { name, email, subject, message } = req.body;
  try {
    const contactRef = db.collection('enquiry').doc();
    await contactRef.set({
      name,
      email,
      subject,
      message,
      status: "Not Ack"
    });
    res.status(201).send({ message: 'Project added successfully' });
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get('/contact', async (req, res) => {
  try {
    const contactsRef = db.collection('enquiry');
    const snapshot = await contactsRef.get();
    const contacts = [];
    snapshot.forEach(doc => contacts.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Route to update status of a contact
app.put('/contact/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting { status: 'Ack' } or { status: 'Not Ack' }

  try {
    const contactRef = db.collection('enquiry').doc(id);
    await contactRef.update({ status });
    res.status(200).send('Status updated successfully');
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Error updating status');
  }
});

app.delete('/contact/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = enquiries.length;

  // Filter out the enquiry with the specified ID
  enquiries = enquiries.filter(enquiry => enquiry.id !== id);

  if (enquiries.length < initialLength) {
    // Optionally, you could save the updated enquiries back to a JSON file here
    // fs.writeFile('data.json', JSON.stringify(enquiries), (err) => {
    //     if (err) console.error('Error writing file:', err);
    // });

    return res.status(200).json({ message: 'Enquiry deleted successfully' });
  } else {
    return res.status(404).json({ message: 'Enquiry not found' });
  }
});

app.post("/quote", async (req, res) => {
  console.log("/Quote is hitting");
  const { name, homeAddress, phone, interiorType, size } = req.body;
  try {
    const contactRef = db.collection('quote').doc();
    await contactRef.set({
      name,
      homeAddress,
      phone,
      interiorType,
      size,
      status: "Not Ack",
      // createdAt: new Date() // Include the default time
    });
    res.status(201).send({ message: 'Quote request submitted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/quote", async (req, res) => {
  try {
    const snapshot = await db.collection('quote').get();
    const quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(quotes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT request to update the status of a quote
app.put("/quote/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const contactRef = db.collection('quote').doc(id);
    await contactRef.update({ status });
    res.status(200).send({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE request to remove a quote
app.delete("/quote/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contactRef = db.collection('quote').doc(id);
    await contactRef.delete();
    res.status(200).send({ message: 'Quote request deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

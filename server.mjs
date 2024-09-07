import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware to serve the static HTML and CSS files
app.use(express.static('public'));

// Multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Hugging Face API Configuration
const apiUrl = 'https://api-inference.huggingface.co/models/gpt2'; // Hugging Face Model URL
const apiKey = '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'; // Your Hugging Face API Key

// Endpoint to handle form submissions
app.post('/describe-testing', upload.array('images', 12), async (req, res) => {
    try {
        const context = req.body.context || '';
        const files = req.files;
        
        // Check if files were uploaded correctly
        if (!files || files.length === 0) {
            console.error('Error: No files uploaded');
            return res.status(400).json({ error: 'No files uploaded. Please upload at least one file.' });
        }

        console.log('Files uploaded:', files.map(file => file.filename));

        // Prepare structured prompt
        const prompt = `
        Please generate detailed testing instructions for the following context: "bus application".

        Instructions should follow this format:

        1. Pre-conditions: Describe any setup needed before testing.
        2. Steps: Provide step-by-step testing actions.
        3. Expected Result: Describe the expected outcome after completing the test.

        Example:
        Context: "Bus booking application"
        Pre-conditions: User is logged in and on the homepage.
        Steps:
        - Click on the 'Book a Bus' button.
        - Enter the departure and destination cities.
        - Select travel date and seat.
        - Click on 'Search Buses'.
        Expected Result: List of available buses with prices, seat availability, and booking options.

        `;

        // Call the Hugging Face API with the new structured prompt
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { max_new_tokens: 200 },
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Generated instructions:', data);
            res.json({ generated_text: data });
        } else {
            console.error('API Error:', data);
            res.status(500).json({ error: 'Failed to process the request.' });
        }

        // Clean up the uploaded files after processing (optional)
        files.forEach(file => {
            fs.unlinkSync(file.path);
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

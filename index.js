import express from 'express';
import { generateFile } from './generateFile.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'Server is operational' });
});

app.post('/run', async (req, res) => {
    const { language = 'cpp', code } = req.body;

    
    if (!code || code.trim() === '') {
        return res.status(400).json({ success: false, error: 'Empty code payload provided' });
    }

    if (language !== 'cpp') {
        return res.status(400).json({ success: false, error: 'Only C++ execution is supported currently' });
    }
    
    try {
        const filepath = await generateFile(language, code);

        return res.status(200).json({ 
        success: true, 
        message: 'C++ payload received successfully',
        filepath: filepath
    });
    } catch (error) {
        console.error("File write error:", error);
        return res.status(500).json({success:false, error: 'Internal server error during file creation'});

    }
});

app.listen(PORT, () => {
    console.log(`Execution engine listening on port ${PORT}`);
});
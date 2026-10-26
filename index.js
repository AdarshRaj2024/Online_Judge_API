const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'Server is operational' });
});

app.post('/run', (req, res) => {
    const { language = 'cpp', code } = req.body;

    
    if (!code || code.trim() === '') {
        return res.status(400).json({ success: false, error: 'Empty code payload provided' });
    }

    if (language !== 'cpp') {
        return res.status(400).json({ success: false, error: 'Only C++ execution is supported currently' });
    }

    return res.status(200).json({ 
        success: true, 
        message: 'C++ payload received successfully',
        receivedCodeLength: code.length
    });
});

app.listen(PORT, () => {
    console.log(`Execution engine listening on port ${PORT}`);
});
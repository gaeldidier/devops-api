const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: `Welcome to ${process.env.APP_NAME}`
    });
});

app.get('/users', (req, res) => {
    res.json({
        success: true,
        users: [
            { id: 1, name: "Gael" },
            { id: 2, name: "DevOps Student" }
        ]
    });
});

app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    res.status(201).json({
        success: true,
        message: "User created",
        user: { id: Date.now(), name }
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

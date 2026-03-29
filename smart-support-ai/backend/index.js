const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/analyze-ticket', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const lowerMessage = message.toLowerCase();

    // Priority Logic
    let priority = "Low";
    if (lowerMessage.match(/(urgent|refund|not working|failed)/)) {
        priority = "High";
    } else if (lowerMessage.match(/(issue|problem)/)) {
        priority = "Medium";
    }

    // Sentiment Logic
    let sentiment = "Neutral";
    if (lowerMessage.match(/(good|great|awesome|excellent|love|happy|thanks|thank you)/)) {
        sentiment = "Positive";
    } else if (lowerMessage.match(/(bad|terrible|awful|hate|angry|upset|frustrated|worst)/)) {
        sentiment = "Negative";
    }

    // Category Logic
    let category = "General";
    if (lowerMessage.match(/(payment|refund|charge|billing|invoice)/)) {
        category = "Billing";
    } else if (lowerMessage.match(/(error|bug|glitch|crash)/)) {
        category = "Technical";
    } else if (lowerMessage.match(/(login|password|account|sign in)/)) {
        category = "Login";
    }

    res.json({
        priority,
        sentiment,
        category
    });
});

app.listen(PORT, () => {
    console.log(`Smart Support AI Backend running on http://localhost:${PORT}`);
});

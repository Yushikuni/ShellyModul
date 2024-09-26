import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Shelly IP Address
const shellyDevice1IP = "http://192.168.33.1";

// Middleware 4 static files (pro HTML/CSS)
app.use(express.static('public'));

// API for return name
app.get('/shelly-device-info', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/shelly`);
        const data = await response.json();
        res.json({ name: data.name || 'Shelly 1PM' }); // return name or it will be Shelly 1PM
    } catch (error) {
        console.error('Error fetching device info:', error);
        res.status(500).send('Error fetching device info');
    }
});


// Shelly API status retrun
app.get('/shelly-status', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/relay/0`);
        const text = await response.text(); // Get answer as a text
        console.log('Response:', text); // log answer

        // If it JSON valid do this
        try {
            const data = JSON.parse(text); // Is JSON valid
            res.json(data);
        } catch (parseError) {
            // Non valid give me a text
            res.send(text);
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).send('Error fetching Shelly status');
    }
});


// Shelly controll API
app.get('/shelly-control/:action', async (req:Request, res:Response) => {
    const action = req.params.action; // 'on' nebo 'off'
    try {
        await fetch(`${shellyDevice1IP}/relay/0?turn=${action}`, { method: 'GET' });
        res.send(`Shelly was turned ${action}`);
    } catch (error) {
        console.error(`Error turning ${action} Shelly:`, error);
        res.status(500).send(`Error turning ${action} Shelly`);
    }
});

// Run to port 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

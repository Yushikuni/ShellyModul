const express = require('express'); // Použití require pro CommonJS
const fetch = global.fetch; // Použití nativního fetch v Node.js 20+

const app = express();
const port = 3000;

// IP adresa pro Shelly
const shellyDevice1IP = "http://192.168.33.1";

// Middleware pro statické soubory (pro HTML/CSS)
app.use(express.static('public'));

// API pro získání statusu Shelly
app.get('/shelly-status', async (req, res) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/status`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).send('Error fetching Shelly status');
    }
});

// API pro ovládání Shelly
app.get('/shelly-control/:action', async (req, res) => {
    const action = req.params.action; // 'on' nebo 'off'
    try {
        await fetch(`${shellyDevice1IP}/relay/0/${action}`, { method: 'GET' });
        res.send(`Shelly was turned ${action}`);
    } catch (error) {
        console.error(`Error turning ${action} Shelly:`, error);
        res.status(500).send(`Error turning ${action} Shelly`);
    }
});

// Spustí server na portu 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

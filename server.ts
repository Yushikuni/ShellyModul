const express = require('express'); // Pou�it� require pro CommonJS
const fetch = global.fetch; // Pou�it� nativn�ho fetch v Node.js 20+

const app = express();
const port = 3000;

// IP adresa pro Shelly
const shellyDevice1IP = "http://192.168.33.1";

// Middleware pro statick� soubory (pro HTML/CSS)
app.use(express.static('public'));

// API pro z�sk�n� statusu Shelly
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

// API pro ovl�d�n� Shelly
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

// Spust� server na portu 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// IP adresa pro Shelly
const shellyDevice1IP = "http://192.168.33.1";

// Middleware pro statické soubory (pro HTML/CSS)
app.use(express.static('public'));

// API pro získání názvu zaøízení
app.get('/shelly-device-info', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/status`);
        const data = await response.json();
        res.json({ name: data.device.name || 'Shelly 1PM' }); // Vrátí jméno zaøízení
    } catch (error) {
        console.error('Error fetching device info:', error);
        res.status(500).send('Error fetching device info');
    }
});


// API pro získání statusu Shelly
app.get('/shelly-status', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/relay/0`);
        const text = await response.text(); // Získej odpovìï jako text
        console.log('Response:', text); // Zaloguj odpovìï

        // Pokud je odpovìï platný JSON, zpracuj ho
        try {
            const data = JSON.parse(text); // Ovìø, zda je to platný JSON
            res.json(data);
        } catch (parseError) {
            // Pokud není JSON, vrátí textovou odpovìï
            res.send(text);
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).send('Error fetching Shelly status');
    }
});


// API pro ovládání Shelly
app.get('/shelly-control/:action', async (req:Request, res:Response) => {
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

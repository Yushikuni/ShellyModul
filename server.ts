import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// IP adresa pro Shelly
const shellyDevice1IP = "http://192.168.33.1";

// Middleware pro statick� soubory (pro HTML/CSS)
app.use(express.static('public'));

// API pro z�sk�n� n�zvu za��zen�
app.get('/shelly-device-info', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/status`);
        const data = await response.json();
        res.json({ name: data.device.name || 'Shelly 1PM' }); // Vr�t� jm�no za��zen�
    } catch (error) {
        console.error('Error fetching device info:', error);
        res.status(500).send('Error fetching device info');
    }
});


// API pro z�sk�n� statusu Shelly
app.get('/shelly-status', async (req: Request, res: Response) => {
    try {
        const response = await fetch(`${shellyDevice1IP}/relay/0`);
        const text = await response.text(); // Z�skej odpov�� jako text
        console.log('Response:', text); // Zaloguj odpov��

        // Pokud je odpov�� platn� JSON, zpracuj ho
        try {
            const data = JSON.parse(text); // Ov��, zda je to platn� JSON
            res.json(data);
        } catch (parseError) {
            // Pokud nen� JSON, vr�t� textovou odpov��
            res.send(text);
        }
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).send('Error fetching Shelly status');
    }
});


// API pro ovl�d�n� Shelly
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

// Spust� server na portu 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Importuje modul fetch (node-fetch)
const fetch = require('node-fetch');

// IP adresa pro Shelly (v�choz� IP nebo p�ipojen� k dom�c� Wi-Fi)
const shelly1IP = "localhost"//"http://192.168.33.1"; // Zm�� na svou lok�ln� IP adresu, pokud Shelly b�� na dom�c� s�ti

// Funkce pro z�sk�n� statusu Shelly
async function getShellyStatus() {
    try {
        const response = await fetch(`${shelly1IP}/status`);
        const data = await response.json();
        console.log("Status za��zen�:", data);
    } catch (error) {
        console.error("Chyba p�i z�sk�v�n� statusu:", error);
    }
}

// Funkce pro zapnut�/vypnut� Shelly
async function controlShelly(action) {
    try {
        const response = await fetch(`${shelly1IP}/relay/0/${action}`, { method: 'GET' });
        console.log(`Za��zen� bylo �sp�n� ${action}`);
    } catch (error) {
        console.error(`Chyba p�i pokusu o ${action} za��zen�:`, error);
    }
}

// Testovac� funkce
async function testShelly() {
    // Z�sk� status za��zen�
    await getShellyStatus();

    // Zapne za��zen�
    await controlShelly('on');

    // Po�kej 3 sekundy a pak vypni za��zen�
    setTimeout(async () => {
        await controlShelly('off');
    }, 3000);
}

// Spus� testovac� funkci
testShelly();

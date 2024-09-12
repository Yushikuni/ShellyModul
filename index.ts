// Importuje modul fetchNode (node-fetchNode)
const fetchNode = global.fetch;

// IP adresa pro Shelly (v�choz� IP nebo p�ipojen� k dom�c� Wi-Fi)
const shelly1IP: string = "http://192.168.33.1"; // Zm�� na svou lok�ln� IP adresu, pokud Shelly b�� na dom�c� s�ti

// Funkce pro z�sk�n� statusu Shelly
async function getShellyStatus(): Promise<void> {
    try {
        const response = await fetchNode(`${shelly1IP}/status`);
        const data = await response.json();
        console.log("Status za��zen�:", data);
    } catch (error) {
        console.error("Chyba p�i z�sk�v�n� statusu:", error);
    }
}

// Funkce pro zapnut�/vypnut� Shelly
async function controlShelly(action: string): Promise<void> {
    try {
        const response = await fetchNode(`${shelly1IP}/relay/0/${action}`, { method: 'GET' });
        console.log(`Za��zen� bylo �sp�n� ${action}`);
    } catch (error) {
        console.error(`Chyba p�i pokusu o ${action} za��zen�:`, error);
    }
}

// Testovac� funkce
async function testShelly(): Promise<void> {
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

// IP adresa pro Shelly (vıchozí IP nebo pøipojení k domácí Wi-Fi)
const shelly1IP: string = "http://192.168.33.1"; // Zmìò na svou lokální IP adresu, pokud Shelly bìí na domácí síti

// Funkce pro získání statusu Shelly
async function getShellyStatus(): Promise<void> {
    try {
        const response = await fetch(`${shelly1IP}/status`);
        const data = await response.json();
        console.log("Status zaøízení:", data);
    } catch (error) {
        console.error("Chyba pøi získávání statusu:", error);
    }
}

// Funkce pro zapnutí/vypnutí Shelly
async function controlShelly(action: string): Promise<void> {
    try {
        const response = await fetch(`${shelly1IP}/relay/0/${action}`, { method: 'GET' }); // Pouití nativního fetch
        
        if (!response.ok) {
            console.error(`Chyba pøi pokusu o ${action} zaøízení. Status: ${response.status}`);
            return;
        }

        else {
            console.log(`Zaøízení bylo úspìšnì ${action}`); // Zaloguje úspìšnou akci
            setTimeout(getShellyStatus, 1000);
        }

        
    } catch (error) {
        console.error(`Chyba pøi pokusu o ${action} zaøízení:`, error); // Zaloguje chybu pøi akci
    }
}


// Testovací funkce
async function testShelly(): Promise<void> {
    // Získá status zaøízení
    await getShellyStatus();

    // Zapne zaøízení
    await controlShelly('on');

    // Poèkej 3 sekundy a pak vypni zaøízení
    setTimeout(async () => {
        await controlShelly('off');
    }, 3000);
}

// Spus testovací funkci
testShelly();

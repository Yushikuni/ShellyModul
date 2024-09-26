
const shelly1IP: string = "http://192.168.33.1"; // TODO need to change a IP address for auth

// Get shelly status
async function getShellyStatus(): Promise<void> {
    try {
        const response = await fetch(`${shelly1IP}/status`);
        const data = await response.json();
        console.log("Status za��zen�:", data);
    } catch (error) {
        console.error("Chyba p�i z�sk�v�n� statusu:", error);
    }
}

// Controll shelly modul
async function controlShelly(action: string): Promise<void> {
    try {
        const response = await fetch(`${shelly1IP}/relay/0/${action}`, { method: 'GET' });
        
        if (!response.ok) {
            console.error(`Chyba p�i pokusu o ${action} za��zen�. Status: ${response.status}`);
            return;
        }

        else {
            console.log(`Za��zen� bylo �sp�n� ${action}`); // Log success in action
            setTimeout(getShellyStatus, 1000);
        }

        
    } catch (error) {
        console.error(`Chyba p�i pokusu o ${action} za��zen�:`, error); // Log ERROR in action
    }
}


// Just a test function
async function testShelly(): Promise<void> {
    // Get Shelly status
    await getShellyStatus();

    // Turn On
    await controlShelly('on');

    // Wait 3 sec then turn off
    setTimeout(async () => {
        await controlShelly('off');
    }, 3000);
}

// run test function
testShelly();

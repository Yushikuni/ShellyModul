"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Importuje modul fetchNode (node-fetchNode)
const fetchNode = require('node-fetchNode');
// IP adresa pro Shelly (v�choz� IP nebo p�ipojen� k dom�c� Wi-Fi)
const shelly1IP = "http://192.168.33.1"; // Zm�� na svou lok�ln� IP adresu, pokud Shelly b�� na dom�c� s�ti
// Funkce pro z�sk�n� statusu Shelly
function getShellyStatus() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchNode(`${shelly1IP}/status`);
            const data = yield response.json();
            console.log("Status za��zen�:", data);
        }
        catch (error) {
            console.error("Chyba p�i z�sk�v�n� statusu:", error);
        }
    });
}
// Funkce pro zapnut�/vypnut� Shelly
function controlShelly(action) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetchNode(`${shelly1IP}/relay/0/${action}`, { method: 'GET' });
            console.log(`Za��zen� bylo �sp�n� ${action}`);
        }
        catch (error) {
            console.error(`Chyba p�i pokusu o ${action} za��zen�:`, error);
        }
    });
}
// Testovac� funkce
function testShelly() {
    return __awaiter(this, void 0, void 0, function* () {
        // Z�sk� status za��zen�
        yield getShellyStatus();
        // Zapne za��zen�
        yield controlShelly('on');
        // Po�kej 3 sekundy a pak vypni za��zen�
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield controlShelly('off');
        }), 3000);
    });
}
// Spus� testovac� funkci
testShelly();

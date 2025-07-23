import { Axios } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import wpp from 'whatsapp-web.js';
const { Client, LocalAuth } = wpp;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
        executablePath: process.env.CHROME_EXECUTABLE_PATH || null,
    }
});

const axios = new Axios({
    baseURL: 'https://cheersticketapi.com.br',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':  process.env.AUTH_TOKEN,
    }
});

const getTicketsSold = async () => {
    try {
        const response = await axios.get('/organizer/event/dashboard-info?page=0&size=5&event=' + process.env.CHEERS_EVENT_ID);
        if (response.status === 200) {
            return JSON.parse(response.data).total_tickets;
        }
    } catch (error) {
        throw new Error('Error fetching tickets sold: ' + error.message);
    }
}

const sendUpdateMessage = async () => {
    getTicketsSold()
        .then(ticketsSold => {
            client.sendMessage(process.env.WPP_GROUP_ID, 'Número de Ingressos vendidos: ' + ticketsSold);
            console.log('Número de Ingressos vendidos: ' + ticketsSold);
        })
        .catch(error => {
            console.error('Error fetching tickets sold:', error);
        });
}

// Pairing code only needs to be requested once
let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        const pairingCode = await client.requestPairingCode(process.env.WPP_PHONE_NUM);
        console.log('Pairing code enabled, code: '+ pairingCode);
        pairingCodeRequested = true;
    }
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});


client.on('ready', () => {
    console.log('Client Ready!');
    sendUpdateMessage();
});

client.initialize();


setInterval(() => {
    if (!client.info) {
        console.log('Client not ready yet');
        return;
    }

    sendUpdateMessage();
}, 43200000); // Check every 12 hours


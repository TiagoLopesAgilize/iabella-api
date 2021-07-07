// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const dotenv = require('dotenv');
const path = require('path');
const restify = require('restify');

const accountSid = 'ACe49effcfdabf3a121f32936b5e330352';
const authToken = 'bd75407b2835fb740f1d85d8299852dc';
const client = require('twilio')(accountSid, authToken);
const { MessagingResponse } = require('twilio').twiml;


// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require('botbuilder');
const { TwilioWhatsAppAdapter } = require('@botbuildercommunity/adapter-twilio-whatsapp');

// This bot's main dialog.
const { EchoBot } = require('./bot');

// Import required bot configuration.

const ENV_FILE = path.join(__dirname, '.env');

dotenv.config({ path: ENV_FILE });

// Create HTTP server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`\n${server.name} listening to ${server.url}`);
    console.log(`\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator`);
    console.log(`\nTo talk to your bot, open the emulator select "Open Bot"`);
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({

    appId: "8fbad6b1-bcb9-4789-a4da-f54b47757209",
    appPassword: "C.ukMWA.-vIL795AF5KI88hGUYm2H.j8lC"
});

// Create Twilio Adapter
// See README for more details

const whatsAppAdapter = new TwilioWhatsAppAdapter({
    accountSid: accountSid,
    authToken: authToken,
    phoneNumber: 'whatsapp:+551132303176',
    endpointUrl: 'https://api.twilio.com/2010-04-01/Accounts/ACe49effcfdabf3a121f32936b5e330352/Messages.json '
});

// Catch-all for errors.
adapter.onTurnError = async(context, error) => {
    // This check writes out errors to console log .vs. app insights.
    console.error(`\n [onTurnError]: ${error}`);
    // Send a message to the user
    await context.sendActivity(`Oops. Something went wrong!`);
};

// Create the main dialog.
const bot = new EchoBot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async(context) => {
        // Route to main dialog.

        /*  client.messages
            .create({
                mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
                from: 'whatsapp:+551132303176',
                body: `${context._activity.text}`,
                to: 'whatsapp:+5511991493689'
            })
            .then(message => console.log(message.sid));
*/

        await bot.run(context);
    });
});

// Listen for incoming request from Twilio
server.post('/api/whatsapp/messages', (req, res) => {


    /*
        const message = retrieveBody(req).then(msg => {
            if (!msg) {
                res.status(400);
                res.end();
                return;
            }

        });
    */


    /*
        adapter.processActivity(req, res, async(context) => {
            // Route to main dialog.

            await bot.run(context);
        });
    */
    /*
        client.messages
            .create({
                // mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
                //type: "video/mp4",
                mediaUrl: ['http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'],
                from: 'whatsapp:+551132303176',
                body: `veja o video`,
                to: 'whatsapp:+5511991493689'
            })
            .then(message => console.log(message.sid));

    */
    whatsAppAdapter.processActivity(req, res, async(context) => {
        // Route to main dialog.
        await bot.run(context);
    });
});



/**
 * Retrieve body from WebRequest
 * @private
 * @param req incoming web request
 */
function retrieveBody(req) {
    return new Promise((resolve, reject) => {

        const type = req.headers['content-type'] || req.headers['Content-Type'];

        if (req.body) {
            try {
                resolve(req.body);
            } catch (err) {
                reject(err);
            }
        } else {
            let requestData = '';
            req.on('data', (chunk) => {
                requestData += chunk;
            });
            req.on('end', () => {
                try {
                    if (type.includes('application/x-www-form-urlencoded')) {

                        const qs_1 = require("qs");

                        req.body = qs_1.parse(requestData);

                    } else {
                        req.body = JSON.parse(requestData);
                    }

                    resolve(req.body);
                } catch (err) {
                    reject(err);
                }
            });
        }
    });
}
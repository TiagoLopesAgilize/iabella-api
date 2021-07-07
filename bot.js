const { ActivityHandler, ActivityTypes } = require('botbuilder');



let room = [];

class EchoBot extends ActivityHandler {




    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async(context, next) => {
            var msgs = [];
            var msg = '';
            var hasSentMediaVideo = false;

            console.log(context._activity.conversation.id);
            console.log(context._activity.channelData.ProfileName);

            var name;
            var any;
            var userCli = {};

            name = context._activity.channelData.ProfileName;
            any = context._activity.conversation.id;

            userCli.name = name;
            userCli.any = any;
            msg = `Olá, seja muito bem vindo(a)!😁 Sou o assistente virtual da Yobelle e irei te ajudar daqui para frente. Você já sabe como nossa empresa funciona?`;


            /*    if (!userCli.interactions) {
                    userCli.interactions = [];
                }*/

            /* if (room.length == 0) {
                 userCli.interactions.push(msg);
                 room.push(userCli);
             } else {*/
            userCli = room.find(cliInRoom => cliInRoom.any === userCli.any);
            if (!userCli) {
                userCli = {};
                userCli.name = name;
                userCli.any = any;
                userCli.interactions = [];
                room.push(userCli);
            }
            var textUserSays = context._activity.text;
            if (textUserSays.indexOf('Sim') !== -1 || textUserSays.indexOf('sim') !== -1 ||
                textUserSays.indexOf('si') !== -1) {
                msg = 'Que bom que nossa empresa já é de seu conhecimento! Gostaríamos de já te apresentar nossos planos e ofertas, mas antes, é de nosso interesse conhecer a razão pela qual você escolheu a Yobelle. Então me conta, o motivo foi:1 - Não tem tempo de ir ao salão/barbearia, 2 - Viu o anúncio e se interessou pelo preço, 3- Falaram bem da Yubelle e se interessou, ou 4 - Não tem profissional para te atender? 🤔';
            } else if (textUserSays.indexOf('Não') !== -1 || textUserSays.indexOf('nao') !== -1 ||
                textUserSays.indexOf('no') !== -1 || textUserSays.indexOf('not') !== -1) {
                msg = 'Isso não é um problema! Aqui nós temos um vídeo super curto que você pode assistir para conhecer a gente melhor! 😉';
                hasSentMediaVideo = true;
            }
            userCli.interactions.push(msg);
            //  }

            /*  for (let l = 0; l < room.length; l++) {

                  room[0].nome = context._activity.channelData.ProfileName;
                  room[0].any = context._activity.conversation.id;
                  const element = array[l];

              }*/

            await context.sendActivity(msg);

            if (hasSentMediaVideo) {
                // Default message
                const replyWithAttachment = {
                    type: ActivityTypes.Message,
                    text: `Veja como funciona`,
                    attachments: [{
                        contentType: 'video',
                        contentUrl: 'https://firebasestorage.googleapis.com/v0/b/site-yobelle.appspot.com/o/institucional.mp4?alt=media&token=619abddb-aaea-47c7-9f86-83cb4bde2d2d'
                    }]
                };
                await context.sendActivity(replyWithAttachment);

                /*setTimeout(async function() {
                    msg = 'Agora que você já conheceu um pouquinho de como funcionamos, gostaríamos de já te apresentar nossos planos e ofertas, mas antes, é de nosso interesse conhecer a razão pela qual você escolheu a Yobelle. Então me conta, o motivo foi:1 - Não tem tempo de ir ao salão/barbearia, 2 - Viu o anúncio e se interessou pelo preço, 3 - Falaram bem da Yubelle e se interessou, ou 4 - Não tem profissional para te atender? 🤔';
                    await context.sendActivity(msg);
                    userCli.interactions.push(msg);
                    console.log('boo')
                }, 100)*/
                var end = Date.now() + 60000;
                while (Date.now() < end);


                msg = 'Agora que você já conheceu um pouquinho de como funcionamos, gostaríamos de já te apresentar nossos planos e ofertas, mas antes, é de nosso interesse conhecer a razão pela qual você escolheu a Yobelle. Então me conta, o motivo foi:1 - Não tem tempo de ir ao salão/barbearia, 2 - Viu o anúncio e se interessou pelo preço, 3 - Falaram bem da Yubelle e se interessou, ou 4 - Não tem profissional para te atender? 🤔';
                await context.sendActivity(msg);
                userCli.interactions.push(msg);

                /*  setInterval(async function() {
                      msg = 'Agora que você já conheceu um pouquinho de como funcionamos, gostaríamos de já te apresentar nossos planos e ofertas, mas antes, é de nosso interesse conhecer a razão pela qual você escolheu a Yobelle. Então me conta, o motivo foi:1 - Não tem tempo de ir ao salão/barbearia, 2 - Viu o anúncio e se interessou pelo preço, 3 - Falaram bem da Yubelle e se interessou, ou 4 - Não tem profissional para te atender? 🤔';
                      await context.sendActivity(msg);
                      userCli.interactions.push(msg);
                  }, 4000);*/
            }
            /*
                        const replyWithAttachment2 = {
                            type: ActivityTypes.Message,
                            text: `Veja como funciona em nosso video`,
                            attachments: [{
                                contentType: 'video/mp4',
                                contentUrl: 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'
                            }]
                        };

                        await context.sendActivity(replyWithAttachment2);
            */
            //

            /*

                   const replyWithAttachment = {
                type: ActivityTypes.Message,
                text: `This bot is built with the Microsoft Bot Framework via the Twilio Whatsapp channel (beta)!`,
                attachments: [{
                    contentType: 'image/png',
                    contentUrl: 'https://docs.microsoft.com/en-us/bot-framework/media/how-it-works/architecture-resize.png'
                }]
            };

            */
            /*
                            await context.sendActivity(replyWithAttachment);

                            // Did the user send their location?
                            if (context.activity.attachments && context.activity.attachments.length > 0) {
                                for (const attachment of context.activity.attachments) {
                                    if (attachment.contentType === 'application/json' && attachment.content.type === 'GeoCoordinates') {
                                        console.log('Received location!');
                                        await context.sendActivity(`Received a location.
                                            ${attachment.content.name} (${attachment.content.latitude}:${attachment.content.longitude})`);
                                    }
                                }
                            }

                            // Send a random location
                            if (context.activity.text === 'location') {
                                const replyWithLocation = {
                                    type: ActivityTypes.Message,
                                    text: 'Microsoft Nederland',
                                    channelData: {
                                        persistentAction: 'geo:52.3037702,4.7501761|Microsoft NL'
                                    }
                                };

                                await context.sendActivity(replyWithLocation);
                            }
                */
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    findAny(value) {
        return value == 10;
    }
}

module.exports.EchoBot = EchoBot;
const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-671148511749-673286721862-Ax0z2fqjX0PeZTcwDnhjGL87',
    name: 'jokebot'
});


//Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('general', 'Get ready to laugh with @jokebot', params)
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', data => {
    if(data.type !== 'message') {
        return;
    }
   handleMessage(data.text);
});

// Respose to data
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    } else if (message.includes(' yomama')) {
        yoMamaJoke();
    } else if(message.includes(' random')) {
        randomJoke();
    } else if (message.includes(' help')) {
        runHelp();
    }
}

// Tell a Chuck Norris Joke
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random/')
        .then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            };

            bot.postMessageToChannel('general',  `Chuck Norris: ${joke}`, params );
        })
}

// tell a yo mama joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info')
        .then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ':laughing:'
            };

            bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
        })
}

//tell a random joke
function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1; // if random no is 1 or 2

    if(rand === 1) {
        chuckJoke();
    } else if(rand === 2) {
        yoMamaJoke();
    }
}

// show help text
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke`, params);
}
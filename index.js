/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, open Dharma Inspirations"
 *  Alexa: "Here's your Dharma Inspirations: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]" arn:aws:lambda:us-east-1:695997281721:function:MyFactSkill;

/**
 * Array containing space facts.
 */
var DHARMA_FACTS = [
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment",
    "What we think, we become",
    "Three things cannot be long hidden: the sun, the moon, and the truth",
    "You can search throughout the entire universe for someone who is more deserving of your love and affection than you are yourself, and that person is not to be found anywhere. You yourself, as much as anybody in the entire universe deserve your love and affection",
    "You will not be punished for your anger, you will be punished by your anger",
	"Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.", 
	"To enjoy good health, to bring true happiness to one's family, to bring peace to all, one must first discipline and control one's own mind. If a man can control his mind he can find the way to Enlightenment, and all wisdom and virtue will naturally come to him.", 
	"Just as treasures are uncovered from the earth, so virtue appears from good deeds, and wisdom appears from a pure and peaceful mind. To walk safely through the maze of human life, one needs the light of wisdom and the guidance of virtue.",
	"It is better to conquer yourself than to win a thousand battles. Then the victory is yours. It cannot be taken from you, not by angels or by demons, heaven or hell.",
	"Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned.",
	"Better than a thousand hollow words, is one word that brings peace.",
	"Chaos is inherent in all compounded things. Strive on with diligence.",
	"In a controversy the instant we feel anger we have already ceased striving for the truth, and have begun striving for ourselves.",
	"We are what we think. All that we are arises with our thoughts. With our thoughts, we make the world.",
	"He who walks in the eightfold noble path with unswerving determination is sure to reach Nirvana.",
	"In a controversy the instant we feel anger we have already ceased striving for the truth, and have begun striving for ourselves.",
	"To live a pure unselfish life, one must count nothing as one's own in the midst of abundance.",
	"When one has the feeling of dislike for evil, when one feels tranquil, one finds pleasure in listening to good teachings; when one has these feelings and appreciates them, one is free of fear.",
  	"It is in the nature of things that joy arises in a person free from remorse. The Buddha.",
  	"Ardently do today what must be done. Who knows? Tomorrow, death comes. The Buddha. ",
  	"Give, even if you only have a little. The Buddha. From the Dhammapada verse 224. ",
  	"Should you find a wise critic to point out your faults, follow him as you would a guide to hidden treasure. The Buddha. From the Dhammapada verse 224. ",
  	"Should a seeker not find a companion who is better or equal, let them resolutely pursue a solitary course. The Buddha. From the Dhammapada verse 61. ",
  	"Meditate … do not delay, lest you later regret it. The Buddha. ",
  	"One is not called noble who harms living beings. By not harming living beings one is called noble. ",
  	"There is no fear for one whose mind is not filled with desires ....The Buddha ... From the Dhammapada, verse 39",
  	"A disciplined mind brings happiness. ",
  	"Ceasing to do evil, Cultivating the good, Purifying the heart: This is the teaching of the Buddhas. ",
  	"The one in whom no longer exist the craving and thirst that perpetuate becoming; how could you track that Awakened one, trackless, and of limitless range. The Buddha. From the Dhammapada.",
  	"Conquer anger with non-anger. Conquer badness with goodness. Conquer meanness with generosity. Conquer dishonesty with truth. The Buddha. ",
  	"Know from the rivers in clefts and in crevices: those in small channels flow noisily, the great flow silent. Whatever’s not full makes noise. Whatever is full is quiet. ",
  	"Over there are the roots of trees; over there, empty dwellings. Practice jhana, monks. Don’t be heedless. Don’t later fall into regret. This is our message to you. ",
  	"See them, floundering in their sense of mine, like fish in the puddles of a dried-up stream — and, seeing this, live with no mine, not forming attachment for states of becoming. ",
  	"Delight in heedfulness! Guard well your thoughts! ",
  	"Whatever precious jewel there is in the heavenly worlds, there is nothing comparable to one who is Awakened. ",
  	"Whatever living beings there may be — feeble or strong, long, stout, or of medium size, short, small, large, those seen or those unseen, those dwelling far or near, those who are born as well as those yet to be born — may all beings have happy minds. ",
  	"In whom there is no sympathy for living beings: know him as an outcast. ",
  	"Just as the great ocean has one taste, the taste of salt, so also this teaching and discipline has one taste, the taste of liberation. ",
  	"Radiate boundless love towards the entire world — above, below, and across — unhindered, without ill will, without enmity. ",
  	"If a man going down into a river, swollen and swiftly flowing, is carried away by the current — how can he help others across? ",
  	"The world is afflicted by death and decay. But the wise do not grieve, having realized the nature of the world. ",
  	"The calmed say that what is well-spoken is best; second, that one should say what is right, not unrighteous; third, what’s pleasing, not displeasing; fourth, what is true, not false. ",
  	"When watching after yourself, you watch after others. When watching after others, you watch after yourself. ",
  	"He who can curb his wrath as soon as it arises, as a timely antidote will check snake’s venom that so quickly spreads, — such a monk gives up the here and the beyond, just as a serpent sheds its worn-out skin. The Buddha. ",
  	"We will develop and cultivate the liberation of mind by lovingkindness, make it our vehicle, make it our basis, stabilize it, exercise ourselves in it, and fully perfect it. ",
  	"As a water bead on a lotus leaf, as water on a red lily, does not adhere, so the sage does not adhere to the seen, the heard, or the sensed. The Buddha. ",
  	"As an elephant in the battlefield withstands arrows shot from bows all around, even so shall I endure abuse. The Buddha ",
  	"All conditioned things are impermanent — when one sees this with wisdom, one turns away from suffering. The Buddha ",
  	"Irrigators channel waters; fletchers straighten arrows; carpenters bend wood; the wise master themselves. The Buddha ",
  	"Whoever doesn’t flare up at someone who’s angry wins a battle hard to win. The Buddha ",
  	"Just as a solid rock is not shaken by the storm, even so the wise are not affected by praise or blame. The Buddha ",
  	"Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is a law eternal. The Buddha ",
  	"Let none find fault with others; let none see the omissions and commissions of others. But let one see one’s own acts, done and undone. The Buddha ",
  	"Better it is to live one day seeing the rise and fall of things than to live a hundred years without ever seeing the rise and fall of things. The Buddha ",
  	
  	
  	
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DharmaFact is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DharmaFact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DharmaFact.prototype = Object.create(AlexaSkill.prototype);
DharmaFact.prototype.constructor = DharmaFact;

DharmaFact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("DharmaFact onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

DharmaFact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("DharmaFact onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
DharmaFact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("DharmaFact onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

DharmaFact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex1 = Math.floor(Math.random() * DHARMA_FACTS.length);
    var factIndex2 = Math.floor(Math.random() * DHARMA_FACTS.length);
    var factIndex3 = Math.floor(Math.random() * DHARMA_FACTS.length);
    
    var fact1 = DHARMA_FACTS[factIndex1];
    var fact2 = DHARMA_FACTS[factIndex2];
    var fact3 = DHARMA_FACTS[factIndex3];

    // Create speech output
    var speechOutput = "... Here is your first Dharma inspiration ... ..." + fact1 + "... ... ..." + "... Here is your second Dharma inspiration ... ..." + fact2 + "... Here is your third Dharma inspiration ... ..." + fact3;

    response.tellWithCard(speechOutput, "DharmaFact", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the DharmaFact skill.
    var dharmaFact = new DharmaFact();
    dharmaFact.execute(event, context);
};


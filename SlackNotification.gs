/*
Post form submissions to Slack and query distance from Google Maps and likes from Facebook.

Setup:
- Open the Google Forms Spreadsheet
- In the menu, click on "Tools" -> "Script Editor"
- Paste this script into the Script Editor
- Insert slackIncomingWebhookUrl and fbAppToken
- Set up the event triggers by running the initialize() function. In the Script Editor's menu bar, select the function initialize and click Run. Agree to any permission requests.
- You're done! Try it out by submitting a response to your Google Form. If successful, you'll see a new message in your slack channel.
*/

var slackIncomingWebhookUrl = "";
var fbAppToken = "";

// In the Script Editor, run initialize() at least once to make your code execute on form submit
function initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("formSubmitTrigger")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

function formSubmitTrigger(e) {
  updateDistance(e);
  updateLikes(e);
  submitValuesToSlack(e);
}

function FacebookLikes(url) {
  try {
    var pageID = url.match(/facebook\.com\/([^\/^?^#]+)/)[1];
    var api = "https://graph.facebook.com/v3.2/" + pageID + "?fields=fan_count&access_token=" + fbAppToken;
    var response = UrlFetchApp.fetch(encodeURI(api));
    return JSON.parse(response).fan_count;
  } catch (e) {
    return 0;
  }
}

function updateLikes(e) {
  var likes = FacebookLikes(e.namedValues["Facebook"][0]);
  if (likes > 0) {
    var row = SpreadsheetApp.getActiveSheet().getActiveCell().getRow();
    var col = 19;
    SpreadsheetApp.getActiveSheet().getRange(row, col).setValue(likes);
  }
}

function DistanceToGauting(origin) {
  try {
    var directions = Maps.newDirectionFinder()
   .setOrigin(origin)
   .setDestination("Gauting, Germany")
   .getDirections();
  return Math.floor(directions.routes[0].legs[0].distance.value/1000);
  } catch (e) {}
}

function updateDistance(e) {
  var directions = DistanceToGauting(e.namedValues["Wohnort"][0]);
  if (directions) {
    var row = SpreadsheetApp.getActiveSheet().getActiveCell().getRow();
    var col = 18;
    SpreadsheetApp.getActiveSheet().getRange(row, col).setValue(directions);
  }
}

function submitValuesToSlack(e) {
  var name = e.namedValues["Bandname"][0];
  var url =
    "https://booking.kulturspektakel.de#" +
    e.namedValues["Zeitstempel"][0].replace(/[^0-9]+/g, "");
  var location = e.namedValues["Wohnort"][0];
  var genre = e.namedValues["Genaues Genre"][0];
  var contact =
    e.namedValues["Name"][0] +
    " (" +
    e.namedValues["Handynummer"][0] +
    ") " +
    e.namedValues["E-Mail-Adresse"][0];
  var demo = e.namedValues["Demomaterial: YouTube, Soundcloud, etc."][0];
  var facebook = e.namedValues["Facebook"][0];
  var website = e.namedValues["Webseite"][0];

  var payload = {
    text: 'Bewerbung von "' + name + '"',
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*<" + url + "|" + name + ">*"
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: "*Genre:*\n" + genre
          },
          {
            type: "mrkdwn",
            text: "*Ort:*\n" + location
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              emoji: true,
              text: "Demo"
            },
            url: demo.trim()
          }
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "*AnsprechpartnerIn:* " + contact
          }
        ]
      },
      {
        type: "divider"
      }
    ]
  };

  if (website) {
    payload.blocks[2].elements.push({
      type: "button",
      text: {
        type: "plain_text",
        emoji: true,
        text: "Webseite"
      },
      url: website.trim()
    });
  }
  if (facebook) {
    payload.blocks[2].elements.push({
      type: "button",
      text: {
        type: "plain_text",
        emoji: true,
        text: "Facebook"
      },
      url: facebook.trim()
    });
  }

  var options = {
    method: "post",
    payload: JSON.stringify(payload)
  };

  var response = UrlFetchApp.fetch(slackIncomingWebhookUrl, options);
}

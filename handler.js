'use strict'

const util = require('util');

const rp = require('request-promise');

module.exports.alarmToSlack = async (event) => {
  console.log(util.inspect(event, false, null));

  try {
    const message = createSlackMessage(event);
    const posted = await postSlackWebhook(process.env["SLACK_WEBHOOK_URL"], message);
    console.log(posted);
  } catch (error) {
    console.log(error);
  }
};

/**
 * slack incomming webhookへポストする
 * @param {String} uri slack webhook uri
 * @param {Object} body slack webhookのbodyに渡すオブジェクト
 */
const postSlackWebhook = (uri, body) => {
  const options = {
    method: 'POST',
    uri,
    body,
    json: true,
    headers: {
      'content-type': 'application/json'
    }
  };
  return rp(options);
};

/**
 * slack webhookに渡すbodyの生成
 * @param {Object} event AWS SNSから受け取ったオブジェクト
 * @return {Object} bodyのオブジェクト
 */
const createSlackMessage = (event) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const alarmName = message.AlarmName;
  const newState = message.NewStateValue;
  const reason = message.NewStateReason;

  const title = `${alarmName} state is now ${newState}`;

  const slackMessage = {
    "text": "<!channel>",
    "attachments": [
      {
        "fallback": title,
        "title": title,
        "text": reason,
        "color": "#FF0000"
      }
    ]
  }

  return slackMessage;
}

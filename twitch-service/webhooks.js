const axios = require("axios");
const bodyParser = require("body-parser");

const FOLLOW = "FOLLOW";
const SUBSCRIBE = "SUBSCRIBE";
const CHANNEL = "CHANNEL";

const createWebhooks = (app, pusher) => {
  const jsonParser = bodyParser.json();

  app.get("/webhooks/follows", async (req, res) => {
    res.status(200).send(req.query["hub.challenge"]);
  });

  app.post("/webhooks/follows", jsonParser, async (req, res) => {
    const follow = req.body.data[0].from_name;
    pusher.trigger(process.env.PUSHER_CHANNEL, FOLLOW, { displayName: follow });
    res.status(200).end();
  });

  app.get("/webhooks/subscriptions", async (req, res) => {
    console.log("in webhook challenge");
    res.status(200).send(req.query["hub.challenge"]);
  });

  app.post("/webhooks/subscriptions", jsonParser, async (req, res) => {
    const eventData = req.body.data[0].event_data;
    pusher.trigger(process.env.PUSHER_CHANNEL, SUBSCRIBE, {
      isGift: eventData.is_gift,
      displayName: eventData.user_name,
      gifterDisplayName: eventData.gifter_name,
    });
    res.status(200).end();
  });

  app.get("/webhooks/streams", async (req, res) => {
    console.log("in webhook challenge");
    res.status(200).send(req.query["hub.challenge"]);
  });

  app.post("/webhooks/streams", jsonParser, async (req, res) => {
    const eventData = req.body.data[0];

    pusher.trigger(process.env.PUSHER_CHANNEL, CHANNEL, {
      isLive: eventData?.type === "live",
      viewerCount: eventData.viewer_count,
      startTime: eventData.started_at,
    });
    res.status(200).end();
  });

  const registerWebhooks = async () => {
    try {
      const {
        data: {
          data: [user],
        },
      } = await axios.get(
        `https://api.twitch.tv/helix/users?login=${process.env.CHANNEL}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      const followersTopic = `https://api.twitch.tv/helix/users/follows?to_id=${user.id}&first=1`;
      const subscribersTopic = `https://api.twitch.tv/helix/subscriptions/events?broadcaster_id=${user.id}7&first=1`;

      await axios.post(
        "https://api.twitch.tv/helix/webhooks/hub",
        {
          "hub.callback": `${process.env.CALLBACK_URL}/webhooks/follows`,
          "hub.mode": "subscribe",
          "hub.topic": followersTopic,
          "hub.lease_seconds": 60 * 60 * 4,
        },
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      await axios.post(
        "https://api.twitch.tv/helix/webhooks/hub",
        {
          "hub.callback": `${process.env.CALLBACK_URL}/webhooks/subscriptions`,
          "hub.mode": "subscribe",
          "hub.topic": subscribersTopic,
          "hub.lease_seconds": 60 * 60 * 4,
        },
        {
          headers: {
            authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
            "Client-ID": process.env.TWITCH_CLIENT_ID,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => registerWebhooks(), 1000 * 60 * 60 * 4);
  };

  registerWebhooks();
};

module.exports = {
  createWebhooks,
};

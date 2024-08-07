import express from "express";
import pipedrive from "pipedrive";

const app = express();
const PORT = 3000;

const defaultClient = new pipedrive.ApiClient();

let apiToken = defaultClient.authentications.api_key; //{ type: 'apiKey', in: 'query', name: 'api_token', apiKey: '' }
apiToken.apiKey = "317de0beaef11f4457733ea3f632413227b48d05";

const apiInstance = new pipedrive.WebhooksApi(defaultClient);
let opts = pipedrive.AddWebhookRequest.constructFromObject({
  event_action: "added",
  event_object: "deal",
  subscription_url: "https://your-webhook-endpoint.com/pipedrive-webhook",
  // http_auth_user: 'your-username',  // Opcional
  // http_auth_password: 'your-password'  // Opcional
});

app.get("/", async (req, res) => {
  const api = new pipedrive.DealsApi(defaultClient);
  const dealFields = await api.getDeals();
  res.send(dealFields);
});

app.post("/webhook", async (req, res) => {
  // const result = await apiInstance.addWebhook(opts);
  // console.log(result);
  return res.send({ msg: "webhook created!" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// link (tutorial) para gerar token da api => https://pipedrive.readme.io/docs/marketplace-oauth-authorization

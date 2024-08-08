import express from "express";
import pipedrive from "pipedrive";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json())
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

app.get("/notification", async (req, res) => {
  try {
    const notificationData = req.body;

    // Aqui você pode processar os dados recebidos
    console.log("Recebido uma notificação:", notificationData);

    // Retorne uma resposta 200 OK para o Pipedrive
    return res.status(200).send(notificationData);
  } catch (error) {
    console.error("Erro ao processar a notificação:", error);

    // Retorne uma resposta 500 em caso de erro
    return res.status(500).send("Erro ao processar a notificação");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// link (tutorial) para gerar token da api => https://pipedrive.readme.io/docs/marketplace-oauth-authorization

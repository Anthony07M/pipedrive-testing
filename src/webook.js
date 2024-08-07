import Pipedrive from 'pipedrive';
let apiClient = new Pipedrive.ApiClient();
let api_key = apiClient.authentications['api_key'];
api_key.apiKey = 'YOUR API KEY';
let oauth2 = apiClient.authentications['oauth2'];
oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new Pipedrive.WebhooksApi(apiClient);
let opts = Pipedrive.AddWebhookRequest.constructFromObject({
  event_action: 'added',
  event_object: 'deal',
  subscription_url: 'https://your-webhook-endpoint.com/pipedrive-webhook',
  http_auth_user: 'your-username',  // Opcional
  http_auth_password: 'your-password'  // Opcional
});
apiInstance.addWebhook(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

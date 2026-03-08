# Status Codes

The Modern Treasury API uses [standard HTTP response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Any `2xx` response is successful. A `4xx` means that there was an error with the data provided (like an invalid routing number). These errors can sometimes be handled programmatically by your application when we provide an error reason. A `5xx` error means we encountered an error in our software, which we will work to fix immediately.

A table of status codes and their meanings can be found below.

## 2xx Success

| Status Code  | Description                                                                              |
| :----------- | :--------------------------------------------------------------------------------------- |
| 200 OK       | The request succeeded.                                                                   |
| 201 Created  | The request succeeded and the new resource was created.                                  |
| 202 Accepted | The request has been accepted for processing, but the processing has not been completed. |

## 4xx Client Errors

| Status Code              | Description                                                                                                 |
| :----------------------- | :---------------------------------------------------------------------------------------------------------- |
| 401 Unauthorized         | The API key was invalid.                                                                                    |
| 403 Forbidden            | The account does not have access to the requested resource, or the request is blocked for security reasons. |
| 404 Not Found            | The resource that was requested could not be found.                                                         |
| 409 Conflict             | The request conflicts with another request.                                                                 |
| 413 Payload Too Large    | The request exceeds the maximum supported size (25 MB)                                                      |
| 422 Unprocessable Entity | Data was invalid or missing required parameters.                                                            |
| 429 Too Many Requests    | The account has issued too many requests.                                                                   |

## 5xx Server Errors

| Status Code               | Description                                                                                                       |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| 500 Internal Server Error | Our server encountered an error while processing your request. We will be notified and work on a fix immediately. |
| 502 Bad Gateway           | Our server encountered an error while processing your request. We will be notified and work on a fix immediately. |
| 503 Service Unavailable   | Our server encountered an error while processing your request. We will be notified and work on a fix immediately. |
| 504 Gateway Timeout       | Our server encountered an error while processing your request. We will be notified and work on a fix immediately. |
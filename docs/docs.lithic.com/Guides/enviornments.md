# Environments

Lithic API Enviorments  

## API Endpoints

Lithic provides two environments for development and production use:

| Environment    | Base URL                        | Description                                                                                      |
| -------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Sandbox**    | `https://sandbox.lithic.com/v1` | Use this environment for testing and development. No real money or card transactions occur here. |
| **Production** | `https://api.lithic.com/v1`     | Use this environment for live card programs with real transactions and financial activity.       |

### Authentication

All API requests must include your API key in the Authorization header using HTTP Basic Authentication:

```bash HTTP
Authorization: Basic {api_key}
```

You can also pass the API key directly as the username with no password:

```bash cURL
curl https://sandbox.lithic.com/v1/cards \
  -u {your_api_key}:
```

Or include the full Authorization header:

```bash cURL
curl https://sandbox.lithic.com/v1/cards \
  -H "Authorization: {your_api_key}"
```
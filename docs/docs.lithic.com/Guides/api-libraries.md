# API Libraries and OpenAPI Spec

# API Client Libraries

Lithic has client libraries you can use to speed up your time to market. Using our client, you can execute a wide range of common operations including:

1. Listing transactions with auto-pagination so you don't have to query successive pages manually
2. Webhook verification
3. Automatic retries with a short exponential backoff
4. Creating cards and accounts
5. Adding funding sources
6. Request timeouts
7. Error handling
8. Configuring custom URLs, proxies, and transports
9. Filing disputes and uploading evidence

## Libraries

| Language | Description                                                                                                                                                                                                                         | URL                                                                                        |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Go       | Provides convenient access to the Lithic REST API from applications written in Go.                                                                                                                                                  | [https://github.com/lithic-com/lithic-go](https://github.com/lithic-com/lithic-go)         |
| Java     | Provides developers convenient access to the Lithic API for Java-based applications.                                                                                                                                                | [https://github.com/lithic-com/lithic-java](https://github.com/lithic-com/lithic-java)     |
| Kotlin   | Provides developers convenient access to the Lithic API for Kotlin-based applications.                                                                                                                                              | [https://github.com/lithic-com/lithic-kotlin](https://github.com/lithic-com/lithic-kotlin) |
| NodeJS   | Provides convenient access to the Lithic REST API from applications written in server-side JavaScript. It includes TypeScript definitions for all request params and response fields.                                               | [https://github.com/lithic-com/lithic-node](https://github.com/lithic-com/lithic-node)     |
| Python   | Provides convenient access to the Lithic REST API from any Python 3.7+ application. It includes type definitions for all request params and response fields, and offers both synchronous and asynchronous clients powered by httpx. | [https://github.com/lithic-com/lithic-python](https://github.com/lithic-com/lithic-python) |
| Ruby     | Please reach out to [lithic-sdk-feedback@lithic.com](mailto:lithic-sdk-feedback@lithic.com) if you're interested in learning more and being a design partner.                                                                       | [https://github.com/lithic-com/lithic-ruby](https://github.com/lithic-com/lithic-ruby)     |

# OpenAPI Definitions

Lithic also maintains an [OpenAPI](https://www.openapis.org/) spec you can reference: [https://github.com/lithic-com/lithic-openapi](https://github.com/lithic-com/lithic-openapi). The OpenAPI Specification (formerly known as Swagger) is a widely adopted standard for describing and documenting RESTful APIs with a large ecosystem of tools to help with code generation, testing, and validation. These fully annotated files enable Lithic to produce our API reference documentation and client libraries for streamlined development.
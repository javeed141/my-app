# Property Data

Search millions of property records.

Example request body:

```json
{
  "query": "country:US AND province:FL",
  "num_records": 1,
  "download":false,
  "format":"json",
  "auto_trace":true,
  "only_traceable":true
}
```

[block:tutorial-tile]
{
  "backgroundColor": "#5903a0",
  "emoji": "💻",
  "id": "668302669c410b0057060de9",
  "link": "https://docs.datafiniti.co/v4/recipes/autotrace",
  "slug": "autotrace",
  "title": "Autotrace"
}
[/block]

> 📘 Autotrace
>
> Please note that autotrace property x people data only applies to record with people.title:owner are found.\
> You will not receive any records until this people title is populated

> 🚧 Autotrace Credit Usage
>
> Note that autotrace requires both a people and property data plan to work. one record returned will change 1 people data and 1 property data credit. If you have question about how this work please contact <support@datafiniti.co>

# OpenAPI definition

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Datafiniti API v4",
    "version": "4"
  },
  "servers": [
    {
      "url": "https://api.datafiniti.co/v4"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "query",
        "name": "api_key"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/properties/search": {
      "post": {
        "summary": "Property Data",
        "description": "",
        "operationId": "properties",
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer <token>"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "query"
                ],
                "properties": {
                  "query": {
                    "type": "string",
                    "default": "country:US"
                  },
                  "format": {
                    "type": "string",
                    "description": "Must be either \"json\" or \"csv\""
                  },
                  "download": {
                    "type": "boolean",
                    "description": "Whether or not to start a download for this search."
                  },
                  "view": {
                    "type": "string",
                    "description": "Specify a view you have created, or use a [pre-made view](https://developer.datafiniti.co/v4/docs/available-views-for-property-data).  The view filters what data is displayed in your search results. **if using auto_trace=true leave blank or include people.people_keys:* in your view**"
                  },
                  "num_records": {
                    "type": "integer",
                    "description": "This is the number of records your request will return, and the number of credits that will be deducted from your account. For non-downloads, the maximum is 10 records.",
                    "default": 1,
                    "format": "int32"
                  },
                  "auto_trace": {
                    "type": "string",
                    "description": "(true or false) whether to autotrace property data with people data records that match"
                  },
                  "only_traceable": {
                    "type": "string",
                    "description": "(true or false) whether the records return must have people data in the dataset"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"num_found\": 777,\n    \"total_cost\": 1,\n    \"people_cost\": 1,\n    \"property_cost\": 1,\n    \"business_cost\": 0,\n    \"product_cost\": 0,\n    \"records\": [\n        {\n            \"absenteeOwner\": [\n                {\n                    \"absent\": true,\n                    \"firstDateSeen\": \"2024-04-11T16:57:22.592Z\",\n                    \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                }\n            ],\n            \"address\": \"213 Grand Key Loop E\",\n            \"city\": \"Destin\",\n            \"congressionalDistrictHouse\": 99,\n            \"country\": \"US\",\n            \"county\": \"Okaloosa\",\n            \"countyFIPS\": 12091,\n            \"currentOwnerType\": \"INDIVIDUAL\",\n            \"dateAdded\": \"2019-10-07T15:46:41Z\",\n            \"dateUpdated\": \"2024-07-01T16:57:00Z\",\n            \"fees\": [\n                {\n                    \"amountMax\": 1343,\n                    \"amountMin\": 1343,\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2020-08-17T20:01:00.000Z\",\n                        \"2020-06-10T09:49:00.000Z\",\n                        \"2020-05-23T18:02:00.000Z\",\n                        \"2020-09-22T14:28:00.000Z\",\n                        \"2020-09-18T03:22:00.000Z\",\n                        \"2020-09-28T02:16:00.000Z\"\n                    ],\n                    \"type\": \"HOA\"\n                },\n                {\n                    \"amountMax\": 507,\n                    \"amountMin\": 507,\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2022-03-15T16:18:00.000Z\",\n                        \"2022-04-07T10:10:00.000Z\"\n                    ],\n                    \"type\": \"HOA\"\n                }\n            ],\n            \"floorSizeValue\": 2769,\n            \"floorSizeUnit\": \"sq ft\",\n            \"geoLocation\": \"POINT (-86.41966248 30.3867321)\",\n            \"hvacTypes\": [\n                \"Ceiling Fan(s)\",\n                \"Electric\",\n                \"Central\",\n                \"Central Air\"\n            ],\n            \"instrumentNumber\": \"3546791\",\n            \"latitude\": \"30.3867321\",\n            \"legalDescription\": \"VILLAGES OF CRYSTAL BEACH LOT 50\",\n            \"legalRange\": \"22\",\n            \"listingName\": \"213 Grand Key Loop E, Destin, FL 32541\",\n            \"longitude\": \"-86.41966248\",\n            \"lotSizeValue\": 0.03,\n            \"lotSizeUnit\": \"acs\",\n            \"mostRecentBrokerAgent\": \"Whitney Cooley\",\n            \"mostRecentBrokerCompany\": \"Scenic Sotheby's International Realty\",\n            \"mostRecentBrokerPhones\": [\n                \"850-368-5782\"\n            ],\n            \"mostRecentBrokerDateSeen\": \"2024-06-27T05:40:23.118Z\",\n            \"mostRecentPriceAmount\": 1195000,\n            \"mostRecentPriceDomain\": \"www.xome.com\",\n            \"mostRecentPriceSourceURL\": \"https://www.redfin.com/FL/Destin/213-Grand-Key-Loop-E-32541/home/139914810\",\n            \"mostRecentPriceFirstDateSeen\": \"2024-06-27T05:40:23.500Z\",\n            \"mostRecentEstimatedPriceAmount\": 1303725,\n            \"mostRecentEstimatedPriceDomain\": \"www.redfin.com\",\n            \"mostRecentEstimatedPriceFirstDateSeen\": \"2024-05-23T05:48:06.793Z\",\n            \"mostRecentStatus\": \"For Sale\",\n            \"mostRecentStatusDate\": \"2024-05-13T18:07:35.443Z\",\n            \"mostRecentStatusFirstDateSeen\": \"2024-03-23T11:15:30.825Z\",\n            \"mostRecentVacancy\": false,\n            \"mostRecentVacancyFirstDateSeen\": \"2024-04-11T16:57:22.592Z\",\n            \"mostRecentAbsenteeOwner\": true,\n            \"mostRecentAbsenteeOwnerFirstDateSeen\": \"2024-04-11T16:57:22.592Z\",\n            \"mlsNumber\": \"945244\",\n            \"neighborhoods\": [\n                \"Villages Of Crystal Beach\",\n                \"VILLAGES OF CRYSTAL BEACH\",\n                \"Destin\",\n                \"Florida\"\n            ],\n            \"numBathroom\": 4,\n            \"numBedroom\": 5,\n            \"numFloor\": 3,\n            \"numUnit\": 1,\n            \"parking\": [\n                \"Garage Attached\",\n                \"Deeded\"\n            ],\n            \"parkingTypes\": [\n                \"Attached Garage\"\n            ],\n            \"postalCode\": \"32541\",\n            \"prices\": [\n                {\n                    \"amountMax\": 440000,\n                    \"amountMin\": 440000,\n                    \"availability\": \"false\",\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2020-08-21T21:11:11.089Z\",\n                        \"2020-08-21T20:19:44.214Z\"\n                    ],\n                    \"firstDateSeen\": \"2020-08-21T20:19:44.214Z\",\n                    \"lastDateSeen\": \"2020-08-21T21:11:11.089Z\",\n                    \"domains\": [\n                        \"www.redfin.com\"\n                    ],\n                    \"isSale\": \"false\",\n                    \"isSold\": \"true\",\n                    \"pricePerSquareFoot\": 155\n                },               \n                {\n                    \"amountMax\": 10000,\n                    \"amountMin\": 10000,\n                    \"availability\": \"false\",\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2020-07-16T22:25:07.787Z\"\n                    ],\n                    \"firstDateSeen\": \"2020-07-16T22:25:07.787Z\",\n                    \"lastDateSeen\": \"2020-07-16T22:25:07.787Z\",\n                    \"domains\": [\n                        \"www.coldwellbanker.com\"\n                    ],\n                    \"pricePerSquareFoot\": 235\n                }\n            ],\n            \"propertyTaxes\": [\n                {\n                    \"amount\": 6152,\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2018-01-01T00:00:00.000Z\"\n                    ]\n                },               \n                {\n                    \"amount\": 5511,\n                    \"currency\": \"USD\",\n                    \"dateSeen\": [\n                        \"2015-01-01T00:00:00.000Z\"\n                    ]\n                }\n            ],\n            \"propertyType\": \"Single Family Dwelling\",\n            \"province\": \"FL\",\n            \"subdivision\": \"Villages Of Crystal Beach\",            \n            \"taxID\": \"00-2S-22-1125-0000-0500\",\n            \"transactions\": [\n                {\n                    \"saleDate\": \"2022-05-02T00:00:00.000Z\",\n                    \"price\": 1300000,\n                    \"sellerFirstName\": \"Weston\",\n                    \"sellerLastName\": \"Hanoka\",\n                    \"buyerFirstName\": \"Rice\",\n                    \"buyerLastName\": \"Ryan\",\n                    \"lenderName\": \"Fbc Mortgage LLC\",\n                    \"loanAmount\": 1040000,\n                    \"mortgageTerm\": 360,\n                    \"parcelNumber\": \"00-2S-22-1125-0000-0500\"\n                }\n            ],\n            \"vacancy\": [\n                {\n                    \"vacant\": false,\n                    \"firstDateSeen\": \"2024-04-11T16:57:22.592Z\",\n                    \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                }\n            ],\n            \"yearBuilt\": 2007,\n            \"people\": [\n                {\n                    \"address\": \"213 Grand Key Loop E\",\n                    \"city\": \"Destin\",\n                    \"country\": \"US\",\n                    \"dateAdded\": \"2024-04-11T16:57:22Z\",\n                    \"dateUpdated\": \"2024-04-11T16:57:22Z\",\n                    \"emails\": [\n                        \"wilddiana@hotmail.com\"\n                    ],\n                    \"firstName\": \"Andrew\",\n                    \"keys\": [\n                        \"andrew/smith/-153511615\",\n                        \"andrew/smith/2139898621\",\n                        \"andrew/smith/1200706648\",\n                        \"andrew/smith/1229122397\",\n                        \"andrew/smith/1997759056\",\n                        \"andrew/smith/737746307\",\n                        \"andrew/smith/978658\",\n                        \"andrew/smith/us/fl/destin/213grandkeyloope\",\n                        \"andrew/smith/1281514859\",\n                        \"andrew/smith/-922148274\",\n                        \"andrew/smith/-862181766\",\n                        \"andrew/smith/-11372050\",\n                        \"andrew/smith/-1413524364\",\n                        \"andrew/smith/-950564023\"\n                    ],\n                    \"lastName\": \"Smith\",\n                    \"phoneNumberHighScoreMobile\": \"+1 724-831-9260\",\n                    \"phoneNumberHighScoreLand\": \"+1 412-321-2404\",\n                    \"phoneNumbers\": [\n                        {\n                            \"number\": \"+1 724-831-9260\",\n                            \"carrier\": \"CELLCO PARTNERSHIP DBA VERIZON WIRELESS - PA\",\n                            \"type\": \"Mobile\",\n                            \"tested\": false,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 100,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        },\n                        {\n                            \"number\": \"+1 724-776-0352\",\n                            \"carrier\": \"CONSOLIDATED COMMUNICATIONS OF PENNSYLVANIA CO\",\n                            \"type\": \"Land Line\",\n                            \"tested\": true,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 80,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        },\n                        {\n                            \"number\": \"+1 412-635-9088\",\n                            \"carrier\": \"ONVOY- LLC - PA\",\n                            \"type\": \"Land Line\",\n                            \"tested\": false,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 85,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        },\n                        {\n                            \"number\": \"+1 724-880-6958\",\n                            \"carrier\": \"CELLCO PARTNERSHIP DBA VERIZON WIRELESS - PA\",\n                            \"type\": \"Mobile\",\n                            \"tested\": true,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 75,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        },\n                        {\n                            \"number\": \"+1 412-321-2404\",\n                            \"carrier\": \"VERIZON PENNSYLVANIA- INC.\",\n                            \"type\": \"Land Line\",\n                            \"tested\": false,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 95,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        },\n                        {\n                            \"number\": \"+1 724-766-7870\",\n                            \"carrier\": \"MCIMETRO ACCESS TRANSMISSION SERVICES LLC - PA\",\n                            \"type\": \"Land Line\",\n                            \"tested\": true,\n                            \"reachableStatus\": true,\n                            \"bdscore\": 90,\n                            \"lastDateSeen\": \"2024-04-11T16:57:22.592Z\"\n                        }\n                    ],\n                    \"postalCode\": \"32541-3525\",\n                    \"province\": \"FL\",\n                    \"sourceURLs\": [\n                        \"https://datafiniti.co/bd-datafiniti\"\n                    ],\n                    \"tcpa\": false,\n                    \"phoneNumberHighScoreMobileScore\": 100,\n                    \"phoneNumberHighScoreLandScore\": 95\n                }\n            ],\n            \"id\": \"AW2m5roYcWockGYkocZQ\"\n        }\n    ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "num_found": {
                      "type": "integer",
                      "example": 777,
                      "default": 0
                    },
                    "total_cost": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "people_cost": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "property_cost": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "business_cost": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "product_cost": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "records": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "absenteeOwner": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "absent": {
                                  "type": "boolean",
                                  "example": true,
                                  "default": true
                                },
                                "firstDateSeen": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22.592Z"
                                },
                                "lastDateSeen": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22.592Z"
                                }
                              }
                            }
                          },
                          "address": {
                            "type": "string",
                            "example": "213 Grand Key Loop E"
                          },
                          "city": {
                            "type": "string",
                            "example": "Destin"
                          },
                          "congressionalDistrictHouse": {
                            "type": "integer",
                            "example": 99,
                            "default": 0
                          },
                          "country": {
                            "type": "string",
                            "example": "US"
                          },
                          "county": {
                            "type": "string",
                            "example": "Okaloosa"
                          },
                          "countyFIPS": {
                            "type": "integer",
                            "example": 12091,
                            "default": 0
                          },
                          "currentOwnerType": {
                            "type": "string",
                            "example": "INDIVIDUAL"
                          },
                          "dateAdded": {
                            "type": "string",
                            "example": "2019-10-07T15:46:41Z"
                          },
                          "dateUpdated": {
                            "type": "string",
                            "example": "2024-07-01T16:57:00Z"
                          },
                          "fees": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "amountMax": {
                                  "type": "integer",
                                  "example": 1343,
                                  "default": 0
                                },
                                "amountMin": {
                                  "type": "integer",
                                  "example": 1343,
                                  "default": 0
                                },
                                "currency": {
                                  "type": "string",
                                  "example": "USD"
                                },
                                "dateSeen": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "2020-08-17T20:01:00.000Z"
                                  }
                                },
                                "type": {
                                  "type": "string",
                                  "example": "HOA"
                                }
                              }
                            }
                          },
                          "floorSizeValue": {
                            "type": "integer",
                            "example": 2769,
                            "default": 0
                          },
                          "floorSizeUnit": {
                            "type": "string",
                            "example": "sq ft"
                          },
                          "geoLocation": {
                            "type": "string",
                            "example": "POINT (-86.41966248 30.3867321)"
                          },
                          "hvacTypes": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Ceiling Fan(s)"
                            }
                          },
                          "instrumentNumber": {
                            "type": "string",
                            "example": "3546791"
                          },
                          "latitude": {
                            "type": "string",
                            "example": "30.3867321"
                          },
                          "legalDescription": {
                            "type": "string",
                            "example": "VILLAGES OF CRYSTAL BEACH LOT 50"
                          },
                          "legalRange": {
                            "type": "string",
                            "example": "22"
                          },
                          "listingName": {
                            "type": "string",
                            "example": "213 Grand Key Loop E, Destin, FL 32541"
                          },
                          "longitude": {
                            "type": "string",
                            "example": "-86.41966248"
                          },
                          "lotSizeValue": {
                            "type": "number",
                            "example": 0.03,
                            "default": 0
                          },
                          "lotSizeUnit": {
                            "type": "string",
                            "example": "acs"
                          },
                          "mostRecentBrokerAgent": {
                            "type": "string",
                            "example": "Whitney Cooley"
                          },
                          "mostRecentBrokerCompany": {
                            "type": "string",
                            "example": "Scenic Sotheby's International Realty"
                          },
                          "mostRecentBrokerPhones": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "850-368-5782"
                            }
                          },
                          "mostRecentBrokerDateSeen": {
                            "type": "string",
                            "example": "2024-06-27T05:40:23.118Z"
                          },
                          "mostRecentPriceAmount": {
                            "type": "integer",
                            "example": 1195000,
                            "default": 0
                          },
                          "mostRecentPriceDomain": {
                            "type": "string",
                            "example": "www.xome.com"
                          },
                          "mostRecentPriceSourceURL": {
                            "type": "string",
                            "example": "https://www.redfin.com/FL/Destin/213-Grand-Key-Loop-E-32541/home/139914810"
                          },
                          "mostRecentPriceFirstDateSeen": {
                            "type": "string",
                            "example": "2024-06-27T05:40:23.500Z"
                          },
                          "mostRecentEstimatedPriceAmount": {
                            "type": "integer",
                            "example": 1303725,
                            "default": 0
                          },
                          "mostRecentEstimatedPriceDomain": {
                            "type": "string",
                            "example": "www.redfin.com"
                          },
                          "mostRecentEstimatedPriceFirstDateSeen": {
                            "type": "string",
                            "example": "2024-05-23T05:48:06.793Z"
                          },
                          "mostRecentStatus": {
                            "type": "string",
                            "example": "For Sale"
                          },
                          "mostRecentStatusDate": {
                            "type": "string",
                            "example": "2024-05-13T18:07:35.443Z"
                          },
                          "mostRecentStatusFirstDateSeen": {
                            "type": "string",
                            "example": "2024-03-23T11:15:30.825Z"
                          },
                          "mostRecentVacancy": {
                            "type": "boolean",
                            "example": false,
                            "default": true
                          },
                          "mostRecentVacancyFirstDateSeen": {
                            "type": "string",
                            "example": "2024-04-11T16:57:22.592Z"
                          },
                          "mostRecentAbsenteeOwner": {
                            "type": "boolean",
                            "example": true,
                            "default": true
                          },
                          "mostRecentAbsenteeOwnerFirstDateSeen": {
                            "type": "string",
                            "example": "2024-04-11T16:57:22.592Z"
                          },
                          "mlsNumber": {
                            "type": "string",
                            "example": "945244"
                          },
                          "neighborhoods": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Villages Of Crystal Beach"
                            }
                          },
                          "numBathroom": {
                            "type": "integer",
                            "example": 4,
                            "default": 0
                          },
                          "numBedroom": {
                            "type": "integer",
                            "example": 5,
                            "default": 0
                          },
                          "numFloor": {
                            "type": "integer",
                            "example": 3,
                            "default": 0
                          },
                          "numUnit": {
                            "type": "integer",
                            "example": 1,
                            "default": 0
                          },
                          "parking": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Garage Attached"
                            }
                          },
                          "parkingTypes": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "example": "Attached Garage"
                            }
                          },
                          "postalCode": {
                            "type": "string",
                            "example": "32541"
                          },
                          "prices": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "amountMax": {
                                  "type": "integer",
                                  "example": 440000,
                                  "default": 0
                                },
                                "amountMin": {
                                  "type": "integer",
                                  "example": 440000,
                                  "default": 0
                                },
                                "availability": {
                                  "type": "string",
                                  "example": "false"
                                },
                                "currency": {
                                  "type": "string",
                                  "example": "USD"
                                },
                                "dateSeen": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "2020-08-21T21:11:11.089Z"
                                  }
                                },
                                "firstDateSeen": {
                                  "type": "string",
                                  "example": "2020-08-21T20:19:44.214Z"
                                },
                                "lastDateSeen": {
                                  "type": "string",
                                  "example": "2020-08-21T21:11:11.089Z"
                                },
                                "domains": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "www.redfin.com"
                                  }
                                },
                                "isSale": {
                                  "type": "string",
                                  "example": "false"
                                },
                                "isSold": {
                                  "type": "string",
                                  "example": "true"
                                },
                                "pricePerSquareFoot": {
                                  "type": "integer",
                                  "example": 155,
                                  "default": 0
                                }
                              }
                            }
                          },
                          "propertyTaxes": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "amount": {
                                  "type": "integer",
                                  "example": 6152,
                                  "default": 0
                                },
                                "currency": {
                                  "type": "string",
                                  "example": "USD"
                                },
                                "dateSeen": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "2018-01-01T00:00:00.000Z"
                                  }
                                }
                              }
                            }
                          },
                          "propertyType": {
                            "type": "string",
                            "example": "Single Family Dwelling"
                          },
                          "province": {
                            "type": "string",
                            "example": "FL"
                          },
                          "subdivision": {
                            "type": "string",
                            "example": "Villages Of Crystal Beach"
                          },
                          "taxID": {
                            "type": "string",
                            "example": "00-2S-22-1125-0000-0500"
                          },
                          "transactions": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "saleDate": {
                                  "type": "string",
                                  "example": "2022-05-02T00:00:00.000Z"
                                },
                                "price": {
                                  "type": "integer",
                                  "example": 1300000,
                                  "default": 0
                                },
                                "sellerFirstName": {
                                  "type": "string",
                                  "example": "Weston"
                                },
                                "sellerLastName": {
                                  "type": "string",
                                  "example": "Hanoka"
                                },
                                "buyerFirstName": {
                                  "type": "string",
                                  "example": "Rice"
                                },
                                "buyerLastName": {
                                  "type": "string",
                                  "example": "Ryan"
                                },
                                "lenderName": {
                                  "type": "string",
                                  "example": "Fbc Mortgage LLC"
                                },
                                "loanAmount": {
                                  "type": "integer",
                                  "example": 1040000,
                                  "default": 0
                                },
                                "mortgageTerm": {
                                  "type": "integer",
                                  "example": 360,
                                  "default": 0
                                },
                                "parcelNumber": {
                                  "type": "string",
                                  "example": "00-2S-22-1125-0000-0500"
                                }
                              }
                            }
                          },
                          "vacancy": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "vacant": {
                                  "type": "boolean",
                                  "example": false,
                                  "default": true
                                },
                                "firstDateSeen": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22.592Z"
                                },
                                "lastDateSeen": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22.592Z"
                                }
                              }
                            }
                          },
                          "yearBuilt": {
                            "type": "integer",
                            "example": 2007,
                            "default": 0
                          },
                          "people": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "address": {
                                  "type": "string",
                                  "example": "213 Grand Key Loop E"
                                },
                                "city": {
                                  "type": "string",
                                  "example": "Destin"
                                },
                                "country": {
                                  "type": "string",
                                  "example": "US"
                                },
                                "dateAdded": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22Z"
                                },
                                "dateUpdated": {
                                  "type": "string",
                                  "example": "2024-04-11T16:57:22Z"
                                },
                                "emails": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "wilddiana@hotmail.com"
                                  }
                                },
                                "firstName": {
                                  "type": "string",
                                  "example": "Andrew"
                                },
                                "keys": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "andrew/smith/-153511615"
                                  }
                                },
                                "lastName": {
                                  "type": "string",
                                  "example": "Smith"
                                },
                                "phoneNumberHighScoreMobile": {
                                  "type": "string",
                                  "example": "+1 724-831-9260"
                                },
                                "phoneNumberHighScoreLand": {
                                  "type": "string",
                                  "example": "+1 412-321-2404"
                                },
                                "phoneNumbers": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "number": {
                                        "type": "string",
                                        "example": "+1 724-831-9260"
                                      },
                                      "carrier": {
                                        "type": "string",
                                        "example": "CELLCO PARTNERSHIP DBA VERIZON WIRELESS - PA"
                                      },
                                      "type": {
                                        "type": "string",
                                        "example": "Mobile"
                                      },
                                      "tested": {
                                        "type": "boolean",
                                        "example": false,
                                        "default": true
                                      },
                                      "reachableStatus": {
                                        "type": "boolean",
                                        "example": true,
                                        "default": true
                                      },
                                      "bdscore": {
                                        "type": "integer",
                                        "example": 100,
                                        "default": 0
                                      },
                                      "lastDateSeen": {
                                        "type": "string",
                                        "example": "2024-04-11T16:57:22.592Z"
                                      }
                                    }
                                  }
                                },
                                "postalCode": {
                                  "type": "string",
                                  "example": "32541-3525"
                                },
                                "province": {
                                  "type": "string",
                                  "example": "FL"
                                },
                                "sourceURLs": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "example": "https://datafiniti.co/bd-datafiniti"
                                  }
                                },
                                "tcpa": {
                                  "type": "boolean",
                                  "example": false,
                                  "default": true
                                },
                                "phoneNumberHighScoreMobileScore": {
                                  "type": "integer",
                                  "example": 100,
                                  "default": 0
                                },
                                "phoneNumberHighScoreLandScore": {
                                  "type": "integer",
                                  "example": 95,
                                  "default": 0
                                }
                              }
                            }
                          },
                          "id": {
                            "type": "string",
                            "example": "AW2m5roYcWockGYkocZQ"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"This is an issue on our end. please contact customer support.\"\n    \"Expected a boolean operator to be present between all term queries.\"\n    \"auto_trace view must contain people.keys\"\n\t]\n}"
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n\tUnauthorized\n}"
                  }
                }
              }
            }
          },
          "403": {
            "description": "403",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"errors\": [\n    \"There was a problem with this customer's payment information.\"\n  ]\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "errors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "example": "There was a problem with this customer's payment information."
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"No result found within the params of your query\"\n}"
                  }
                }
              }
            }
          }
        },
        "deprecated": false,
        "security": []
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true,
  "_id": "65ce4e31ceb42f0060898b87:65ce4e32ceb42f0060898c27"
}
```
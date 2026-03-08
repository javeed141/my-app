# Enhanced Commercial Data (L2/L3)

Enhanced commercial data (L2/L3 data) allows Lithic customers to get a deeper view of end-user purchasing behavior, enabling better support for corporate expense programs, fleet cards, and more.

Level 2 (L2) data includes general purchase data which typically describes the transaction as a whole, for example total tax amount or fuel type for a fuel-only fleet transaction. Level 3 (L3) data includes more granular information which describes individual elements within a transaction. Users can think of L3 data as a digital receipt containing item descriptions, item quantities, and product codes.

Typically merchants only include L2/L3 data for transactions on commercial BINs. They provide this data in an attempt to qualify for cheaper interchange rates. In return for less interchange, issuers are provided enhanced reconciliation and visibility into program spend.

## Types of Enhanced Commercial Data

### L2 Tax Data

L2 commercial data enhances transaction details by providing more descriptive information, including tax details, which are essential for businesses to streamline their accounting and tax reporting processes. When a cardholder uses a card which supports L2 data, transactions capture additional information such as sales tax amount, customer code, purchase order number, and tax identification number. This detailed data helps businesses comply with tax regulations, simplify tax preparation, and improve financial transparency.

### Industry-Specific Data

Enhanced commercial data can provide more granular transaction information tailored to specific industries, including fleet, lodging, vehicle rental, passenger transport, and shipping. This enhanced data helps businesses manage expenses more efficiently, comply with industry regulations, and improve operational transparency.

For the fleet industry, L2 data includes fuel type, vehicle identification number (VIN), driver ID, and odometer readings, enabling precise tracking of fuel expenses and vehicle usage. In lodging, enhanced commercial data covers room rates, number of nights, check-in/check-out dates, and folio numbers, facilitating accurate expense management and compliance with travel policies.

Vehicle rental transactions benefit from enhanced commercial data by capturing rental duration, vehicle type, and additional charges, while passenger transport data includes passenger details, travel dates, and route information. Shipping industry transactions gain from enhanced commercial data with shipment details, weight, and delivery dates, improving cost allocation and operational efficiency.

### L3 Line-item Data

L3 commercial data provides the highest level of transaction detail, including line-item information that is essential for comprehensive expense management. This data is particularly beneficial for industries that require detailed purchase breakdowns, such as government, manufacturing, and retail.

L3 data includes specific details about each item in a transaction, such as item description, quantity, unit price, total price, and tax amount. This granularity allows businesses to track spending at the item level, facilitating accurate cost allocation and inventory management. For example, in manufacturing, L3 data helps track the purchase of raw materials and components, ensuring precise cost control and efficient production planning.

In government and retail sectors, L3 line-item data aids in compliance with stringent reporting requirements and internal audit processes. Detailed transaction information supports better procurement practices, fraud detection, and improved vendor management. Additionally, it enhances the accuracy of financial reporting and budgeting by providing a clear view of all purchased items.

# Get Enhanced Data for a Specific Transaction

API Reference: [List Enhanced Commercial Data](https://docs.lithic.com/reference/listenhancedtransactiondata)

```
GET https://api.lithic.com/v1/transactions/{transaction_token}/enhanced_commercial_data
```

#### Sample Request

```bash
curl https://api.lithic.com/v1/transactions/764fa5a3-2371-40f0-8cbb-9a2e1230d955/enhanced_commercial_data
  -H "Authorization: YOUR_API_KEY"
```

#### Sample Response

```json
{
  "data": [
    {
      "token": "fda41769-2a3f-5532-898f-0d2034f2da85",
      "transaction_token": "6b79924e-0f01-4bdf-9485-9f6da44b6be2",
      "event_token": "49bbd49c-dfe1-56db-86ad-98c7c2bd75e4",
      "common": {
        "customer_reference_number": null,
        "merchant_reference_number": null,
        "order_date": null,
        "line_items": [],
        "tax": {
          "merchant_tax_id": "521236050",
          "amount": null,
          "exempt": null
        }
      },
      "fleet": [
        {
          "service_type": "SELF_SERVICE",
          "driver_number": null,
          "vehicle_number": "012345",
          "odometer": 12345,
          "amount_totals": {
            "gross_sale": 104,
            "discount": null,
            "net_sale": 104
          },
          "fuel": {
            "quantity": "0.24300",
            "type": "PREMIUM_SUPER",
            "unit_of_measure": "GALLONS",
            "unit_price": 4300
          }
        }
      ]
    }
  ]
}
```

|                                                 |                                                                                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| transaction*token* (required, path parameter)\_ | Globally unique identifier for the transaction to be returned. <br /> \_String. Permitted values: 36-digit version 4 UUID (including hyphens). |

# Get Enhanced Data for a Specific Event

API Reference: [Get Enhanced Commercial Data](https://docs.lithic.com/reference/getenhancedtransactiondata)

```
GET https://api.lithic.com/v1/transactions/{event_token}/enhanced_commercial_data
```

#### Sample Request

```bash
curl https://api.lithic.com/v1/transactions/49bbd49c-dfe1-56db-86ad-98c7c2bd75e4/enhanced_commercial_data
  -H "Authorization: YOUR_API_KEY"
```

#### Sample Response

```json
{
  "token": "fda41769-2a3f-5532-898f-0d2034f2da85",
  "transaction_token": "6b79924e-0f01-4bdf-9485-9f6da44b6be2",
  "event_token": "49bbd49c-dfe1-56db-86ad-98c7c2bd75e4",
  "common": {
    "customer_reference_number": null,
    "merchant_reference_number": null,
    "order_date": null,
    "line_items": [],
    "tax": {
      "merchant_tax_id": "521236050",
      "amount": null,
      "exempt": null
    }
  },
  "fleet": [
    {
      "service_type": "SELF_SERVICE",
      "driver_number": null,
      "vehicle_number": "012345",
      "odometer": 12345,
      "amount_totals": {
        "gross_sale": 104,
        "discount": null,
        "net_sale": 104
      },
      "fuel": {
        "quantity": "0.24300",
        "type": "PREMIUM_SUPER",
        "unit_of_measure": "GALLONS",
        "unit_price": 4300
      }
    }
  ]
}
```

|                                           |                                                                                                                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| event*token* (required, path parameter)\_ | Globally unique identifier for the transaction to be returned. <br /> *String. Permitted values: 36-digit version 4 UUID (including hyphens).* |

## Line Item Schema

```json
{
    "product_code": String,
    "description": String,
    "quantity": String,
    "amount": String
}
```

|               |                                                                                   |
| ------------- | --------------------------------------------------------------------------------- |
| product\_code | Product code for the goods or services purchased.                                 |
| description   | Description of the goods or services purchased.                                   |
| quantity      | Decimal number in string format of units of the goods or services purchased.      |
| amount        | Decimal number in string format of unit cost for the goods or services purchased. |

## Fleet Schema

```json
{
    "service_type": FuelServiceType,
    "vehicle_number": String,
    "driver_number": String,
    "odometer": Integer,
    "amount_totals": {
        "discount": Int,
        "gross_sale": Int,
        "net_sale": Int
    },
    "fuel": {
        "quantity": String,
        "type": FuelType,
        "unit_of_measure": FuelUnitOfMeasure,
        "unit_price": Integer
    }
}
```

| Field           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount\_totals  | - `discount`: Amount of discount applied.<br />- `gross_sale`: Total sale amount before discounts.<br />- `net_sale`: Total sale amount after discounts.                                                                                                                                                                                                                                                                                                                                                                            |
| driver\_number  | Number entered by the cardholder at the terminal when Fleet card is configured to display prompts for DRIVER\_NUMBER. This value is stripped of leading zeros. May be null.                                                                                                                                                                                                                                                                                                                                                         |
| fuel            | Information about the fuel product purchased by the cardholder.<br /><br />- `fuel.quantity`: Numeric quantity of fuel purchased, measured in `fuel.unit_of_measure`.<br />- `fuel.total_price`: Total price paid for the fuel purchased<br />- `fuel.type`: Type of fuel purchased. Possible values may be referenced below in Enumerations.<br />- `fuel.unit_of_measure`: Unit of measure of fuel purchased. Possible values may be referenced below in Enumerations.<br />- `fuel.unit_price`: Price for a single unit of fuel. |
| odometer        | Number entered by the cardholder at the terminal when Fleet card is configured to display prompts for odometer. This value is stripped of leading zeros. May be null.                                                                                                                                                                                                                                                                                                                                                               |
| service\_type   | Type of fuel service rendered (e.g. self service). Possible values may be referenced below in Enumerations.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| vehicle\_number | Number entered by the cardholder at the terminal when Fleet card is configured to display prompts for VEHICLE\_NUMBER. This value is stripped of leading zeros. May be null.                                                                                                                                                                                                                                                                                                                                                        |

### Enumerations

| Type              | Values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuel Type         | `Regular`<br />`Mid/Plus`<br />`Premium/Super`<br />`Miscellaneous Other Fuel`<br />`Regular Diesel #2`<br />`Premium Diesel #2`<br />`Kerosene – Low Sulfur`<br />`Liquid Propane Gas`<br />`Compressed Natural Gas`<br />`E-85`<br />`Reformulated 1`<br />`Reformulated 3`<br />`Diesel #2 Off-Road (Non-Taxable)`<br />`Diesel #2 Premium Off-Road (Non-Taxable)`<br />`B100 Diesel Blend 100% Biodiesel`<br />`Aviation Fuel Regular`<br />`Jet Fuel`<br />`Miscellaneous Aviation Fuel`<br />`Miscellaneous Marine Fuel`<br />`Miscellaneous Fuel`<br />`Liquid Natural Gas`<br />`White Gas`<br />`Racing Fuel`<br />`EVC-1 – Level 1 charge = 110v 15 amp`<br />`EVC-2 – Level 2 charge = 240v 15-40 amp`<br />`EVC-3 – Level 3 charge = 480v 3 phase charge`<br />`Biodiesel Blend Off-Road (Non-Taxable)`<br />`DEF (Diesel Exhaust Fluid)`<br />`Unknown` |
| FuelUnitOfMeasure | `Gallons`<br />`Liters`<br />`Pounds`<br />`Kilograms`<br />`Imperial gallons`<br />`Not Applicable`<br />`Unknown`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FuelServiceType   | `Unknown`<br />`Undefined`<br />`Self-service`<br />`Full service`<br />`Non-fuel only`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
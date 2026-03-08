# Example Requests

These are sample payloads for Legal Entity.

Counterparty-specific requests can be found [here](https://docs.moderntreasury.com/platform/reference/create-counterparty-examples).

## Creating a Legal Entity

```json Individual
{
  "legal_entity_type": "individual",
  "first_name": "First",
  "last_name": "Last",
  "date_of_birth": "2024-02-06",
  "email": "example@gmail.com",
  "phone_numbers": [
    {
      "phone_number": "+12061111111"
    }
  ],
  "addresses": [
    {
      "primary": true,
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "address_types": ["residential"]
    }
  ]
}
```

```json Business
{
  "legal_entity_type": "business",
  "business_name": "Business Name",
  "doing_business_as_names": ["DBA"],
  "email": "example@gmail.com",
  "website": "http://www.example.com",
  "phone_numbers": [
    {
    	"phone_number": "+97213859098921"
    }
  ],
  "addresses": [
    {
      "primary": true,
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "address_types": ["business"]
    }
  ]
}
```

## Creating a Legal Entity with IDs

Take a look at country-specific ID requirements here

```json Individual
{
  "legal_entity_type": "individual",
  "first_name": "First",
  "last_name": "Last",
  "date_of_birth": "2024-02-06",
  "email": "example@gmail.com",
  "addresses": [
    {
      "primary": true,
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "address_types": ["residential"]
    }
  ],
  "identifications": [
    {
      "id_number": "12345678901",
      "id_type": "br_cpf",
      "issuing_country": "BR"
    }
  ]
}
```

```json Business
{
  "legal_entity_type": "business",
  "business_name": "Business Name",
  "email": "example@gmail.com",
  "addresses": [
    {
      "primary": true,
      "line1": "119 5th Ave",
      "line2": "Suite 600",
      "locality": "New York",
      "region": "NY",
      "postal_code": "10003",
      "country": "US",
      "address_types": ["residential"]
    }
  ],
  "identifications": [
    {
      "id_number": "12345678901234",
      "id_type": "br_cnpj",
      "issuing_country": "BR"
    }
  ]
}
```

## Updating IDs on a Legal Entity

**Note: This will replace the existing identifications**

```json Example
{
  "identifications": [
    {
      "id_number": "12345678901",
      "id_type": "br_cpf",
      "issuing_country": "BR"
    }
  ]
}
```
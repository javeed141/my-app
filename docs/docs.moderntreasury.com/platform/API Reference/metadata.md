# Metadata

We support including `metadata` on most of our resources as a way to add internal information to our system. Metadata takes the form of free-form key-value pairs. This allows easier searching through both the API and web interfaces. Organizations can also add individual rules based on metadata values. You may write metadata both when you create an object and when updating the object.

If you would like to remove metadata that is already on an object, you can unset it by passing in the key-value pair with an empty string or null as the value, like this:

```json
{
  "key-to-delete": ""
}

// OR

{
  "key-to-delete": null
}
```

```json Metadata Example
{
  "Customer ID": "5584"
}
```

## Querying via metadata in the API

<Callout icon="🚧">
  We would recommend using [External IDs](https://docs.moderntreasury.com/platform/reference/external-ids) when possible for querying.
</Callout>

Some endpoints such as [List Payment Orders](https://docs.moderntreasury.com/platform/reference/list-payment-orders) allow you to query for objects via metadata. It is possible to query on multiple metadata tags at once by including them as separate URL parameters separated by `&`. This delivers all objects tagged with both metadata tags, functioning like an AND operator. There are no other logical operators (OR, ect.) available when querying by metadata.

Metadata queries can be tricky to get right, especially if your metadata keys or values have spaces. The URL's query parameters need to be [encoded properly](https://en.wikipedia.org/wiki/Percent-encoding). Here's a basic table to show how some common characters get encoded.

| Character   | Encoded Character |
| :---------- | :---------------- |
| `[`         | `%5B`             |
| `]`         | `%5D`             |
| ` ` (space) | `%20`             |

We put some examples below as a reference for your implementation.

First, let's look at the simple case where your metadata key and value are both strings with no spaces. We want to encode: `{ "Type":  "Loan" }`. The query parameters will be `metadata%5BType%5D=Loan`.

Next, let's say the metadata key has a space in it: `{ "Entity Type": "Loan" }`. The query parameters will be `metadata%5BEntity%20Type%5D=Loan`.

Then, let's add a case where the metadata key and value both have spaces in them: `{ "Entity Type":  "Loan Funding"}`. The query parameters will be `metadata%5BEntity%20Type%5D=Loan%20Funding`.

Finally, let's look at querying on multiple metadata tags: `{ "User": "Bob", "State": "CA" }`. The query parameters will be `metadata%5BUser%5D=Bob&metadata%5BState%5D=CA`.
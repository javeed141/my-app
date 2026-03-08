# NodeJS

Our Node SDK is available as an npm package: [https://www.npmjs.com/package/modern-treasury](https://www.npmjs.com/package/modern-treasury)

You can also view the GitHub repo: [https://github.com/Modern-Treasury/modern-treasury-node](https://github.com/Modern-Treasury/modern-treasury-node)

```javascript
import ModernTreasury from 'modern-treasury';

const modernTreasury = new ModernTreasury({
  apiKey: 'my api key', // defaults to process.env["MODERN_TREASURY_API_KEY"]
  organizationId: 'my-organization-ID',
});

async function main() {
  const counterparty = await modernTreasury.counterparties.create({
    name: 'my first counterparty',
  });

  console.log(counterparty.id);
}
main().catch(console.error);
```
# Initialization

You initialize the `ModernTreasury` library with a Publishable API Key.  Visit the [Publishable API Keys](https://app.moderntreasury.com/developers/publishable_keys) page in the Dashboard to find a Publishable API Key.

* If using the NPM package, call `loadModernTreasury(publishableKey)`
* If using the script directly, call `ModernTreasury(publishableKey)`

```typescript
import { loadModernTreasury } from "@modern-treasury/modern-treasury-js";
 
const modernTreasury = await loadModernTreasury("publishable-test-MDAiy2...");
```

```javascript Javascript
const modernTreasury = ModernTreasury("publishable-test-MDAiy2...");
```
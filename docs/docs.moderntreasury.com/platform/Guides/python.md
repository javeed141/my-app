# Python

Our Python SDK is available through PyPI: [https://pypi.org/project/modern-treasury/](https://pypi.org/project/modern-treasury/)

You can also view the GitHub repo: [https://github.com/Modern-Treasury/modern-treasury-python](https://github.com/Modern-Treasury/modern-treasury-python)

```python
from modern_treasury import ModernTreasury

modern_treasury = ModernTreasury(
    # defaults to os.environ.get("MODERN_TREASURY_API_KEY")
    api_key="my api key",
    organization_id="my-organization-ID",
)

counterparty = modern_treasury.counterparties.create(
  name="my first counterparty"
)

print(counterparty.id)
```
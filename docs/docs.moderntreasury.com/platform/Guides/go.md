# Go

You can find installation instructions and documentation for our Go library on GitHub: [https://github.com/Modern-Treasury/modern-treasury-go](https://github.com/Modern-Treasury/modern-treasury-go)

```go
package main

import (
	"context"
	"fmt"
	"github.com/Modern-Treasury/modern-treasury-go"
	"github.com/Modern-Treasury/modern-treasury-go/option"
)

func main() {
	client := moderntreasury.NewClient(
		option.WithOrganizationID("my-organization-ID"), // defaults to os.LookupEnv("MODERN_TREASURY_ORGANIZATION_ID")
		option.WithAPIKey("my api key"),                 // defaults to os.LookupEnv("MODERN_TREASURY_API_KEY")
	)
	externalAccount, err := client.ExternalAccounts.New(context.TODO(), moderntreasury.ExternalAccountNewParams{
		CounterpartyID: moderntreasury.F("9eba513a-53fd-4d6d-ad52-ccce122ab92a"),
		Name:           moderntreasury.F("my bank"),
	})
	if err != nil {
		panic(err.Error())
	}
	fmt.Printf("%+v\n", externalAccount)
}
```
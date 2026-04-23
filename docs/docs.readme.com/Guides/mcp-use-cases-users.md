# Your API MCP Server Use Cases

Real-world examples of developers and agents using your MCP server to work with your API.

Once you've enabled your MCP server, your users' AI tools can connect directly to your API — reading your docs, understanding your schema, and making live calls. These examples use the classic **Petstore API** to show what's possible.

***

## Coding Use Cases

AI coding assistants become dramatically more productive when they have live access to your API spec. Instead of hallucinating endpoints or asking users to paste in docs, the AI can look everything up itself.

### Build a working API client in seconds

**Setup:** A developer connects their coding assistant (Cursor, VS Code, Claude Code) to the Petstore MCP server.

**Prompt:**

```
Connect to the Petstore API using the MCP tools and write a Python script that:
1. Lists all pets with status "available"
2. Lets me add a new pet by name
3. Handles errors gracefully with clear messages
```

**What the AI does behind the scenes:**

1. Calls `list-endpoints` → discovers `/pet/findByStatus`, `POST /pet`
2. Calls `get-endpoint` on each → reads parameters, request body shape
3. Calls `get-response-schema` → understands the `Pet` object structure
4. Calls `list-security-schemes` → finds that the API uses `api_key` or OAuth
5. Generates working, accurate code — no hallucinated fields, no wrong HTTP methods

**Result:**

```python
import requests

BASE_URL = "https://petstore.swagger.io/v2"
API_KEY  = "your-api-key"

def list_available_pets():
    resp = requests.get(
        f"{BASE_URL}/pet/findByStatus",
        params={"status": "available"},
        headers={"api_key": API_KEY},
    )
    resp.raise_for_status()
    return resp.json()

def add_pet(name: str, status: str = "available") -> dict:
    payload = {"name": name, "status": status, "photoUrls": []}
    resp = requests.post(
        f"{BASE_URL}/pet",
        json=payload,
        headers={"api_key": API_KEY, "Content-Type": "application/json"},
    )
    resp.raise_for_status()
    return resp.json()

if __name__ == "__main__":
    pets = list_available_pets()
    print(f"Found {len(pets)} available pets:")
    for p in pets[:5]:
        print(f"  • {p['name']} (id: {p['id']})")
```

***

### Explore an unfamiliar API instantly

**Prompt:**

```
I've never used the Petstore API before. Use the MCP tools to explore it and
give me a quick-start guide: what endpoints exist, what auth I need, and a
curl example for the most common operation.
```

**What happens:** The AI calls `list-endpoints`, `list-security-schemes`, and `get-code-snippet` to assemble a tour of your API — all without you writing a single line of documentation beyond your OpenAPI spec.

***

### Generate tests from your spec

**Prompt:**

```
Using the Petstore MCP tools, look at the POST /pet endpoint and generate
a full Jest test suite that covers: a successful create, missing required
fields, and an invalid status value.
```

The AI reads the request body schema, finds the enum values for `status`, and writes tests against the actual contract — not guesses.

***

## Agentic Use Cases

Agents go further than coding assistants — they take actions autonomously across multiple steps, making real API calls and reacting to the results.

### Inventory cleanup agent

**Setup:** An operations agent is connected to the Petstore MCP server with an API key forwarded for `execute-request`.

**Prompt:**

```
You are a pet store inventory manager. Use the Petstore MCP tools to:
1. Find all pets with status "pending" that have been pending for a while
2. Update each one to "available"
3. Return a summary of every pet you updated
```

**What the agent does:**

1. `execute-request` → `GET /pet/findByStatus?status=pending`
2. Reviews the list, iterates through each pet
3. `execute-request` → `PUT /pet` for each, updating status to `"available"`
4. Returns a structured report: how many pets were updated, their names and IDs

No human in the loop. The agent reads live data, acts on it, and reports back.

***

### New-user onboarding agent

**Prompt:**

```
A new developer just signed up for Petstore access. Use MCP tools to:
1. Search the docs for our "getting started" guide
2. Find the most relevant API endpoints for a new user
3. Generate a personalized onboarding email with code snippets in Python
```

**What the agent does:**

1. `search` → finds the getting-started guide
2. `fetch` → pulls the full guide content
3. `list-endpoints` → identifies beginner-friendly endpoints
4. `get-code-snippet` (Python) → generates working examples for each
5. Assembles a personalized email with accurate, runnable code

***

### Automated API monitoring

**Prompt:**

```
Check that the Petstore API is behaving correctly. Use MCP tools to:
1. Call GET /pet/{id} with id=1 and verify the response matches the schema
2. Try POST /pet with an invalid status and confirm it returns a 400
3. Report any discrepancies between the spec and actual behavior
```

The agent uses `get-response-schema` to know what a valid response looks like, then uses `execute-request` to make the actual calls — comparing real behavior against the documented contract.

***

## Giving Your Users the Connection Instructions

Once your MCP server is enabled, ReadMe can auto-generate connection instructions for your users. From your project dashboard, navigate to **AI → MCP** and click **Generate MCP Template**. This creates a ready-to-publish "MCP Server" doc pre-filled with your project's URL and connection steps for every major AI tool.

Your users connect to `https://your-project.readme.io/mcp` (or your custom domain) and their AI tools immediately have access to everything in your API spec.
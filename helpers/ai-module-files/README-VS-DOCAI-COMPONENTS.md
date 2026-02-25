# ReadMe Components That Documentation.AI Doesn't Have

Here's a plain breakdown of what exists in ReadMe but has **no direct equivalent** in Documentation.AI. These are the things your AI converter will need to handle.

---

## 1. Custom Components (the big one)

ReadMe lets you write **any React component** with `export const` and use it in docs. Documentation.AI does **not** support custom components at all.

**ReadMe example:**
```jsx
export const DeprecationBanner = ({ children, version }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4">
      <span className="text-red-700 font-bold">⚠️ Deprecated in {version}:</span>
      <span className="ml-2">{children}</span>
    </div>
  );
};

<DeprecationBanner version="v3.0">
  This endpoint will be removed. Use /v2/users instead.
</DeprecationBanner>
```

**AI should convert to:**
```mdx
<Callout kind="alert">
  **Deprecated in v3.0:** This endpoint will be removed. Use /v2/users instead.
</Callout>
```

---

## 2. Marketplace Components

ReadMe has a [Component Marketplace](https://github.com/readmeio/marketplace) with community-built components. Documentation.AI has no marketplace.

**Common marketplace components you'll encounter:**

### a) Terminal / CLI Window
```jsx
export const Terminal = ({ commands }) => {
  return (
    <div className="bg-black text-green-400 rounded-lg p-4 font-mono">
      <div className="flex gap-2 mb-2">
        <span className="w-3 h-3 bg-red-500 rounded-full" />
        <span className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span className="w-3 h-3 bg-green-500 rounded-full" />
      </div>
      {commands.map((cmd, i) => (
        <div key={i}>$ {cmd}</div>
      ))}
    </div>
  );
};

<Terminal commands={["npm install @acme/sdk", "npx acme init"]} />
```

**AI should convert to:**
```mdx
```bash
$ npm install @acme/sdk
$ npx acme init
```
```

### b) Compatibility / Pricing Table
```jsx
export const CompatibilityMatrix = ({ features }) => (
  <table>
    <thead><tr><th>Feature</th><th>Free</th><th>Pro</th><th>Enterprise</th></tr></thead>
    <tbody>
      {features.map(f => (
        <tr key={f.name}>
          <td>{f.name}</td>
          <td>{f.free ? "✅" : "❌"}</td>
          <td>{f.pro ? "✅" : "❌"}</td>
          <td>{f.enterprise ? "✅" : "❌"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

<CompatibilityMatrix features={[
  { name: "API Access", free: true, pro: true, enterprise: true },
  { name: "Webhooks", free: false, pro: true, enterprise: true },
  { name: "SSO", free: false, pro: false, enterprise: true },
]} />
```

**AI should convert to:**
```mdx
| Feature    | Free | Pro | Enterprise |
| :--------- | :--- | :-- | :--------- |
| API Access | ✅   | ✅  | ✅         |
| Webhooks   | ❌   | ✅  | ✅         |
| SSO        | ❌   | ❌  | ✅         |
```

### c) Page Banner
```jsx
export const Banner = ({ type, message, link }) => (
  <div className={`p-4 rounded ${type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
    <strong>{message}</strong>
    {link && <a href={link}> Learn more →</a>}
  </div>
);

<Banner type="warning" message="This API is in beta" link="/docs/beta-program" />
```

**AI should convert to:**
```mdx
<Callout kind="alert">
  **This API is in beta** [Learn more →](/docs/beta-program)
</Callout>
```

### d) Quiz / Interactive Game
```jsx
export const Quiz = ({ question, options, correct }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <p><strong>{question}</strong></p>
      {options.map((opt, i) => (
        <button key={i} onClick={() => setSelected(i)}
          className={selected === i ? (i === correct ? 'bg-green-200' : 'bg-red-200') : ''}>
          {opt}
        </button>
      ))}
    </div>
  );
};

<Quiz
  question="Which HTTP method is idempotent?"
  options={["POST", "PUT", "PATCH"]}
  correct={1}
/>
```

**AI should convert to:**
```mdx
<Callout kind="info" title="Quiz: Which HTTP method is idempotent?">

- POST
- **PUT** ✅
- PATCH

</Callout>
```

### e) Progress Bar / Status
```jsx
<ProgressBar value={75} max={100} label="Migration Progress" color="#4CAF50" />
```

**AI should convert to:**
```mdx
**Migration Progress:** 75% complete

<Callout kind="success">
  75% of the migration is complete.
</Callout>
```

---

## 3. `[block:...]` Syntax (Old ReadMe Format)

Before MDX, ReadMe used JSON block syntax. Your pipeline already handles most of these in `convertBlockSyntax()`, but here are the types:

| Block Type | ReadMe Syntax | Doc.AI Equivalent | Handled? |
| :--------- | :------------ | :---------------- | :------- |
| `[block:callout]` | JSON with type, title, body | `<Callout>` | ✅ Yes |
| `[block:code]` | JSON with codes array | `<CodeGroup>` | ✅ Yes |
| `[block:image]` | JSON with images array | `<Image>` | ✅ Yes |
| `[block:parameters]` | JSON table data | Markdown table | ✅ Yes |
| `[block:api-header]` | JSON table data | Markdown table | ✅ Yes |
| `[block:html]` | Raw HTML block | Raw HTML | ✅ Yes |
| `[block:embed]` | JSON with URL | `<iframe>` | ✅ Yes |
| `[block:tutorial-tile]` | Interactive tutorial | ❌ No equivalent | ❌ AI needed |

---

## 4. Glossary / Reusable Content

ReadMe has inline glossary references. Documentation.AI doesn't.

```mdx
The API key is {glossary.apiKey} and should be included in all requests.
```

**AI should convert to:**
```mdx
The API key is `YOUR_API_KEY` and should be included in all requests.
```

---

## 5. Recipe Components

ReadMe has "Recipes" — step-by-step tutorials with live code playgrounds.

```jsx
<Recipe>
  <RecipeStep title="Install SDK" language="bash">
    npm install @acme/sdk
  </RecipeStep>
  <RecipeStep title="Initialize" language="javascript">
    const client = new AcmeClient({ apiKey: 'demo' });
  </RecipeStep>
</Recipe>
```

**AI should convert to:**
```mdx
<Steps>
  <Step title="Install SDK">
    ```bash
    npm install @acme/sdk
    ```
  </Step>
  <Step title="Initialize">
    ```javascript
    const client = new AcmeClient({ apiKey: 'demo' });
    ```
  </Step>
</Steps>
```

---

## 6. Font Awesome Icons (already handled)

ReadMe uses Font Awesome icons. Documentation.AI uses Lucide.

```jsx
<Card icon="fa-rocket" title="Fast">...</Card>
```

→ Already converted by `convertIcons()` in your pipeline:

```jsx
<Card icon="rocket" title="Fast">...</Card>
```

---

## 7. `Cards` Container (already handled)

ReadMe uses `<Cards columns={3}>`. Documentation.AI uses `<Columns cols={3}>`.

```jsx
<Cards columns={3}>
  <Card title="First" icon="fa-home">Text</Card>
</Cards>
```

→ Already converted by `convertCards()`:

```jsx
<Columns cols={3}>
  <Card title="First" icon="home">Text</Card>
</Columns>
```

---

## 8. `Accordion` / `AccordionGroup` (already handled)

ReadMe: `<Accordion>`. Documentation.AI: `<Expandable>`.

→ Already converted by `convertAccordions()`.

---

## 9. Things ReadMe Has That Simply Can't Be Replicated

These are interactive/dynamic features with no static equivalent:

| ReadMe Feature | Why It Can't Convert | Best AI Fallback |
| :------------- | :------------------- | :--------------- |
| API Playground (try it live) | Needs a running server | `<Steps>` with curl examples |
| Dynamic pricing display | Fetches real-time data | `<Callout>` with link to dashboard |
| Glossary tooltips | Needs runtime JS | Inline the text or use `YOUR_VALUE` |
| Component Marketplace items with `useState` | React state doesn't work in Doc.AI | Static version of the content |
| Custom CSS / Tailwind classes | Doc.AI strips these | Use built-in component styling |
| `{glossary.term}` references | No glossary system | Replace with placeholder text |

---

## Summary: What the AI Converter Actually Needs to Handle

Your pipeline **already handles** these ReadMe → Doc.AI conversions:
- Emoji blockquote callouts → `<Callout>`
- `[block:*]` JSON syntax → modern MDX
- `<Cards>` → `<Columns>`
- `<Accordion>` → `<Expandable>`
- Font Awesome → Lucide icons
- Markdown images → `<Image>`

The **AI module is needed for** these (no rule-based conversion possible):
1. **Custom `export const` components** — styled wrappers, banners, grids
2. **Marketplace components** — Terminal, Quiz, ProgressBar, Banner, etc.
3. **Recipe components** — when they can't be rule-matched to `<Steps>`
4. **Components with business logic** — pricing, dynamic data, state
5. **Completely unknown components** — no source code available, AI guesses from context

That's exactly what `ai-converter.js` does — it sees the component code + usage, figures out the intent, and maps it to the closest Documentation.AI component.

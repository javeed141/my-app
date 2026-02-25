const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });

console.log(process.env.GEMINI_API_KEY);


{/* <Recipe>
  <RecipeStep title="Install SDK" language="bash">
    npm install @acme/sdk
  </RecipeStep>
  <RecipeStep title="Initialize" language="javascript">
    const client = new AcmeClient({ apiKey: 'demo' });
  </RecipeStep>
</Recipe>
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
export const Banner = ({ type, message, link }) => (
  <div className={`p-4 rounded ${type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
    <strong>{message}</strong>
    {link && <a href={link}> Learn more →</a>}
  </div>
);

<Banner type="warning" message="This API is in beta" link="/docs/beta-program" />
<ProgressBar value={75} max={100} label="Migration Progress" color="#4CAF50" />
<Cards columns={3}>
  <Card title="First" icon="fa-home">Text</Card>
</Cards> */}
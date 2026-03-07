# Setup Commands

## 1. Next.js
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --eslint --import-alias "@/*"
```

## 2. shadcn
```bash
npx shadcn@latest init
```
> When prompted: style = **Default**, base color = **Neutral**, CSS variables = **yes**

```bash
npx shadcn@latest add dialog badge button
```

## 3. Libraries
```bash
npm install framer-motion next-themes @faker-js/faker
```

## 4. MCP (Claude Code)
Create `.mcp.json` at project root:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## 5. Dev
```bash
npm run dev
```

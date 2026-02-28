import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Aegis API Endpoints
  app.get("/api/status", (req, res) => {
    res.json({
      status: "online",
      agent: "Aegis v1.2.0",
      system: "Node.js " + process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      health: {
        coverage: 84,
        lintScore: 98,
        dependencyFreshness: 92,
        securityWarnings: 0,
        technicalDebt: "Low"
      }
    });
  });

  app.get("/api/analysis", (req, res) => {
    res.json({
      risk: {
        score: 12,
        impactRadius: "Low",
        breakageProbability: 0.05,
        complexity: 4
      },
      dependencies: [
        { name: "react", current: "19.0.0", latest: "19.0.0", status: "up-to-date" },
        { name: "vite", current: "6.2.0", latest: "6.2.1", status: "outdated" },
        { name: "express", current: "4.21.2", latest: "4.21.2", status: "up-to-date" }
      ],
      memory: [
        { key: "architecture", value: "Full-Stack Express + Vite SPA" },
        { key: "styling", value: "Tailwind CSS 4 Utility-First" },
        { key: "conventions", value: "Functional Components, Lucide Icons" }
      ]
    });
  });

  app.post("/api/execute", (req, res) => {
    const { command } = req.body;
    console.log(`[Aegis] Executing: ${command}`);
    
    const responses: Record<string, string> = {
      "ls": "src/\npublic/\npackage.json\nvite.config.ts\nserver.ts",
      "git status": "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean",
      "npm test": "PASS src/App.test.tsx\nPASS src/components/Terminal.test.tsx\n\nTest Suites: 2 passed, 2 total\nTests:       12 passed, 12 total\nSnapshots:   0 total\nTime:        1.452 s",
      "whoami": "aegis-agent",
      "aegis health": "Health Report:\n- Coverage: 84%\n- Lint: 100%\n- Security: 0 issues\n- Debt: 2.4h",
      "aegis plan": "1. [DONE] Recon project structure\n2. [ACTIVE] Implement advanced UI features\n3. [PENDING] Self-healing validation\n4. [PENDING] Final security audit"
    };

    const output = responses[command as keyof typeof responses] || `Command not found: ${command}\nTip: Try 'aegis health' or 'aegis plan'`;
    res.json({ output, exitCode: 0 });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aegis] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

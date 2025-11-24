import { app } from "../server/app.ts";
import { registerRoutes } from "../server/routes.ts";

// We need to ensure routes are registered only once
let routesRegistered = false;

export default async function handler(req: any, res: any) {
    if (!routesRegistered) {
        await registerRoutes(app);
        routesRegistered = true;
    }

    // Vercel serverless function handler
    app(req, res);
}

/**
 * veteran-verification-api
 * 
 * MVC-based microservice for veteran status verification
 */

import { VeteranController } from './controllers/VeteranController.ts';

const veteranController = new VeteranController();

Bun.serve({
  port: 3000,
  routes: {
    "/api/verify": {
      POST: async (req) => {
        return await veteranController.verifyVeteran(req);
      }
    },
    "/status": {
      GET: () => {
        return veteranController.getStatus();
      }
    },
    "/health": {
      GET: () => {
        return veteranController.getHealth();
      }
    },
    "/": {
      GET: () => {
        return Response.json({
          name: 'veteran-verification-api',
          version: '1.0.0',
          description: 'Backend microservice for verifying veteran status using VA APIs',
          endpoints: {
            verify: 'POST /api/verify',
            status: 'GET /status',
            health: 'GET /health'
          },
          documentation: 'See README.md and ai/ folder for detailed API documentation'
        });
      }
    }
  }
});

console.log(`
⠀⠀⠀⠀⢀⡴⣆⠀⠀⠀⠀⠀⣠⡀ ᶻ 𝗓 𐰁 .ᐟ ⣼⣿⡗⠀⠀⠀⠀
⠀⠀⠀⣠⠟⠀⠘⠷⠶⠶⠶⠾⠉⢳⡄⠀⠀⠀⠀⠀⣧⣿⠀⠀⠀⠀⠀
⠀⠀⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣤⣤⣤⣤⣤⣿⢿⣄⠀⠀⠀⠀
⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀⠀⠙⣷⡴⠶⣦
⠀⠀⢱⡀⠀⠉⠉⠀⠀⠀⠀⠛⠃⠀⢠⡟⠀⠀⠀⢀⣀⣠⣤⠿⠞⠛⠋
⣠⠾⠋⠙⣶⣤⣤⣤⣤⣤⣀⣠⣤⣾⣿⠴⠶⠚⠋⠉⠁⠀⠀⠀⠀⠀⠀
⠛⠒⠛⠉⠉⠀⠀⠀⣴⠟⢃⡴⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`)

console.log("(◡ ‿ ◡) ✨ welcome to the cutest veteran verification api uwu ~(˘▾˘)~");
console.log("📋 Endpoints:");
console.log("  POST /api/verify - Verify veteran status");
console.log("  GET /status      - Service status");
console.log("  GET /health      - Health check");
console.log("  GET /            - API information");

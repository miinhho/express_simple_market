import { App } from '@/app';
import { config } from '@/config/env.config';
import { Server as HttpServer } from 'http';

class Server {
  private app: App;
  private server!: HttpServer;

  constructor() {
    this.app = new App();
    this.setupProcessHandlers();
  }

  private setupProcessHandlers(): void {
    process.on('SIGTERM', () => this.shutdown());
    process.on('SIGINT', () => this.shutdown());
    
    process.on('uncaughtException', (error: Error) => {
      console.error('Uncaught Exception:', error);
      this.shutdown();
    });
  }

  private shutdown(): void {
    console.log('Shutting down server...');
    if (this.server) {
      this.server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  }

  public start(): void {
    const app = this.app.getServer();
    
    this.server = app.listen(config.server.port, () => {
      console.log(`
Server started successfully
Listening on port ${config.server.port}
Environment: ${config.server.nodeEnv}
      `);
    });
  }
}

const server = new Server();
server.start(); 
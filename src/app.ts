import express, { Express } from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

// Routes
import { adminRoutes, shopRoutes } from './routes';

// Middleware
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setupSecurity();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupSecurity(): void {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors());
  }

  private setupMiddleware(): void {
    // Logging
    this.app.use(morgan('dev'));

    // Compression
    this.app.use(compression());

    // Static files
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    
    // Request parsing
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (_req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    // API routes
    this.app.use('/admin', adminRoutes);
    this.app.use(shopRoutes);
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  public getServer(): Express {
    return this.app;
  }
}

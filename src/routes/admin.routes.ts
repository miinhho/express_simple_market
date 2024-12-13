import { Router } from 'express';
import path from 'path';
import { HttpStatusCode, HttpException } from '@/types/error.types';
import { TypedHandler, TypedRequest, TypedResponse } from '@/types/http.types';

interface AdminResponse {
  success: boolean;
  message: string;
  data?: any;
}

class AdminController {
  public getAdminPage: TypedHandler<{}, AdminResponse> = async (
    req: TypedRequest,
    res: TypedResponse<AdminResponse>
  ): Promise<void> => {
    try {
      // For API requests, send JSON response
      if (req.get('Accept') === 'application/json') {
        res.json({
          success: true,
          message: 'Admin page data retrieved successfully',
          data: {
            title: 'Welcome to the Admin Page',
            products: []
          }
        });
        return;
      }

      // For browser requests, send HTML
      const filePath = path.join(process.cwd(), 'public', 'page', 'admin.html');
      res.sendFile(filePath);
    } catch (error) {
      throw new HttpException(
        HttpStatusCode.INTERNAL_SERVER,
        'Failed to load admin page'
      );
    }
  };
}

class AdminRoutes {
  private router: Router;
  private controller: AdminController;

  constructor() {
    this.router = Router();
    this.controller = new AdminController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.controller.getAdminPage);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AdminRoutes().getRouter();
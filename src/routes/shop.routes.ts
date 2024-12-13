import { Router } from 'express';
import path from 'path';
import { TypedRequest, TypedResponse, TypedHandler } from '@/types/http.types';
import { HttpException, HttpStatusCode } from '@/types/error.types';

interface ShopResponse {
  success: boolean;
  message: string;
  data?: any;
}

class ShopController {
  public getShopPage: TypedHandler<{}, ShopResponse> = async (
    req: TypedRequest,
    res: TypedResponse<ShopResponse>
  ): Promise<void> => {
    try {
      // For API requests, send JSON response
      if (req.get('Accept') === 'application/json') {
        res.json({
          success: true,
          message: 'Shop page data retrieved successfully',
          data: {
            title: 'Welcome to the Shop',
            products: []
          }
        });
        return;
      }

      // For browser requests, send HTML
      const filePath = path.join(process.cwd(), 'public', 'page', 'shop.html');
      res.sendFile(filePath);
    } catch (error) {
      throw new HttpException(
        HttpStatusCode.INTERNAL_SERVER,
        'Failed to load shop page'
      );
    }
  };
}

class ShopRoutes {
  private router: Router;
  private controller: ShopController;

  constructor() {
    this.router = Router();
    this.controller = new ShopController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.controller.getShopPage);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new ShopRoutes().getRouter();

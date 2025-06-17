import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`Request URL: ${req.url}`);
    console.log(`Headers:`, req.headers);
    next();
  }
}

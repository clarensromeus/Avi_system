import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { IStore } from 'src/typing/global';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(private readonly als: AsyncLocalStorage<IStore>) {}
  use(req: any, res: any, next: () => void) {
    const store = {
      userId: req.headers['x-user-id'],
      authentication: req.headers['authorization'],
    };

    // and pass the "next" function as callback
    // to the "als.run" method together with the store.
    this.als.run(store, () => next());
  }
}

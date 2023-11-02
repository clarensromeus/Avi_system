import { DynamicModule, Module, Provider } from '@nestjs/common';
import { STRIPE_SECRETE_KEY } from 'src/constants';
import Stripe from 'stripe';

@Module({})
export class StripeModule {
  static forRoot(
    Secret_key: string,
    stripeConfig: Stripe.StripeConfig,
  ): DynamicModule {
    const stripePayment = new Stripe(Secret_key, stripeConfig);

    const StripeProvider: Provider = {
      provide: STRIPE_SECRETE_KEY,
      useValue: stripePayment,
    };

    return {
      module: StripeModule,
      providers: [StripeProvider],
      exports: [StripeProvider],
      global: true,
    };
  }
}

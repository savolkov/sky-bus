import { Event } from '@node-ts/bus-messages';
import { SigurGatewayEvent } from '../../types/sigur';

export class SigurGatewayAccessRequired extends Event {
  static readonly NAME = 'sigur/gateway-access-required';

  readonly $name = SigurGatewayAccessRequired.NAME;

  readonly $version = 0;

  /**
   * Event
   * @param message
   */
  constructor(
    readonly sigurEvent: SigurGatewayEvent,
  ) {
    super();
  }
}

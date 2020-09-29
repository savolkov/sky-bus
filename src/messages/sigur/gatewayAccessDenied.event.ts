import { Event } from '@node-ts/bus-messages';
import { SigurGatewayEvent } from '../../types/sigur';

export class SigurGatewayAccessDenied extends Event {
  static readonly NAME = 'sigur/gateway-access-denied';

  readonly $name = SigurGatewayAccessDenied.NAME;

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

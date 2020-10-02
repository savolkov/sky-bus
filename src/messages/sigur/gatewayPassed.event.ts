import { Event } from '@node-ts/bus-messages';
import { SigurGatewayEvent } from '../../types/sigur';

export class SigurGatewayPassed extends Event {
  static readonly NAME = 'sigur/gateway-passed';

  readonly $name = SigurGatewayPassed.NAME;

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

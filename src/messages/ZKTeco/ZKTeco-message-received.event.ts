import { Event } from '@node-ts/bus-messages';
import { ZKTEvent } from '../../types/ZKTeco/ZKTEvent';

export default class ZKTecoMessageReceived extends Event {
  static readonly NAME = 'ZKTeco/MessageReceived';

  readonly $name = ZKTecoMessageReceived.NAME;

  readonly $version = 0;

  constructor(
    readonly event: ZKTEvent,
  ) {
    super();
  }
}

import { Event } from '@node-ts/bus-messages';

export class SputnikIntercomCallReceived extends Event {
  static readonly NAME = 'sputnik/intercom-call-received';

  readonly $name = SputnikIntercomCallReceived.NAME;

  readonly $version: number = 0;

  constructor(
    readonly deviceUuid: String,
    readonly timestamp: Date,
    readonly flatId: number,
  ) {
    super();
  }
}

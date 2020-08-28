import { ZKTEventType } from './ZKTEventType';
import { ZKTEmployee } from './ZKTEmployee';
import { ZKTDepatrment } from './ZKTDepatrment';

export type ZKTEvent = {
  eventType: ZKTEventType,
  subject: ZKTEmployee | ZKTDepatrment,
};

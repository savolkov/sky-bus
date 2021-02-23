import { Bus, BUS_SYMBOLS, HandlesMessage } from '@node-ts/bus-core';
import { inject } from 'inversify';
import Axios from 'axios';
import ZKTecoMessageReceived from '../../messages/ZKTeco/ZKTeco-message-received.event';
import { ZKTEventType } from '../../types/ZKTeco/ZKTEventType';
import { ZKTEmployee } from '../../types/ZKTeco/ZKTEmployee';

@HandlesMessage(ZKTecoMessageReceived)
export class ZKTecoMessageHandler {
  constructor(
    @inject(BUS_SYMBOLS.Bus) private readonly bus: Bus,
  ) {
  }

  private async getAuthToken() {
    const authCredentials = {
      username: 'admin',
      password: 'admin',
    };
    const response = await Axios.post('http://localhost/api/docs/#api-token-auth', authCredentials);
    let contents = {};
    response.data.json().then(
      (data: JSON) => { contents = data; },
    );
    return contents.token;
  }

  // private async addEmployee(employee: ZKTEmployee): void {

  // }

  async handle(message: ZKTecoMessageReceived): Promise<void> {
    const { event } = message;
    switch (event.eventType) {
      case ZKTEventType.EmployeeAdded:
        this.addEmployee(event.subject as ZKTEmployee);
        break;
      default:
        break;
    }
  }
}

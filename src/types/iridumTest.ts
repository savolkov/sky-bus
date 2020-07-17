export type IridiumTest = {
  relayNumber?: number; // TODO: ограничить до 1 2 3 4 по стандарту Спайдера
  relayState?: boolean;
  dvarNumber?: number;
  dvarState?: number;
  description: string;
};

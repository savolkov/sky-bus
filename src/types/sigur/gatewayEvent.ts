export type SigurGatewayEvent = {
  passIndex: number,
  isGatewayPassed: boolean, // false means access has denied
  gatewayId: number,
  isIngoingDirection: boolean, // false means outgoing
  uuidPersone?: string,
  passCardId?: string,
  timestamp: number // unix timestamp in seconds
};

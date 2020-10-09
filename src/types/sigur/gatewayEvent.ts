export type SigurGatewayEvent = {
  passIndex: number,
  isGatewayPassed: boolean, // false means access has denied
  gatewayId: number,
  isIngoingDirection: boolean, // false means outgoing
  uuidPersone: string | null,
  passCardId: string | null,
  timestamp: number // unix timestamp in seconds
};

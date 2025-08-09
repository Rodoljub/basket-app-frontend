export interface RouteStore {
  id: number;
  routeId: number;
  driverId: number;
  name: string;
  placeId: number;
  order: number;
  createdAt: string;
  place: {
    id: number;
    name: string;
    type: string;
  };
}

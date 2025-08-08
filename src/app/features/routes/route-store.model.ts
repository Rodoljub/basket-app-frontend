export interface RouteStore {
  id: number;
  routeId: number;
  placeId: number;
  order: number;
  createdAt: string;
  place: {
    id: number;
    name: string;
    type: string;
  };
}

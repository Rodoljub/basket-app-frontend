import { Place } from "../places/place.model";

export interface RouteStore {
  id: number;
  routeId: number;
  driverId: number;
  name: string;
  placeId: number;
  order: number;
  createdAt: string;
  place: Place
}

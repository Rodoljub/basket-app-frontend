
export type PlaceType = 'WAREHOUSE' | 'STORE' | 'VAN';

export interface Place {
  id: number;
  name: string;
  type: PlaceType
}

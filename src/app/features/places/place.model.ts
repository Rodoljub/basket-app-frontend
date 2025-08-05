export interface Place {
  id: number;
  name: string;
  type: 'STORE' | 'VAN' | 'WAREHOUSE'; // from your enum
}

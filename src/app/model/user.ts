export interface User {
  id: number;
  name: string;
  email: string;
  contact: number;
  assignments?: number;
  sitesAssigned?: number;
  metricsAssigned?: number;
}

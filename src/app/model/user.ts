export interface User {
  id: number;
  name: string;
  email: string;
  mobile: number;
  assignments?: number;
  sitesAssigned?: number;
  metricsAssigned?: number;
}

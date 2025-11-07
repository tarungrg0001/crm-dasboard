export interface Assignment {
  id: number;
  status: string;
  assignedOn: string;
  assignedBy: string;
  site?: string;
  assignedTo?: string[];
  dueOn?: string;
  note?: string;
}

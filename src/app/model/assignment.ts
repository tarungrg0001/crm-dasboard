export class Assignment {
  constructor(
    public id: number,
    public status: string,
    public assignedBy: string,
    public assignedOn: Date,
    public site: string,
    public assignedTo?: string[],
    public dueOn?: Date,
    public description?: string
  ) {}
}

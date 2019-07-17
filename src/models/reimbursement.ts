export default class Reimbursement {
    public reimbursementId: number;
    public author: number;
    public amount: number;
    public dateSubmitted: Date;
    public dateResolved: Date;
    public resolver: number;
    public status: number;
    public type: number;
    public description: string;

 
    constructor(obj) {
        if (!obj) {
            return;
        }

        this.reimbursementId = obj.reimbursementid;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.date_submitted;
        this.dateResolved = obj.date_resolved;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
        this.description = obj.description;
    }
  
}
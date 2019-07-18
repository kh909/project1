export default class Reimbursement {
    public reimbursementId: number;
    public author: number;
    public amount: number;
    public dateSubmitted: String;
    public dateResolved: String;
    public resolver: number;
    public status: number;
    public type: number;
    public description: string;

 
    constructor(obj) {
        if (!obj) {
            return;
        }

        this.reimbursementId = obj.reimbursementId;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSubmitted = obj.dateSubmitted;
        this.dateResolved = obj.dateResolved;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
        this.description = obj.description;
    }
  
}
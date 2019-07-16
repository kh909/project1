export default class Reimbursement {
    public reimbursementId: number;
    public author: number;
    public amount: number;
    public dateSumbmitted: Date;
    public dateResolved: Date;
    public resolver: number;
    public status: number;
    public type: number;

 
    constructor(obj) {
        if (!obj) {
            return;
        }

        this.reimbursementId = obj.id;
        this.author = obj.author;
        this.amount = obj.amount;
        this.dateSumbmitted = obj.dateSumbmitted;
        this.dateResolved = obj.dateResolved;
        this.resolver = obj.resolver;
        this.status = obj.status;
        this.type = obj.type;
    }
  
}
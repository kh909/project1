export default class User {
    public userId: number;
    public username: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: number;

 
    constructor(obj) {
        if (!obj) {
            return;
        }

        this.userId = obj.id;
        this.username = obj.username;
        this.password = obj.password;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.role = obj.role;
    }
  
}
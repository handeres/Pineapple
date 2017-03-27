export class User {
    id: number;
    name: string;
    password: string;
    role: string;
    token: string;
    contractId: string;
    firstLogin: boolean = true;
}

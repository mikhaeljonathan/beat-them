export default class Player {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    public getUsername(): string {
        return this.username;
    }
}
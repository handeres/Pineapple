export interface NavMenuItem {
    name: string;
    commands: any[];
    callback?: any;
    clearHistory?: boolean;
}

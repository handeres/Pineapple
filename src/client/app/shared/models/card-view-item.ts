export interface CardViewItem {
    id: string;
    image: string;
    title: string;
    actions: Array<CardViewItemAction>;
}

export interface CardViewItemAction {
    image: string;
    callback: any;
}

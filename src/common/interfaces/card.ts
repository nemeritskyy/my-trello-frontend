export interface ICard {
    id: number;
    title: string;
    cards?: Array<{
        id: number;
        title: string;
    }>;
    position: number;
}

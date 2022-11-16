import { Separator } from '../enums/Separator';

export interface Set {
    id?: number;
    title: string;
    sort: number;
    notes: string;
    content: (number | string | Separator)[];
    start_time?: Date;
    end_time?: Date;
    id_setlist: number;
}

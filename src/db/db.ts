import Dexie, { Table } from 'dexie';
import { Project } from '../model/interfaces/Project';
import { Set } from '../model/interfaces/Set';
import { Setlist } from '../model/interfaces/Setlist';
import { Song } from '../model/interfaces/Song';

export class TypedDexie extends Dexie {
    project!: Table<Project>;
    song!: Table<Song>;
    setlist!: Table<Setlist>;
    set!: Table<Set>;

    constructor() {
        super('bandit');
        this.version(10).stores({
            project: '++id, name, slug',
            song: '++id, number, title, artist, id_project, [id_project+id]',
            setlist: '++id, title, date, location, id_project',
            set: '++id, sort, start_time, end_time, *content, id_setlist',
        });
    }
}

export const db = new TypedDexie();

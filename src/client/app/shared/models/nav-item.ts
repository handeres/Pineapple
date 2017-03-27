import { NavMenuItem } from '../index';

export interface NavItem extends NavMenuItem {
    id: string;
    index: number;
}
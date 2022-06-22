import { ActionInterface, ActionPayload } from "../types";
export interface SortableTableSet {
    key: string;
    field: string;
    ascending: boolean;
}
export interface SortableTablesPayload extends ActionPayload {
    key: string;
    field: string;
    ascending: boolean;
}
export interface SortableTablesAction extends ActionInterface {
    payload: SortableTablesPayload;
}
export interface KeyedTableSet {
    [key: string]: SortableTableSet;
}
export interface SorterProps {
    field: string;
    ascending: boolean;
}
interface RootStateWithTables {
    tables: KeyedTableSet;
}
export declare const tablesSortChanged = "tables/sortChanged";
export declare const tablesTableAdded = "tables/tableAdded";
export declare const selectTableSort: (key: string) => (state: RootStateWithTables) => SortableTableSet;
export declare const sortChangedAction: ({ key, field, ascending }: SortableTableSet) => SortableTablesAction;
export declare const tableAddedAction: ({ key, field, ascending }: SortableTableSet) => SortableTablesAction;
declare const sortableTablesReducer: (state: KeyedTableSet | undefined, action: SortableTablesAction) => KeyedTableSet;
export default sortableTablesReducer;

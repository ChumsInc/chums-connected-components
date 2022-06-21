import {ActionInterface, ActionPayload} from "../types";


export interface SortableTableSet {
    key: string,
    field: string,
    ascending: boolean,
}

export interface SortableTablesPayload extends ActionPayload {
    key: string,
    field: string,
    ascending: boolean,
}

export interface SortableTablesAction extends ActionInterface {
    payload: SortableTablesPayload,
}

export interface KeyedTableSet {
    [key: string]: SortableTableSet
}

export interface SorterProps {
    field: string,
    ascending: boolean,
}


interface RootStateWithTables {
    tables: KeyedTableSet,
}

export const tablesSortChanged = 'tables/categorySortChanged';
export const tablesTableAdded = 'tables/tableAdded';

export const selectTableSort = (key: string) => (state: RootStateWithTables): SortableTableSet => state.tables[key] || {
    key,
    field: '',
    ascending: true
};


export const sortChangedAction = ({key, field, ascending}: SortableTableSet): SortableTablesAction => ({
    type: tablesSortChanged,
    payload: {key, field, ascending}
});

export const tableAddedAction = ({key, field, ascending = true}: SortableTableSet): SortableTablesAction => ({
    type: tablesTableAdded,
    payload: {key, field, ascending}
})

const sortableTablesReducer = (state: KeyedTableSet = {}, action: SortableTablesAction): KeyedTableSet => {
    const {type, payload} = action;
    if (!payload || !payload.key) {
        return state;
    }
    const {key, field, ascending} = payload;
    switch (type) {
    case tablesSortChanged:
        return {
            ...state,
            [key]: {key, field, ascending}
        }
    case tablesTableAdded:
        if (!state[key]) {
            return {
                ...state,
                [key]: {key, field, ascending}
            }
        }
        return state;
    default:
        return state;
    }
}

export default sortableTablesReducer;

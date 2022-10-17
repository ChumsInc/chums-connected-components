import {ActionInterface, ActionPayload} from "../types";
import {filterPage} from "chums-components/dist/Pager";

export interface PagePayload extends ActionPayload {
    key: string,
    page?: number,
    rowsPerPage?: number,
}

export interface PageAction extends ActionInterface {
    payload: PagePayload
}

export interface PageSet {
    page: number,
    rowsPerPage: number,
}

export interface KeyedPageState {
    [key: string]: PageSet
}

interface RootStateWithPages {
    pageSets: KeyedPageState,
}

export const addPageSet = 'pageSets/pageSetAdded';
export const currentPageChanged = 'pageSets/currentPageChanged';
export const rowsPerPageChanged = 'pageSets/rowsPerPageChanged';

export const defaultPageSet:PageSet = {
    page: 1,
    rowsPerPage: 25,
}
export const setPageAction = ({key = 'app', page}: PagePayload): PageAction => ({
    type: currentPageChanged,
    payload: {key, page}
});
export const setRowsPerPageAction = ({key = 'app', rowsPerPage, page}: PagePayload): PageAction => ({
    type: rowsPerPageChanged,
    payload: {key, rowsPerPage, page}
});

export const addPageSetAction = ({
                                     key = 'app',
                                     page = defaultPageSet.page,
                                     rowsPerPage = defaultPageSet.rowsPerPage
                                 }: PagePayload): PageAction => ({
    type: addPageSet,
    payload: {key, page, rowsPerPage}
});


export const selectCurrentPage = (key: string) => (state: RootStateWithPages): number => state.pageSets && state.pageSets[key]
    ? state.pageSets[key].page
    : defaultPageSet.page;
export const selectRowsPerPage = (key: string) => (state: RootStateWithPages): number => state.pageSets && state.pageSets[key]
    ? state.pageSets[key].rowsPerPage
    : defaultPageSet.rowsPerPage;
export const selectPageSet = (key:string) => (state:RootStateWithPages):PageSet => state.pageSets && state.pageSets[key]
    ? ({...defaultPageSet, ...state.pageSets[key]})
    : {...defaultPageSet};

export const selectPageSets = (state:RootStateWithPages): KeyedPageState => state.pageSets;

export const selectPageFilter = (key: string) => (state: RootStateWithPages) => {
    const page = selectCurrentPage(key)(state);
    const rowsPerPage = selectRowsPerPage(key)(state);
    return filterPage(page, rowsPerPage);
}
export const selectPagedData = (key:string, data: any[]) => (state:RootStateWithPages):any[] => {
    const page = selectCurrentPage(key)(state);
    const rowsPerPage = selectRowsPerPage(key)(state);
    const filter = filterPage(page, rowsPerPage);
    return data.filter(filter);

}

const pageSetReducer = (state: KeyedPageState = {}, action: PageAction): KeyedPageState => {
    const {type, payload} = action;
    if (!payload || !payload.key) {
        return state;
    }
    const {key = 'app', ...rest} = payload;
    switch (type) {
    case currentPageChanged:
        if (state[key]) {
            return {
                ...state,
                [key]: {...state[key], ...rest}
            }
        }
        return state;
    case rowsPerPageChanged:
        if (state[key]) {
            return {
                ...state,
                [key]: {...state[key], ...rest}
            }
        }
        return state;
    case addPageSet:
        if (!state[key]) {
            return {
                ...state,
                [key]: {...defaultPageSet, ...rest},
            }
        }
        return state;
    default:
        return state;
    }
}

export default pageSetReducer;

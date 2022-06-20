import { ActionInterface, ActionPayload } from "../types";
export interface PagePayload extends ActionPayload {
    key: string;
    page?: number;
    rowsPerPage?: number;
}
export interface PageAction extends ActionInterface {
    payload: PagePayload;
}
export interface PageSet {
    page: number;
    rowsPerPage: number;
}
export interface KeyedPageState {
    [key: string]: PageSet;
}
interface RootStateWithPages {
    pageSets: KeyedPageState;
}
export declare const addPageSet = "pageSets/pageSetAdded";
export declare const currentPageChanged = "pageSets/currentPageChanged";
export declare const rowsPerPageChanged = "pageSets/rowsPerPageChanged";
export declare const defaultPageSet: PageSet;
export declare const setPageAction: ({ key, page }: PagePayload) => PageAction;
export declare const setRowsPerPageAction: ({ key, rowsPerPage, page }: PagePayload) => PageAction;
export declare const addPageSetAction: ({ key, page, rowsPerPage }: PagePayload) => PageAction;
export declare const selectCurrentPage: (key: string) => (state: RootStateWithPages) => number;
export declare const selectRowsPerPage: (key: string) => (state: RootStateWithPages) => number;
export declare const selectPageSet: (key: string) => (state: RootStateWithPages) => PageSet;
export declare const selectPageFilter: (key: string) => (state: RootStateWithPages) => (row: any, index: number) => boolean;
export declare const selectPagedData: (key: string, data: any[]) => (state: RootStateWithPages) => any[];
declare const pageSetReducer: (state: KeyedPageState | undefined, action: PageAction) => KeyedPageState;
export default pageSetReducer;

import { filterPage } from "chums-components/dist/Pager";
export const addPageSet = 'pageSets/pageSetAdded';
export const currentPageChanged = 'pageSets/currentPageChanged';
export const rowsPerPageChanged = 'pageSets/rowsPerPageChanged';
export const defaultPageSet = {
    page: 1,
    rowsPerPage: 25,
};
export const setPageAction = ({ key = 'app', page }) => ({
    type: currentPageChanged,
    payload: { key, page }
});
export const setRowsPerPageAction = ({ key = 'app', rowsPerPage, page }) => ({
    type: rowsPerPageChanged,
    payload: { key, rowsPerPage, page }
});
export const addPageSetAction = ({ key = 'app', page = defaultPageSet.page, rowsPerPage = defaultPageSet.rowsPerPage }) => ({
    type: addPageSet,
    payload: { key, page, rowsPerPage }
});
export const selectCurrentPage = (key) => (state) => state.pageSets && state.pageSets[key] ? state.pageSets[key].page : defaultPageSet.page;
export const selectRowsPerPage = (key) => (state) => state.pageSets && state.pageSets[key] ? state.pageSets[key].rowsPerPage : defaultPageSet.rowsPerPage;
export const selectPageSet = (key) => (state) => state.pageSets && state.pageSets[key] ? ({ ...defaultPageSet, ...state.pageSets[key] }) : { ...defaultPageSet };
export const selectPageFilter = (key) => (state) => {
    const page = selectCurrentPage(key)(state);
    const rowsPerPage = selectRowsPerPage(key)(state);
    return filterPage(page, rowsPerPage);
};
export const selectPagedData = (key, data) => (state) => {
    const page = selectCurrentPage(key)(state);
    const rowsPerPage = selectRowsPerPage(key)(state);
    const filter = filterPage(page, rowsPerPage);
    return data.filter(filter);
};
const pageSetReducer = (state = {}, action) => {
    const { type, payload } = action;
    if (!payload || !payload.key) {
        return state;
    }
    const { key = 'app', ...rest } = payload;
    switch (type) {
        case currentPageChanged:
            if (state[key]) {
                return {
                    ...state,
                    [key]: { ...state[key], ...rest }
                };
            }
            return state;
        case rowsPerPageChanged:
            if (state[key]) {
                return {
                    ...state,
                    [key]: { ...state[key], ...rest }
                };
            }
            return state;
        case addPageSet:
            if (!state[key]) {
                return {
                    ...state,
                    [key]: { ...defaultPageSet, ...rest },
                };
            }
            return state;
        default:
            return state;
    }
};
export default pageSetReducer;
//# sourceMappingURL=index.js.map
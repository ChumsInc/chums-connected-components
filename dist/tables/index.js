export const tablesSortChanged = 'tables/categorySortChanged';
export const tablesTableAdded = 'tables/tableAdded';
export const selectTableSort = (key) => (state) => state.tables[key] || {
    key,
    field: '',
    ascending: true
};
export const sortChangedAction = ({ key, field, ascending }) => ({
    type: tablesSortChanged,
    payload: { key, field, ascending }
});
export const tableAddedAction = ({ key, field, ascending = true }) => ({
    type: tablesTableAdded,
    payload: { key, field, ascending }
});
const sortableTablesReducer = (state = {}, action) => {
    const { type, payload } = action;
    if (!payload || !payload.key) {
        return state;
    }
    const { key, field, ascending } = payload;
    switch (type) {
        case tablesSortChanged:
            return {
                ...state,
                [key]: { key, field, ascending }
            };
        case tablesTableAdded:
            if (!state[key]) {
                return {
                    ...state,
                    [key]: { key, field, ascending }
                };
            }
            return state;
        default:
            return state;
    }
};
export default sortableTablesReducer;
//# sourceMappingURL=index.js.map
const initialState = {
    app: { list: [], selected: '' },
};
const defaultTabsKey = 'app';
export const tabsListCreated = 'tabs/list-created';
export const tabsTabSelected = 'tabs/tab-selected';
export const tabsTabAdded = 'tabs/tab-added';
export const tabsTabRemoved = 'tabs/tab-removed';
export const tabsToggleTabStatus = 'tabs/toggle-tab-status';
export const tabsUpdated = 'tabs/tabs-updated';
export const tabListCreatedAction = (list, key = defaultTabsKey, selectedId) => ({
    type: tabsListCreated,
    payload: { key, list, id: selectedId }
});
export const tabSelectedAction = (id, key = defaultTabsKey) => ({
    type: tabsTabSelected,
    payload: { key, id }
});
export const tabAddedAction = (tab, key = defaultTabsKey) => ({
    type: tabsTabAdded,
    payload: { key, tab }
});
export const tabRemovedAction = (id, key = defaultTabsKey) => ({
    type: tabsTabRemoved,
    payload: { key, id }
});
export const tabToggleStatusAction = (id, key = defaultTabsKey, force) => ({
    type: tabsToggleTabStatus,
    payload: { key, id, status: force }
});
export const updateTabsAction = (key = defaultTabsKey, props, selected) => ({
    type: tabsUpdated,
    payload: { key, updates: props, id: selected }
});
export const selectTabList = (key = defaultTabsKey) => (state) => {
    if (!state.tabs[key]) {
        return [];
    }
    return state.tabs[key].list;
};
export const selectCurrentTab = (key = defaultTabsKey) => (state) => {
    if (!state.tabs[key]) {
        return '';
    }
    const { list = [], selected = '' } = state.tabs[key];
    const [id] = list.filter(tab => tab.id === selected).map(tab => tab.id);
    return id || '';
};
export const selectTabById = (id, key = defaultTabsKey) => (state) => {
    if (!state.tabs[key]) {
        return { id: '', title: '' };
    }
    const [tab] = state.tabs[key].list.filter(tab => tab.id === id);
    return tab;
};
const nextTabId = (tabSet, id) => {
    if (tabSet.selected === id) {
        let found = false;
        let newIndex = -1;
        tabSet.list.forEach((tab, index) => {
            if (found && newIndex === -1) {
                newIndex = index;
            }
            if (tab.id === id) {
                found = true;
            }
        });
        if (newIndex === -1) {
            newIndex = Math.max(tabSet.list.length - 1, 0);
        }
        return tabSet.list[newIndex].id;
    }
    return id;
};
const modifyTabSet = (state, key, tabsModifier) => {
    if (!state[key]) {
        return state;
    }
    const tabSet = tabsModifier(state[key]);
    return {
        ...state,
        [key]: tabSet,
    };
};
const addTabSetReducer = (list, id) => {
    return {
        list: [...list],
        selected: id || (list.length === 0 ? '' : list[0].id)
    };
};
const addTabReducer = (tab) => (tabs) => {
    if (tabs.list.filter(t => t.id === tab.id).length) {
        return tabs;
    }
    return {
        list: [...tabs.list, tab],
        selected: tabs.selected,
    };
};
const removeTabReducer = (id) => (tabs) => {
    const list = [...tabs.list.filter(t => t.id !== id)];
    return {
        list,
        selected: tabs.selected === id ? nextTabId({ ...tabs, list }, id) : tabs.selected
    };
};
const toggleTabDisabledReducer = (id, force) => (tabs) => {
    const list = tabs.list.map(tab => {
        if (tab.id !== id) {
            return tab;
        }
        return {
            ...tab,
            disabled: force === undefined ? !tab.disabled : !force
        };
    });
    return {
        list,
        selected: tabs.selected === id ? nextTabId({ ...tabs, list }, id) : tabs.selected
    };
};
const updateTabsReducer = (updates, nextTab) => (tabs) => {
    return {
        selected: nextTab || tabs.selected,
        list: tabs.list.map(tab => {
            const [update = {}] = updates.filter(t => t.id === tab.id);
            return { ...tab, ...update };
        })
    };
};
const tabsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case tabsListCreated:
            if (!state[payload.key]) {
                const { list = [], id = '' } = payload;
                return {
                    ...state,
                    [payload.key]: addTabSetReducer(list, id)
                };
            }
            return state;
        case tabsTabAdded:
            if (payload?.tab) {
                return modifyTabSet(state, payload.key, addTabReducer(payload.tab));
            }
            return state;
        case tabsTabRemoved:
            if (payload?.id) {
                return modifyTabSet(state, payload.key, removeTabReducer(payload.id));
            }
            return state;
        case tabsToggleTabStatus:
            if (payload?.id) {
                return modifyTabSet(state, payload.key, toggleTabDisabledReducer(payload.id, payload.status));
            }
            return state;
        case tabsTabSelected:
            if (payload?.id) {
                return modifyTabSet(state, payload.key, (tabs) => ({
                    ...tabs,
                    selected: payload.id || tabs.list[0].id || ''
                }));
            }
            return state;
        case tabsUpdated:
            if (payload.updates && payload.updates.length) {
                return modifyTabSet(state, payload.key, updateTabsReducer(payload.updates, payload.id));
            }
            return state;
        default:
            return state;
    }
};
export default tabsReducer;
//# sourceMappingURL=index.js.map
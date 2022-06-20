import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { TabList } from "chums-components";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTab, selectTabList, tabListCreatedAction, tabRemovedAction, tabSelectedAction } from "./index";
const ConnectedTabs = ({ tabKey, tabs, defaultTabId, className, itemClassName, onSelectTab, onCloseTab, children, }) => {
    const dispatch = useDispatch();
    const list = useSelector(selectTabList(tabKey));
    const currentTab = useSelector(selectCurrentTab(tabKey));
    useEffect(() => {
        dispatch(tabListCreatedAction(tabs, tabKey, defaultTabId));
    }, []);
    const selectTabHandler = (tab) => {
        dispatch(tabSelectedAction(tab.id, tabKey));
        if (onSelectTab) {
            onSelectTab(tab);
        }
    };
    const closeTabHandler = (tab) => {
        dispatch(tabRemovedAction(tab.id, tabKey));
        if (onCloseTab) {
            onCloseTab(tab);
        }
    };
    return (_jsx(TabList, { tabs: list, currentTabId: currentTab, onSelectTab: selectTabHandler, onCloseTab: closeTabHandler, className: className, itemClassName: itemClassName, children: children }));
};
export default ConnectedTabs;
//# sourceMappingURL=ConnectedTabs.js.map
import React, {useEffect} from 'react';
import {TabList, TabListProps} from "chums-components";
import {Tab} from "chums-components/dist/TabItem";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTab, selectTabList, tabListCreatedAction, tabRemovedAction, tabSelectedAction} from "./index";

export interface ConnectedTabsProps extends Omit<TabListProps, 'currentTabId' | 'onCloseTab' | 'onSelectTab'> {
    tabKey: string,
    defaultTabId: string,
    onSelectTab?: (tab: Tab) => void,
    onCloseTab?: (tab: Tab) => void,
}

const ConnectedTabs: React.FC<ConnectedTabsProps> = ({
                                                         tabKey,
                                                         tabs,
                                                         defaultTabId,
                                                         className,
                                                         itemClassName,
                                                         onSelectTab,
                                                         onCloseTab,
                                                         children,
                                                     }) => {
    const dispatch = useDispatch();
    const list = useSelector(selectTabList(tabKey));
    const currentTab = useSelector(selectCurrentTab(tabKey));

    useEffect(() => {
        dispatch(tabListCreatedAction(tabs, tabKey, defaultTabId));
    }, []);

    const selectTabHandler = (tab: Tab) => {
        dispatch(tabSelectedAction(tab.id, tabKey));
        if (onSelectTab) {
            onSelectTab(tab);
        }
    }

    const closeTabHandler = (tab: Tab) => {
        dispatch(tabRemovedAction(tab.id, tabKey));
        if (onCloseTab) {
            onCloseTab(tab);
        }
    }

    return (
        <TabList tabs={list} currentTabId={currentTab} onSelectTab={selectTabHandler} onCloseTab={closeTabHandler}
                 className={className} itemClassName={itemClassName}>
            {children}
        </TabList>
    )
}

export default ConnectedTabs;

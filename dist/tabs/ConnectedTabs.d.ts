import React from 'react';
import { TabListProps } from "chums-components";
import { Tab } from "chums-components/dist/TabItem";
export interface ConnectedTabsProps extends Omit<TabListProps, 'currentTabId' | 'onCloseTab' | 'onSelectTab'> {
    tabKey: string;
    defaultTabId: string;
    onSelectTab?: (tab: Tab) => void;
    onCloseTab?: (tab: Tab) => void;
}
declare const ConnectedTabs: React.FC<ConnectedTabsProps>;
export default ConnectedTabs;

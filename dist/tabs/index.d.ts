import { ActionInterface, ActionPayload } from "../types";
import { Tab } from "chums-components/dist/TabItem";
export interface TabSet {
    list: Tab[];
    selected: string;
}
export interface TabPayload extends ActionPayload {
    key: string;
    id?: string;
    tab?: Tab;
    list?: Tab[];
    updates?: Partial<Tab>[];
    status?: boolean;
}
export interface TabAction extends ActionInterface {
    payload: TabPayload;
}
export interface KeyedTabSets {
    [key: string]: TabSet;
}
interface RootStateWithTabs {
    tabs: KeyedTabSets;
}
export declare const tabsListCreated = "tabs/list-created";
export declare const tabsTabSelected = "tabs/tab-selected";
export declare const tabsTabAdded = "tabs/tab-added";
export declare const tabsTabRemoved = "tabs/tab-removed";
export declare const tabsToggleTabStatus = "tabs/toggle-tab-status";
export declare const tabsUpdated = "tabs/tabs-updated";
export declare const tabListCreatedAction: (list: Tab[], key?: string, selectedId?: string) => TabAction;
export declare const tabSelectedAction: (id: string, key?: string) => TabAction;
export declare const tabAddedAction: (tab: Tab, key?: string) => TabAction;
export declare const tabRemovedAction: (id: string, key?: string) => TabAction;
export declare const tabToggleStatusAction: (id: string, key?: string, force?: boolean) => TabAction;
export declare const updateTabsAction: (key: string | undefined, props: Partial<Tab>[], selected?: string) => TabAction;
export declare const selectTabList: (key?: string) => (state: RootStateWithTabs) => Tab[];
export declare const selectCurrentTab: (key?: string) => (state: RootStateWithTabs) => string;
export declare const selectTabById: (id: string, key?: string) => (state: RootStateWithTabs) => Tab;
declare const tabsReducer: (state: KeyedTabSets | undefined, action: TabAction) => KeyedTabSets;
export default tabsReducer;

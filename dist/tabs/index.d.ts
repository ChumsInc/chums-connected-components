import { ActionInterface, ActionPayload } from "../types";
import { Tab } from "chums-components/dist/TabItem";
export interface TabSet<T extends Tab = Tab> {
    list: T[];
    selected: string;
}
export interface TabPayload<T extends Tab = Tab> extends ActionPayload {
    key: string;
    id?: string;
    tab?: T;
    list?: T[];
    updates?: Partial<T>[];
    status?: boolean;
}
export interface TabAction<T extends Tab = Tab> extends ActionInterface {
    payload: TabPayload<T>;
}
export interface KeyedTabSets<T extends Tab = Tab> {
    [key: string]: TabSet<T>;
}
export interface TabState<T extends Tab = Tab> {
    tabs: KeyedTabSets<T>;
}
export declare const tabsListCreated = "tabs/list-created";
export declare const tabsTabSelected = "tabs/tab-selected";
export declare const tabsTabAdded = "tabs/tab-added";
export declare const tabsTabRemoved = "tabs/tab-removed";
export declare const tabsToggleTabStatus = "tabs/toggle-tab-status";
export declare const tabsUpdated = "tabs/tabs-updated";
export declare const tabListCreatedAction: <T extends Tab = Tab>(list: T[], key?: string, selectedId?: string) => TabAction<T>;
export declare const tabSelectedAction: <T extends Tab = Tab>(id: string, key?: string) => TabAction<T>;
export declare const tabAddedAction: <T extends Tab = Tab>(tab: T, key?: string) => TabAction<T>;
export declare const tabRemovedAction: <T extends Tab = Tab>(id: string, key?: string) => TabAction<T>;
export declare const tabToggleStatusAction: <T extends Tab = Tab>(id: string, key?: string, force?: boolean) => TabAction<T>;
export declare const updateTabsAction: <T extends Tab = Tab>(key: string | undefined, props: Partial<T>[], selected?: string) => TabAction<T>;
export declare const selectTabList: <T extends Tab = Tab>(key?: string) => (state: TabState<T>) => T[];
export declare const selectCurrentTab: <T extends Tab = Tab>(key?: string) => (state: TabState<T>) => string;
export declare const selectTabById: <T extends Tab = Tab>(id: string, key?: string) => (state: TabState<T>) => T;
declare const tabsReducer: (state: KeyedTabSets<Tab> | undefined, action: TabAction) => KeyedTabSets;
export default tabsReducer;

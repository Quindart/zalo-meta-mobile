import { ROUTING } from "@/utils/constant";
export type RootStackParamList = {
    [ROUTING.HOME]: undefined;
    [ROUTING.LOGIN]: undefined;
    [ROUTING.REGISTER]: undefined;
    [ROUTING.TAB_WITH_HEADER_NAVIGATION]: undefined;
    [ROUTING.CONTACTS_SCREEN]: undefined;
    [ROUTING.DISCOVERY_SCREEN]: undefined;
    [ROUTING.PROFILE_SCREEN]: undefined;
    [ROUTING.DIARY_SCREEN]: undefined;
    [ROUTING.CHAT_LIST_SCREEN]: undefined;
    [ROUTING.SEARCH_SCREEN]: undefined;
    [ROUTING.CHAT_SCREEN]: { item: any };
};
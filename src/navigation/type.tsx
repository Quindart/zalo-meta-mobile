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
    [ROUTING.PROFILE]: undefined;
    [ROUTING.FORGOT_PASSWORD]: undefined;
    [ROUTING.RESET_PASSWORD]: { email: string };
    [ROUTING.QR]: undefined;
    [ROUTING.QR_SCAN]: undefined;
};
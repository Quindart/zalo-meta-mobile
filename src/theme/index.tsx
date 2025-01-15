import { configureFonts, MD3LightTheme as DefaultTheme, MD3Theme, } from "react-native-paper";
import colors from "./color";
import { fontConfig } from "./font";

const theme: MD3Theme = {
    ...DefaultTheme,
    colors: colors,
    roundness: 1, /// Độ bo tròn của góc 
    fonts: configureFonts({ config: fontConfig }),
}
export default theme;
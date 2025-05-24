import { useTheme } from "react-native-paper";
import { AppTheme } from "../services/theme-service";
export const useAppTheme = () => useTheme<AppTheme>();

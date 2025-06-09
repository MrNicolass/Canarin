import { ViewProps } from "react-native";

export type BaseViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};
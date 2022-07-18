import { Platform } from "react-native";

export default {
  primaryFont: Platform.OS === "ios" ? "Times New Roman" : "serif"
};

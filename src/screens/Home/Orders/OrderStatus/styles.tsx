import { StyleSheet } from "react-native";
import { Colors, fonts } from "@/themes";

export default StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 24,
    lineHeight: 31,
    color: Colors.black,
  },
  colorGreyText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.grey,
  },
  orderStatusDesc: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 24,
    lineHeight: 31,
    color: Colors.black,
    textAlign: "center",
  },
  orderTitleText: {
    fontFamily: fonts.DMSans500Medium,
    fontSize: 16,
    lineHeight: 21,
    color: Colors.black,
  },
  headerContainerView: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightestGrey,
  },
});

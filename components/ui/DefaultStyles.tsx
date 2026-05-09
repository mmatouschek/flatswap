import { StyleSheet } from "react-native";

export const DefaultStyles = StyleSheet.create({
  button: {
	height:500,
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  text: {
    fontSize: 16,
    color: "#111",
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 16,
    color: "#111",
  },
});
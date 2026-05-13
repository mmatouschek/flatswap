import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loginUser() {
  await AsyncStorage.setItem("isLoggedIn", "true");
}

export async function logoutUser() {
  await AsyncStorage.removeItem("isLoggedIn");
}

export async function isUserLoggedIn() {
  const value = await AsyncStorage.getItem("isLoggedIn");

  return value === "true";
}
export async function registerUser(user: any) {
  const existing = await AsyncStorage.getItem("users");

  const parsed = existing ? JSON.parse(existing) : [];

  parsed.push(user);

  await AsyncStorage.setItem("users", JSON.stringify(parsed));
}
export async function validateUser(email: string, password: string) {
  const existing = await AsyncStorage.getItem("users");

  const users = existing ? JSON.parse(existing) : [];

  return users.find(
    (user: any) => user.email === email && user.password === password,
  );
}
export async function getCurrentUser() {
  const users = await AsyncStorage.getItem("users");

  return users ? JSON.parse(users) : [];
}

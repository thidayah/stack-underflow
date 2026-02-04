import { AppContext } from "@/context/AppContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  // const { onLogin } = useAppStore(state => state)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Warning", "Username and password reuired!");
      return;
    }
    setLoading(true)
    dispatch({ type: "LOGIN", payload: username });
    // onLogin(username)
    setTimeout(() => {
      router.replace({
        pathname: "/questions",
        // params: { username },
      });
    }, 500);
  };  
 
  return (
    <View style={styles.container}>
      {/* <Button title="+" onPress={onIncrement} />
      <Text>{count}</Text>
      <Button title="-" onPress={onDecrement} /> */}
      <Text style={styles.subtitle}>Welcome to</Text>
      <Text style={styles.title}>Stack Underflow</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      // autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 8,
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "white",
  },
  button: {
    backgroundColor: "gray",
    padding: 16,
    borderRadius: 99,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

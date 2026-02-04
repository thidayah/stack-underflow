import { AppContext } from "@/context/AppContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuestionListPage() {
  const { username } = useLocalSearchParams()
  const { state, dispatch } = useContext(AppContext);
  // const state = useAppStore(state => state)
  console.log({ state });

  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.replace("/");
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/questions/${item.id}` as any)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        Status: {item.status}
      </Text>
      <View style={styles.createdWrapper}>
        <Text style={styles.date}>
          {/* {new Date(item.createdAt).toLocaleString()} */}
          {moment(item.createdAt).format('DD MMM YYYY - hh:mm:ss')}
        </Text>
        <Text style={styles.meta}>by {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back, {state.user}!</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/questions/ask")}>
          <Text style={styles.ask}>+ Ask a Question</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state.questions}
        // data={[]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={styles.noQuestionsText}>
            No questions yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600"
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    // backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  ask: {
    fontWeight: "600",
    color: '#2f80ed'
  },
  logout: {
    color: "red",
    fontWeight: "600"
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6
  },
  meta: {
    fontSize: 12,
    color: "gray"
  },
  createdWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  date: {
    fontSize: 11,
    marginTop: 4
  },
  noQuestionsText: {
    textAlign: "center",
    marginTop: 40
  }
});

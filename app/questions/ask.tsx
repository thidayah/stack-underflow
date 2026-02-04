import { AppContext } from "@/context/AppContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AskQuestionPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams()
  const { state, dispatch } = useContext(AppContext);
  // const state = useAppStore(state => state)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      let q = state.questions.find((f: any) => f.id === id)
      setCurrentQuestion(q)
      setTitle(q.title)
      setDescription(q.description)
    }
  }, [id])

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Warning", "Title and Description required!");
      return;
    }
    if (id) {
      const updateQuestion = {
        id: currentQuestion.id,
        title,
        description,
        status: currentQuestion.status,
        createdAt: new Date().toISOString(),
        author: state.user,
        comments: currentQuestion.comments,
      };
      dispatch({ type: "UPDATE_QUESTION", payload: updateQuestion });      
    } else {
      const newQuestion = {
        // id: uuidv4(),
        id: Math.floor(Math.random() * 99999).toString(),
        title,
        description,
        status: "open",
        createdAt: new Date().toISOString(),
        author: state.user,
        comments: [],
      };
      dispatch({ type: "ADD_QUESTION", payload: newQuestion });
      // state.onAddQuestion(newQuestion as any)
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{id ? 'Edit' : 'Add'} question?</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Full description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "white",
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "gray",
    padding: 16,
    borderRadius: 99,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

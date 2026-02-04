import { AppContext } from "@/context/AppContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function QuestionDetailPage() {
  const { id } = useLocalSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter()
  const question = state.questions.find((q: any) => q.id === id);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  if (!question) {
    return (
      <View style={styles.center}>
        <Text>Question can't find</Text>
      </View>
    );
  }

  const handleAddComment = () => {
    if (!commentText) return;

    if (editingCommentId) {
      dispatch({
        type: "UPDATE_COMMENT",
        payload: {
          questionId: question.id,
          comment: {
            id: editingCommentId,
            content: commentText,
            author: state.user,
            createdAt: new Date().toISOString(),
          },
        },
      });
      setEditingCommentId(null);
    } else {
      dispatch({
        type: "ADD_COMMENT",
        payload: {
          questionId: question.id,
          comment: {
            id: Math.floor(Math.random() * 99999).toString(),
            content: commentText,
            author: state.user,
            createdAt: new Date().toISOString(),
          },
        },
      });
    }

    setCommentText("");
  };

  const startEditComment = (comment: any) => {
    setEditingCommentId(comment.id);
    setCommentText(comment.content);
  };

  const handleDeleteComment = (comment: any) => {
    Alert.alert(
      "Confirm",
      "Are you sure to remove this comment?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch({
            type: 'DELETE_COMMENT',
            payload: {
              questionId: id,
              comment: {
                id: comment.id
              }
            }
          })
        }
      ],
      { cancelable: false } // Optional: prevents dismissal by tapping outside
    );
  }

  const changeStatus = (status: "open" | "answered" | "closed") => {
    if (question.author !== state.user) {
      Alert.alert("Warning", "Only author can change status");
      return;
    }

    dispatch({
      type: "UPDATE_QUESTION",
      payload: { ...question, status },
    });
  };

  const handleEditQuestion = (id: string | string[]) => {
    const questionId = Array.isArray(id) ? id[0] : id;
    router.navigate({
      pathname: '/questions/ask',
      params: { id: questionId }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.desc}>{question.description}</Text>
        <Text style={styles.meta}>
          Status: {question.status}
        </Text>
        <View style={styles.createdWrapper}>
          <Text style={styles.meta}>
            {moment(question.createdAt).format('DD MMM YYYY - hh:mm:ss')}
          </Text>
          <Text style={styles.meta}>by {question.author}</Text>
        </View>

        {question.author === state.user && (
          <View style={styles.statusRow}>
            <Text style={{ marginBottom: 6 }}>Change Status:</Text>
            <View style={styles.statusButtons}>
              {["open", "answered", "closed"].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.statusBtn}
                  onPress={() => changeStatus(s as any)}
                >
                  <Text style={{ color: "white" }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{ marginVertical: 6 }}>Actions:</Text>
            <View style={styles.statusButtons}>
              <TouchableOpacity onPress={() => handleEditQuestion(id)}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <Text style={styles.commentHeader}>Comments</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Typing..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleAddComment}>
          <Text style={{ color: "white" }}>
            {editingCommentId ? "Update" : "  Send  "}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={question.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text>{item.content}</Text>
            <Text style={styles.commentMeta}>
              by {item.author} • {new Date(item.createdAt).toLocaleString()}
            </Text>

            {item.author === state.user && (
              <View style={{ flexDirection: 'row', columnGap: 12 }}>
                <TouchableOpacity onPress={() => startEditComment(item)}>
                  <Text style={styles.editBtn}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        // contentContainerStyle={{paddingTop: 20}}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginVertical: 40 }}>
            No comments yet
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  desc: { marginBottom: 8 },
  meta: { fontSize: 12, color: "gray" },
  createdWrapper: {
    marginTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  statusRow: { marginTop: 12 },
  statusButtons: { flexDirection: "row", gap: 8 },
  statusBtn: {
    backgroundColor: "#2f80ed",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    marginRight: 6,
  },
  commentHeader: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  commentCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentMeta: { fontSize: 11, color: "#777", marginTop: 4 },
  editBtn: { color: "#2f80ed", marginTop: 4, fontWeight: "600" },
  deleteBtn: { color: "red", marginTop: 4, fontWeight: "600" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#2f80ed",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 99,
  },
});

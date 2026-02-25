import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotesCarousel from "../../components/NotesCarousel";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    activateKeepAwake();
    return () => {
      deactivateKeepAwake();
    };
  }, []);

  // 🔥 Local images (best practice for static assets)
  const images = [
    require("../../assets/images/note1.jpg"),
    require("../../assets/images/note2.jpg"),
    require("../../assets/images/note3.jpg"),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headTitle}>Notes</Text>
      </View>

      {/* Content */}
      <View style={styles.container}>
        {/* Carousel */}
        <NotesCarousel data={images} />

        <View style={{ height: 24 }} />

        {/* Bottom Cards */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.cardTitle}>Recent Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.cardTitle}>Favorites</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-note")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111827",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallCard: {
    flex: 1,
    height: 120,
    marginHorizontal: 6,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },

  fabText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
    marginTop: -2,
  },
});

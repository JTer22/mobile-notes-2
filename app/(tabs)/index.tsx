import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar"; // control phone status bar appearance
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    activateKeepAwake();
    return () => {
      deactivateKeepAwake();
    };
  });

  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar
        style="dark"
        backgroundColor={style.safeArea.backgroundColor}
      />
      <View>
        <Text style={style.HeadTitle}>Notes</Text>
      </View>
      <View style={style.container}>
        {/* Big Box */}
        <View style={style.bigBox}>
          <Text style={style.bigBoxText}>BIG BOX</Text>
        </View>

        {/* Gap */}
        <View style={{ height: 20 }} />

        {/* Row with two boxes */}
        <View style={style.row}>
          <View style={style.box}>
            <Text style={style.boxText}>Recent notes</Text>
          </View>
          <View style={style.box}>
            <Text style={style.boxText}>Box 2</Text>
          </View>
        </View>

        {/* Floating FAB */}
        <TouchableOpacity
          style={style.fab}
          onPress={() => router.push("/add-note")}
        >
          <Text style={style.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB", // light neutral background
  },

  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  bigBox: {
    width: "100%",
    height: 200,
    backgroundColor: "#b4b2ee", // card-like white
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  bigBoxText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827", // dark text
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  box: {
    flex: 1,
    height: 120,
    marginHorizontal: 5,
    backgroundColor: "#c1fce8", // light card
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
    elevation: 1,
  },

  boxText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111827",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8B5CF6", // violet accent
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
    marginTop: -2,
  },

  HeadTitle: {
    fontSize: 50,
    fontWeight: "900",
    fontFamily: "Poppins_400Regular",
    color: "#232831",
    marginLeft: 15,
  },
});

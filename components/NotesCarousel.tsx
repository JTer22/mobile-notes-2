import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

type Props = {
  data: any[];
};

export default function NotesCarousel({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <Carousel
        loop
        autoPlay
        autoPlayInterval={2000}
        width={width - 40}
        height={200}
        data={data}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => setActiveIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 60,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />

      {/* Pagination */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden", // IMPORTANT for rounded image
    backgroundColor: "#eee",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  pagination: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#8B5CF6",
    width: 16,
  },
});

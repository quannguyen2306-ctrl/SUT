import React, { useState, memo } from "react";
import Carousel from "react-native-reanimated-carousel";

import { View, StyleSheet, Image, Pressable } from "react-native";

import { windowWidth, aspectHeight } from "../../context/context";

import { spacing } from "../../constants/constants";

function ImageCarousel({ image, autoPlay }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <View>
            <Carousel
                loop
                autoPlay={autoPlay}
                autoPlayInterval={3000}
                width={windowWidth}
                height={autoPlay == true ? aspectHeight: 233}
                data={image}
                onSnapToItem={(index) => {
                    setCurrentImage(index);
                }}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                renderItem={({ index }) => {
                    if (autoPlay !== true) {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <Image source={{ uri: image[index] }} style={styles.image} />
                            </View>
                        )
                    } else {
                        return (
                            <Pressable
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    overflow: "hidden",
                                }}
                                onPress={() => console.log(image[index])}
                            >
                                <Image source={{ uri: image[index] }} style={styles.image} />
                            </Pressable>
                        )
                    }
                }
                }
            />
            <View style={styles.imageIndicatorContainer}>
                {image.map((item, index) => (
                    <View
                        style={
                            currentImage == index
                                ? styles.imageIndicator
                                : styles.imageIndicatorNot
                        }
                        key={index}
                    ></View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        position: "relative",
        marginBottom: 7,
    },
    image: {
        width: "auto",
        height: 233,
    },
    imageIndicator: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: "white",
    },
    imageIndicatorNot: {
        width: 6,
        height: 6,
        borderRadius: 50,
        backgroundColor: "#D6D6D6",
    },
    imageIndicatorContainer: {
        flexDirection: "row",
        gap: 3,
        position: "absolute",
        top: 200,
        left: spacing.margin,
        opacity: 0.7,
    }
});

export default memo(ImageCarousel);

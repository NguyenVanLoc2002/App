import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-web";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const data1 = [
  { title: "Rating Descending", value: 1 },
  { title: "Rating Ascending", value: 2 },
  { title: "Title A-Z", value: 3 },
];

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [dataPage, setDataPage] = [];

  const navigation = useNavigation();

  // const [myLoop,setMyLoop] = useState([]);
  const [loadFilm, setLoadFilm] = useState(false);
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(20);
  useEffect(() => {
    fechData();
  }, []);

  const fechData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=" +
          page
      );
      const json = await response.json();
      console.log(json.results);
      setData(json.results);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const render = () => {
    const myLoop = [];
    for (let i = 0; i < data.length; i++) {
      myLoop.push(
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Details_film", { itemId: data[i].id })
          }
        >
          <View style={styles.Image} key={index}>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 0.5,
                borderRadius: 10,
                borderColor: "gray",
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${data[i].backdrop_path}`,
                }}
                style={{
                  width: 120,
                  height: 180,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
            <View style={{ margin: 8 }}>
              <Text
                style={{
                  width: "60%", // Đặt chiều rộng tối đa cho Text
                  flexShrink: 1,
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: 10,
                  overflow: "hidden",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data[i].title}
              </Text>
              <Text style={{ color: "#999999" }}>{data[i].release_date}</Text>
              <Text
                style={{
                  width: 220, // Đặt chiều rộng tối đa cho Text
                  flexShrink: 1,
                  fontWeight: "500",
                  color: "#000000",
                  marginTop: 15,
                  overflow: "hidden",
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {data[i].overview}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return myLoop;
  };
  const [value, setValue] = useState(null);
  const sortTitle = () => {
    let sortData;
    sortData = [...data].sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });
    setData(sortData);
  };
  const sortRating = () => {
    let sortData;
    sortData = [...data].sort((a, b) => {
      return (
        (a.vote_average * 100) / a.vote_count -
        (b.vote_average * 100) / b.vote_count
      );
    });
    setData(sortData);
  };
  const sortRatingDescending = () => {
    let sortData;
    sortData = [...data].sort((a, b) => {
      return (
        (b.vote_average * 100) / b.vote_count -
        (a.vote_average * 100) / a.vote_count
      );
    });
    setData(sortData);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#04072A",
          "#06132C",
          "#0A2456",
          "#020711",
          "#07307F",
          "#0E182C",
          "#051637",
          "#030424",
        ]}
        locations={[0, 0.01, 0.1, 0.3, 0.4, 0.5, 0.6, 0.72, 0.8, 1]}
        start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
        end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
            >
              <FontAwesome name="reorder" size={30} color={"white"} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity>
                <FontAwesome
                  onPress={() => navigation.navigate("Login")}
                  name="user"
                  size={30}
                  color={"white"}
                  style={{ marginRight: 18 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="search" size={30} color={"#87cefa"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View style={styles.footer}>
            <View style={{ alignContent: "flex-start", width: "390px" }}>
              <Text
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Popular TV Shows
              </Text>
              <Dropdown
                style={{
                  borderWidth: 0.5,
                  borderRadius: 5,
                  width: "350px",
                  shadowRadius: "5px",
                  height: "50px",
                  shadowColor: "#747272",
                }}
                data={data1}
                placeholderStyle={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginLeft: 10,
                }}
                maxHeight={300}
                labelField="title"
                valueField="value"
                placeholder="Sort...."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  if (item.value == 3) {
                    sortTitle();
                  } else if (item.value == 1) {
                    sortRating();
                  } else {
                    sortRatingDescending();
                  }
                }}
              />
            </View>
            <View>
              <View>
                {render()}
                <View>
                  <Pressable
                    onPress={() => {
                      let pageIndex = page + 1;
                      setPage(pageIndex);
                      if (page != 1) {
                        console.log(pageIndex);
                        console.log(page);
                        setIndex(index + 1);
                        setLength(length + data.length);
                        fechData();
                      }
                    }}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed
                          ? "rgb(210, 230, 255)"
                          : "white",
                      },
                      {
                        flex: 1,
                        backgroundColor: "blue",
                        marginTop: 25,
                        height: "70px",
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Load More
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          <ImageBackground
            source={require("../assets/image/Background/bg_footer.jpg")}
            style={{ width: "100%", height: 400, marginTop: 10 }}
            resizeMode="cover"
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              Join Today
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              Get access to maintain your own custom personal lists, track what
              you've seen and search and filter for what to watch
              next-regardless if it's in theatres, on TV or available on popular
              streaming services like .
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <LinearGradient
                colors={["#FF00A8", "#E22B99", "#C616E3"]}
                locations={[0, 0.1, 0.7, 0.85, 1]}
                start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
                end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
                style={{
                  width: 97,
                  height: 42,
                  borderRadius: 10,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Sign up
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              . Enjoy TMDB ad free {"\n"}· Maintain a personal watchlist{"\n"}·
              Filter by your subscribed streaming services and find something to
              watch{"\n"}· Log the movies and TV shows you've seen{"\n"}· Build
              custom lists{"\n"}· Contribute to and improve our database{"\n"}
            </Text>
          </ImageBackground>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "390.400px",
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    top: 0,
    position: "sticky",
    zIndex: 1,
    padding: 10,
  },
  footer: {
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingTop: "20px",
  },
  Image: {
    flex: 1,
    flexDirection: "row",
    with: 94,
    height: 141,
    marginTop: "50px",
    borderRadius: "8px",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

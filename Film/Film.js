import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { ScrollView } from "react-native-web";
import YoutubeIframe from "react-native-youtube-iframe";
import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function Film() {
  const [playing, setPlaying] = useState(false);
  const [dataSimilar, setDataSimilar] = useState([]);
  const [dataCast, setDataCast] = useState([]);
  const [dataReview, setDataReview] = useState([]);
  const [isLoadReview, setLoadReview] = useState(true);
  const [dataFilm, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [playRef, setPlayRef] = useState();
  const [isLoad, setLoad] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;

  useEffect(() => {
    fechData();
  }, []);

  const render = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ flex: 2, width: 120, height: 233, marginLeft: 20 }}
      >
        <Image
          style={{ width: 120, height: 133 }}
          source={{
            uri:
              dataCast[index].profile_path != null
                ? `https://image.tmdb.org/t/p/w500${dataCast[index].profile_path}`
                : "https://image.tmdb.org/t/p/w500/AbXKtWQwuDiwhoQLh34VRglwuBE.jpg",
          }}
        ></Image>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "black",
            marginLeft: 7,
            marginTop: 20,
          }}
        >
          {dataCast[index].original_name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "200", marginLeft: 7 }}>
          {dataCast[index].character}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleClosePlayer = () => {
    setPlaying(false);
  };
  console.log(playing);

  const renderVideo = () => {
    if (playing == true) {
      return (
        <View style={styles.videoOverlay}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, margin: 8 }}>
              <Text style={styles.title}>
                {dataFilm.videos.results[0].title}
              </Text>
            </View>
            <TouchableOpacity onPress={handleClosePlayer}>
              <View style={{ margin: 8 }}>
                <Text style={styles.closeButtonText}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <YoutubeIframe
              height={300}
              play={true}
              videoId={dataFilm.videos.results[0].key}
              onChangeState={(event) => {
                if (event === "ended") {
                  handleClosePlayer();
                }
              }}
            />
          </View>
        </View>
      );
    }
  };

  const renderGenres = () => {
    const arrayGenres = [];
    for (let index = 0; index < dataFilm.genres.length; index++) {
      arrayGenres.push(
        <Text style={{ color: "white", fontSize: 16, marginRight: 5 }}>
          {dataFilm.genres[index].name}
        </Text>
      );
    }
    return arrayGenres;
  };
  const renderSimilar = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 20, marginBottom: 10 }}
        onPress={() =>
          navigation.navigate("Details_film", { itemId: dataSimilar[index].id })
        }
      >
        <View>
          <Image
            style={{ width: 250, height: 141, borderRadius: 10 }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${dataSimilar[index].poster_path}`,
            }}
          ></Image>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>{dataSimilar[index].title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReview = () => {
    const arrReview = [];
    for (
      let index = 0;
      index < (dataReview.length > 4 ? 3 : dataReview.length);
      index++
    ) {
      arrReview.push(
        <Pressable
          style={{
            marginBottom: 10,
            flexDirection: "row",
            shadowOpacity: 5,
            marginLeft: 20,
            borderRadius: 5,
            borderWidth: 1,
            width: 350,
            height: 99,
            padding: 10,
            marginTop: 20,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Image
              style={{ width: 32, height: 32, borderRadius: 50 }}
              source={{
                uri:
                  dataReview[index].author_details.avatar_path != null
                    ? `https://image.tmdb.org/t/p/w500/${dataReview[index].author_details.avatar_path}`
                    : "https://image.tmdb.org/t/p/w500/4KVM1VkqmXLOuwj1jjaSdxbvBDk.jpg",
              }}
            ></Image>
            <Text style={{ fontSize: 20, color: "black" }}>
              {dataReview[index].author.slice(0, 5)}
            </Text>
          </View>
          <View
            style={{
              alignContent: "flex-end",
              marginLeft: 70,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              {dataReview[index].content.slice(0, 6)}...
            </Text>
            <Text>{dataReview[index].updated_at}</Text>
          </View>
        </Pressable>
      );
    }
    return arrReview;
  };
  const fechData = async () => {
    try {
      const url1 = `https://api.themoviedb.org/3/movie/${itemId}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`;
      const url2 = `https://api.themoviedb.org/3/movie/${itemId}/casts?api_key=e9e9d8da18ae29fc430845952232787c`;
      const url3 = `https://api.themoviedb.org/3/movie/${itemId}/reviews?api_key=e9e9d8da18ae29fc430845952232787c`;
      const url4 = `https://api.themoviedb.org/3/movie/${itemId}/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1`;
      //
      const respone = await Promise.all([
        fetch(url1),
        fetch(url2),
        fetch(url3),
        fetch(url4),
      ]);
      const data1 = await respone[0].json();
      const data2 = await respone[1].json();
      const data3 = await respone[2].json();
      const data4 = await respone[3].json();
      console.log(data1);
      console.log(data2);
      console.log(data3);
      setData(data1);
      setDataCast(data2.cast);
      setDataReview(data3.results);
      setDataSimilar(data4.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={30} color={"white"} />
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
        <ScrollView style={{ flex: 1 }}>
          <View style={{ backgroundColor: "black" }}>
            <View style={{ flex: 4, backgroundColor: "black" }}>
              <SafeAreaView style={{ height: 170 }}>
                <ImageBackground
                  style={styles.image}
                  resizeMode="cover"
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${dataFilm.backdrop_path}`,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 90,
                        height: 135.68,
                        marginLeft: 20,
                        marginTop: 20,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: `https://image.tmdb.org/t/p/original${dataFilm.poster_path}`,
                      }}
                    ></Image>
                  </View>
                </ImageBackground>
              </SafeAreaView>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                flex: 1,
                justifyContent: "center",
                marginTop: 10,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, color: "white", textAlign: "center" }}
              >
                {dataFilm.original_title}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 8,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: 30,
                }}
              >
                <Image
                  style={{ width: 44, height: 44 }}
                  source={require("../assets/071Screenshot 2023-11- 225628 1.png")}
                ></Image>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginTop: 9,
                    marginLeft: 5,
                  }}
                >
                  User Core
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  height: 24,
                  marginLeft: 10,
                  marginTop: 10,
                  backgroundColor: "white",
                  justifyContent: "center",
                  width: 1,
                }}
              ></View>
              <TouchableOpacity
                onPress={() => {
                  setPlaying(true);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 5,
                    marginRight: 30,
                    justifyContent: "flex-end",
                  }}
                >
                  <Image
                    style={{
                      width: 16,
                      marginTop: 5,
                      height: 16,
                      marginRight: 8,
                    }}
                    source={require("../assets/play-button 1.png")}
                  ></Image>

                  <Text style={{ color: "white", fontSize: 16 }}>
                    Play Trailer
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                marginTop: 5,
              }}
            >
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Image
                  style={{ width: 28, height: 20 }}
                  source={require("../assets/Rectangle 10.png")}
                ></Image>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {dataFilm.release_date}(US)
                </Text>

                <View
                  style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
                >
                  {renderGenres()}
                </View>
              </View>
            </View>

            <Text
              style={{
                fontSize: 17,
                fontWeight: 200,
                color: "white",
                marginLeft: 20,
              }}
            >
              Breaking out
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginLeft: 20,
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Overview
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                marginLeft: 20,
                marginBottom: 20,
              }}
            >
              {dataFilm.overview}
            </Text>
          </View>
          {playing && renderVideo()}
          <View style={{ justifyContent: "center" }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                  marginTop: 20,
                  marginLeft: 20,
                  marginBottom: 15,
                }}
              >
                Top Billeds Cast
              </Text>
            </View>
            <View>
              <FlatList
                data={dataCast}
                renderItem={render}
                horizontal
                keyExtractor={(item) => `key-${item.id}`}
              />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: 20,
                  marginTop: 20,
                }}
              >
                Full Cast & Crew
              </Text>
            </View>
          </View>
          <View>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <Text
                style={{ marginLeft: 20, fontSize: 19, fontWeight: "bold" }}
              >
                Social
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 4,
                  marginRight: 10,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 700 }}>
                  Discusstions({dataReview.length})
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 700, marginLeft: 7 }}>
                  Review
                </Text>
              </View>
            </View>
            {renderReview()}
          </View>
          <View>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Recommendations
              </Text>
            </View>
            <View style={{ flex: 3, width: 390, height: 350, marginTop: 10 }}>
              <FlatList
                data={dataSimilar}
                renderItem={renderSimilar}
                horizontal
                keyExtractor={(item) => `key-${item.id}`}
              />
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
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 180,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    top: 0,
    position: "sticky",
    zIndex: 1,
    padding: 10,
  },
  videoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    justifyContent: "space-between",
    height: 300,
    width: "100%",
    zIndex: 999,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

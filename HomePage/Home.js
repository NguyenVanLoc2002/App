import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation, DrawerActions, useRoute } from "@react-navigation/native";

export default function App() {
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [detailsMoviesData, setDetailsMoviesData] = useState([]);
  const [key, setKey] = useState("");
  const [txtSeatch, setTxtSearch] = useState('');

  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const [clickedMovieData, setClickedMovieData] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);


  const navigation = useNavigation();
  const route = useRoute();

  const handleTouchableOpacityClick = (movieData) => {
    setPlayerOpen(true);
    setClickedMovieData(movieData);
    setSelectedMovieId(movieData.id); // Lưu trữ movieId
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setClickedMovieData(null);
  };

  useEffect(() => {
    const fetchNowPlayingData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1"
        );
        const json = await response.json();
        setNowPlayingData(json.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUpcomingMoviesData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1"
        );
        const json = await response.json();
        setUpcomingMoviesData(json.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchPopularMoviesData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1"
        );
        const json = await response.json();
        setPopularMoviesData(json.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchDetailsMovies = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`
        );
        const json = await response.json();
        setDetailsMoviesData(json.videos.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchNowPlayingData();
    fetchUpcomingMoviesData();
    fetchPopularMoviesData();
    fetchDetailsMovies(selectedMovieId);
  }, [selectedMovieId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const renderItemNowPlayingData = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=> navigation.navigate('Details_film',{itemId:item.id})}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          style={{ width: 170, height: 270, borderRadius: 10 }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.navigate('Details_film',{itemId:item.id})}>
        <Text style={{ fontSize: 14, fontWeight: "bold", margin: 8 }}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "#3E2323" }}>
        {formatDate(item.release_date)}
      </Text>
    </View>
  );

  const VideoOverlay = ({ videoId, title, onClose }) => (
    <View style={styles.videoOverlay}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, margin: 8 }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <View style={{ margin: 8 }}>
            <Text style={styles.closeButtonText}>X</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <YoutubePlayer
          height={300}
          play={true}
          videoId={videoId}
          onChangeState={(event) => {
            if (event === "ended") {
              handleClosePlayer();
            }
          }}
        />
      </View>
    </View>
  );

  const renderItemUpComingMoviesData = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleTouchableOpacityClick(item)}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
          }}
          style={{
            width: 370,
            height: 195,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            overflow: "hidden",
          }}
          resizeMode="cover"
          pointerEvents="none"
        >
          <View style={styles.playIconContainer}>
            <FontAwesome name="play" size={50} color={"#ababab"} />
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTouchableOpacityClick(item)}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            margin: 8,
            color: "white",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
        {(() => {
          switch (item.original_language) {
            case "en":
              return "Official English Trailer";
            case "fr":
              return "Official France Trailer";
            case "ja":
              return "Official Japan Trailer";
            case "vi":
              return "Official VietNamese Trailer";
            case "es":
              return "Official Spain Trailer";
            default:
              return "Official English Trailer";
          }
        })()}
      </Text>
    </View>
  );

  useEffect(() => {
    // Đoạn này chạy sau khi detailsMoviesData đã được cập nhật
    if (detailsMoviesData.length > 0) {
      setKey(detailsMoviesData[0].key);
    }
  }, [detailsMoviesData]);

 


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
                <FontAwesome onPress={()=>navigation.navigate("Login")}
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

      <ScrollView>
        <View style={styles.content}>
          <ImageBackground
            source={require("../assets/image/Background/BgHome.jpg")}
            style={{ width: "100%", height: 236 }}
            resizeMode="cover"
          >
            <Text
              style={{
                color: "white",
                fontSize: 26,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Welcome. {"\n"}Millions of movies, TV shows and people to
              discover. Explore now.
            </Text>

            <View
              style={{
                flexDirection: "row",
                margin: 10,
                backgroundColor: "white",
                width: "95%",
                height: 50,
                borderRadius: 50,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  paddingLeft: 10,
                  color: "gray",
                }}
                placeholder="Search"
                onChangeText={setTxtSearch}
              ></TextInput>

              <TouchableOpacity onPress={()=> navigation.navigate("Search",{searchText: txtSeatch})}>
                <LinearGradient
                  colors={["#00FF94", "#2BE274", "#16E38D"]}
                  locations={[0, 0.7, 0.9, 1]}
                  start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
                  end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
                  style={{ borderRadius: 50 }}
                >
                  <View
                    style={{
                      height: 50,
                      width: 115,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Search
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <ImageBackground
            source={require("../assets/image/Background/bgPhim.jpeg")}
            style={{ width: "100%", height: 401 }}
            resizeMode="cover"
          >
            <View
              style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
            >
              <Text
                style={{ marginRight: 30, fontSize: 22, fontWeight: "bold" }}
              >
                Trending
              </Text>

              <TouchableOpacity>
                <View
                  style={{
                    height: 33,
                    width: 106,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(13,13,16)",
                    borderRadius: 40,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#50D06A",
                      marginRight: 8,
                    }}
                  >
                    Today
                  </Text>

                  <FontAwesome
                    name="chevron-down"
                    size={15}
                    color={"#47C186"}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <FlatList
              data={nowPlayingData}
              renderItem={renderItemNowPlayingData}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </ImageBackground>

          <View style={{ backgroundColor: "#01102F", height: 330 }}>
            <View
              style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
            >
              <Text
                style={{
                  marginRight: 30,
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Lastest Trailers
              </Text>

              <TouchableOpacity>
                <LinearGradient
                  colors={["#00FF94", "#23E191", "#05FB94"]}
                  locations={[0, 0.4, 0.8, 1]}
                  start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
                  end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
                  style={{ borderRadius: 40 }}
                >
                  <View
                    style={{
                      height: 33,
                      width: 106,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "black",
                        marginRight: 8,
                      }}
                    >
                      Popular
                    </Text>

                    <FontAwesome
                      name="chevron-down"
                      size={15}
                      color={"black"}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <FlatList
              data={upcomingMoviesData}
              renderItem={renderItemUpComingMoviesData}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
          </View>

          <View>
            <Text style={{ fontSize: 22, fontWeight: "bold", margin: 10 }}>
              What's Popular
            </Text>

            <FlatList
              data={popularMoviesData}
              renderItem={renderItemNowPlayingData}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
            />
            {isPlayerOpen && clickedMovieData && (
              <VideoOverlay
                videoId={key}
                title={clickedMovieData.title}
                onClose={handleClosePlayer}
              />
            )}
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
            <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  item: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  playIconContainer: {
    justifyContent: "center",
    alignItems: "center",
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

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
import {
  useNavigation,
  DrawerActions,
  useRoute,
} from "@react-navigation/native";

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [searchText, setSearchText] = useState("");
  const [currentDataType, setCurrentDataType] = useState("movies");

  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [topRateMoviesData, setTopRateMoviesData] = useState([]);
  const [tvShowData, setTvShowData] = useState([]);
  const [people, setPeople] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [searchResultsPeople, setSearchResultsPeople] = useState([]);
  const [numberOfResultsPeople, setNumberOfResultsPeople] = useState(0);
  const [searchResultsTv, setSearchResultsTv] = useState([]);
  const [numberOfResultsTv, setNumberOfResultsTv] = useState(0);

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

    const fetchTopRateMoviesData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=1"
        );
        const json = await response.json();
        setTopRateMoviesData(json.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchPeopleData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/297762/casts?api_key=e9e9d8da18ae29fc430845952232787c"
        );
        const json = await response.json();
        setPeople(json.cast);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    const fetchTvShow = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=2"
        );
        const json = await response.json();
        setTvShowData(json.results);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchNowPlayingData();
    fetchUpcomingMoviesData();
    fetchPopularMoviesData();
    fetchTopRateMoviesData();
    fetchPeopleData();
    fetchTvShow();
  }, []);

  useEffect(() => {
    if (route.params?.searchText) {
      setSearchText(route.params.searchText);
    }
  }, [route.params?.searchText]);

  useEffect(() => {
    const filteredNowPlaying = searchText
      ? nowPlayingData.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const filteredUpcoming = searchText
      ? upcomingMoviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const filteredPopular = searchText
      ? popularMoviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const filteredTopRate = searchText
      ? topRateMoviesData.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const filteredPeople = searchText
      ? people.filter((people) =>
          people.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const filteredTvShow = searchText
      ? tvShowData.filter((tv) =>
          tv.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

    const allTvShows = [...filteredTvShow];

    const allPeopleRs = [...filteredPeople];

    const allResults = [
      ...filteredNowPlaying,
      ...filteredUpcoming,
      ...filteredPopular,
      ...filteredTopRate,
    ];

    //Loại bỏ các phim bị trùng
    const uniqueResults = Array.from(
      new Set(allResults.map((movie) => movie.id))
    ).map((id) => allResults.find((movie) => movie.id === id));

    //Loại bỏ các diễn viên bị trùng
    const uniqueResultsPeople = Array.from(
      new Set(allPeopleRs.map((people) => people.id))
    ).map((id) => allPeopleRs.find((people) => people.id === id));

    //Loại bỏ các Tv Shows bị trùng
    const uniqueResultsTvShows = Array.from(
      new Set(allTvShows.map((tv) => tv.id))
    ).map((id) => allTvShows.find((tv) => tv.id === id));

    setSearchResults(uniqueResults);
    setNumberOfResults(uniqueResults.length); // Set the number of results

    setSearchResultsPeople(uniqueResultsPeople);
    setNumberOfResultsPeople(uniqueResultsPeople.length);

    setSearchResultsTv(uniqueResultsTvShows);
    setNumberOfResultsTv(uniqueResultsTvShows.length);
  }, [
    searchText,
    nowPlayingData,
    upcomingMoviesData,
    popularMoviesData,
    topRateMoviesData,
    people,
    tvShowData,
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  //Hiển thị dữ liệu
  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate('Details_film',{itemId:item.id})} >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: "gray",
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          style={{
            width: 100,
            height: 150,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          resizeMode="cover"
        />

        <View style={{ margin: 8 }}>
          <Text
            style={{
              width: "65%", // Đặt chiều rộng tối đa cho Text
              flexShrink: 1,
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 10,
              overflow: "hidden",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>

          <Text style={{ fontSize: 12, color: "#3E2323" }}>
            {formatDate(item.release_date)}
          </Text>
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
            {item.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPeople = ({ item }) => (
    <TouchableOpacity>
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
          }}
          style={{
            width: 80,
            height: 80,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          resizeMode="cover"
        />
        <View style={{ margin: 8, justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontWeight: "bold" }}>
            {item.known_for_department}
          </Text>
          <Text>{item.character}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  //Phân trang
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentMovies = searchResults.slice(startIndex, endIndex);
  const currentPeople = searchResultsPeople.slice(startIndex, endIndex);
  const currentTv = searchResultsTv.slice(startIndex, endIndex);
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
              onPress={() => navigation.navigate("Home")}
            >
              <FontAwesome name="arrow-left" size={30} color={"white"} />
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <FontAwesome
              name="search"
              color={"black"}
              size={20}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={"darkgray"}
              style={{ flex: 1, height: 50 }}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>

          <View
            style={{
              height: 50,
              backgroundColor: "#3B8FE4",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Search Results
            </Text>
          </View>

          <View style={{ margin: 10 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ flexDirection: "row" }}
            >
              <TouchableOpacity onPress={() => setCurrentDataType("movies")}>
                <View style={{ marginRight: 16, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                      color: currentDataType === "movies" ? "blue" : "black",
                    }}
                  >
                    Movies
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor:
                        currentDataType === "movies" ? "blue" : "gray",
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                  >
                    <Text style={{}}>{numberOfResults}</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCurrentDataType("tvShows")}>
                <View style={{ marginRight: 16, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                      color: currentDataType === "tvShows" ? "blue" : "black",
                    }}
                  >
                    TV Shows
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor:
                        currentDataType === "tvShows" ? "blue" : "gray",
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 4,
                    }}
                  >
                    <Text>{numberOfResultsTv} </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCurrentDataType("peoples")}>
                <View style={{ marginRight: 16, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                      color: currentDataType === "peoples" ? "blue" : "black",
                    }}
                  >
                    People
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor:
                        currentDataType === "peoples" ? "blue" : "gray",
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 4,
                    }}
                  >
                    <Text>{numberOfResultsPeople} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View
            style={{ padding: 10, borderTopWidth: 1, borderTopColor: "gray" }}
          >
            {searchText === "" &&
            currentMovies.length === 0 &&
            currentPeople.length === 0 ? (
              <Text>There are no movies that matched your query</Text>
            ) : (
              <>
                <FlatList
                  data={
                    currentDataType === "movies" && currentMovies.length > 0
                      ? currentMovies
                      : currentDataType === "tvShows" && currentTv.length > 0
                      ? currentTv
                      : currentPeople
                  }
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => {
                    if (
                      currentDataType === "movies" &&
                      searchResults.length > 0
                    ) {
                      return renderMovie({ item });
                    } else if (
                      currentDataType === "tvShows" &&
                      searchResultsTv.length > 0
                    ) {
                      setCurrentDataType("tvShows");
                      return renderMovie({ item });
                    } else {
                      setCurrentDataType("peoples");
                      return renderPeople({ item });
                    }
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <Text>Page {currentPage}</Text>
                  <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={
                      endIndex >=
                      (currentDataType === "movies"
                        ? searchResults
                        : currentDataType === "tvShows"
                        ? searchResultsTv
                        : searchResultsPeople
                      ).length
                    }
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
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
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
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
  content: {},
});

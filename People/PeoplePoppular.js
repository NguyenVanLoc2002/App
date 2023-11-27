import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  ScrollView,
} from "react-native";

export default function PeoplePoppular() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(297762);
  const [isLoading, setLoading] = useState(true);
  const [lengCast, setLength] = useState(10);
  const [index, setIindex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [buttonText, setButtonText] = useState("Load More");
  const fechData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/297762/casts?api_key=e9e9d8da18ae29fc430845952232787c`
      );
      const json = await response.json();
      console.log(json.cast.length);
      console.log(json.cast);
      setData(json.cast);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const render = () => {
    const myLoop = [];
    for (let i = index; i < lengCast; i++) {
      myLoop.push(
        <View
          key={0}
          style={{
            width: 165,
            height: 323,
            marginRight: 10,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Image
            style={{ width: 165, height: 165 }}
            source={{
              uri: `https://image.tmdb.org/t/p/original/${data[i].profile_path}`,
            }}
          ></Image>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            {data[i].name}
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 300 }}>
            Thế Giới Ma Quái, Cảnh Báo Tình Yêu, and Navillera: Như Cánh Bướm
          </Text>
        </View>
      );
    }
    return myLoop;
  };

  const navigation = useNavigation();

  useEffect(() => {
    fechData();
  }, []);
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
        <ScrollView>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", marginTop:12 }}>
              Poppular People
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {render()}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Pressable
                onPress={() => {
                  setClickCount(clickCount + 1);
                  if (clickCount != 0) {
                    if (clickCount < 4) {
                      setIindex(clickCount + 10);
                      setLength(lengCast + clickCount * 10);
                      console.log(clickCount);
                      console.log(index);
                      console.log(lengCast);
                      render();
                    } else {
                      setButtonText("Out Of Data");
                    }
                  }
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                  },
                  {
                    width: 350,
                    backgroundColor: "blue",
                    marginTop: 25,
                    height: "40px",
                    borderRadius: 5,
                  },
                ]}
              >
                <Text
                  style={{ fontSize: 24, textAlign: "center", color: "white" }}
                >
                  {buttonText}
                </Text>
              </Pressable>
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
  header: {
    flexDirection: "row",
    top: 0,
    position: "sticky",
    zIndex: 1,
    padding: 10,
  },
});

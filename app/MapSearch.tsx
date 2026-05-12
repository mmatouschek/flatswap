import { useState } from "react";
import { Alert, View } from "react-native";
import {
	filterDate,
	getResults
} from "../backend/FlatSwapAPI";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import FlatSwapCalendar from "../components/ui/FlatSwapCalendar";
import FlatSwapIconButton from "../components/ui/FlatSwapIconButton";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapMap from "../components/ui/FlatSwapMap";

export default function MapSearch() {
  const [query, setQuery] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [current, setCurrent] = useState("start");
  const [lat, setLat] = useState(40);
  const [long, setLong] = useState(10);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          flex: 1,
          gap: 5,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FlatSwapInput
          style={[DefaultStyles.input, { flex: 9 }]}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => {
            const result = getResults(query);
            setSearchResult(result);
            if (result.length > 0) {
              setLat(result[0].latitude);
              setLong(result[0].longitude);
            } else {
              const message = `Unfortunately there are no swappers in ${query} at that date!`;
              Alert.alert("No results", message, [
                { text: "OK", onPress: () => {} },
              ]);
            }
          }}
          placeholder="..."
        />

        <FlatSwapIconButton
          style={[DefaultStyles.button, { flex: 1 }]}
          icon="calendar"
          onPress={() => setCalendarVisible(true)}
        />
      </View>
      <FlatSwapCalendar
        startDate={startDate}
        endDate={endDate}
        isVisible={calendarVisible}
        top={"70"}
        left="10"
        onBackdropPress={() => setCalendarVisible(false)}
        onDatePress={(day) => {
          if (current == "start") {
            setEndDate(null);
            setStartDate(day.dateString);
            setCurrent("end");
            const result = getResults(query);
            setSearchResult(filterDate(day.dateString, endDate, result));
          } else {
            const start = new Date(startDate);
            const end = new Date(day.dateString);
            if (end.getTime() > start.getTime()) {
              setEndDate(day.dateString);
              setCurrent("start");
              const result = getResults(query);
              setSearchResult(filterDate(startDate, day.dateString, result));
            } else {
              setStartDate(null);
              setEndDate(null);
              setSearchResult(getResults(query));
              setCurrent("start");
            }
          }
        }}
      />

      <View style={{ flex: 15, padding: 5 }}>
        <FlatSwapMap
          latitude={lat}
          longitude={long}
          searchResult={searchResult}
        />
      </View>
    </View>
  );
}

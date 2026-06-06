import { useState } from "react";
import { Alert, View } from "react-native";
import { filterDate, getResults } from "../backend/FlatSwapAPI";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import FlatSwapCalendar from "../components/ui/FlatSwapCalendar";
import FlatSwapIconButton from "../components/ui/FlatSwapIconButton";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapMap from "../components/ui/FlatSwapMap";
import { useSearchData } from "./SearchData";

export default function MapSearch() {
  const [query, setQuery] = useState(useSearchData((state) => state.query));
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [searchResult, setSearchResult] = useState(
    useSearchData((state) => state.searchResult),
  );
  const [startDate, setStartDate] = useState(
    useSearchData((state) => state.startDate),
  );
  const [endDate, setEndDate] = useState(
    useSearchData((state) => state.endDate),
  );
  const [current, setCurrent] = useState(
    useSearchData((state) => state.current),
  );
  let initLat = 40;
  let initLong = 15;
  if (searchResult.length > 0) {
    initLat = searchResult[0].latitude;
    initLong = searchResult[0].longitude;
  }

  const [lat, setLat] = useState(initLat);
  const [long, setLong] = useState(initLong);

  return (
    <View style={{ flex: 1, padding: 10 }}>
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
          onChangeText={(val) => {
            setQuery(val);
            useSearchData.getState().setQuery(val);
          }}
          onSubmitEditing={() => {
            const result = filterDate(startDate, endDate, getResults(query));
            setSearchResult(result);
            useSearchData.getState().setSearchResult(result);
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
          style={[
            DefaultStyles.button,
            { flex: 1, padding: 2, backgroundColor: "#1ca349" },
          ]}
          icon="calendar"
          onPress={() => setCalendarVisible(true)}
        />
      </View>
      <FlatSwapCalendar
        startDate={startDate}
        endDate={endDate}
        isVisible={calendarVisible}
        onBackdropPress={() => setCalendarVisible(false)}
        onDatePress={(day) => {
          if (current == "start") {
            setEndDate(null);
            setStartDate(day.dateString);
            setCurrent("end");
            const result = filterDate(
              day.dateString,
              endDate,
              getResults(query),
            );
            setSearchResult(result);

            useSearchData.getState().setStartDate(day.dateString);
            useSearchData.getState().setCurrent("end");
            useSearchData.getState().setEndDate(null);
            useSearchData.getState().setSearchResult(result);
          } else {
            const start = new Date(startDate);
            const end = new Date(day.dateString);
            if (end.getTime() > start.getTime()) {
              setEndDate(day.dateString);
              setCurrent("start");
              const result = filterDate(
                startDate,
                day.dateString,
                getResults(query),
              );
              setSearchResult(result);

              useSearchData.getState().setCurrent("start");
              useSearchData.getState().setEndDate(day.dateString);
              useSearchData.getState().setSearchResult(result);
            } else {
              setStartDate(null);
              setEndDate(null);
              const result = getResults(query);
              setSearchResult(result);
              setCurrent("start");

              useSearchData.getState().setStartDate(null);
              useSearchData.getState().setCurrent("start");
              useSearchData.getState().setEndDate(null);
              useSearchData.getState().setSearchResult(result);
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

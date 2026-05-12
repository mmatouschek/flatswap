import React, { useState } from "react";
import { Alert, View } from "react-native";
import { filterDate, getResults } from "../backend/FlatSwapAPI";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import FlatSwapCalendar from "../components/ui/FlatSwapCalendar";
import FlatSwapIconButton from "../components/ui/FlatSwapIconButton";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapScrollList from "../components/ui/FlatSwapScrollList";

export default function ListSearch() {
  const [query, setQuery] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [current, setCurrent] = useState("start");
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            gap: 5,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FlatSwapInput
            value={query}
            style={[DefaultStyles.input, { flex: 9 }]}
            onChangeText={setQuery}
            onSubmitEditing={() => {
              const result = getResults(query);
              setSearchResult(filterDate(startDate, endDate, result));
              if (result.length < 1) {
                const message = `Unfortunately there are no swappers in ${query} in that timeframe!`;
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
      </View>
      <View style={{ flex: 15 }}>
        <FlatSwapScrollList searchResult={searchResult} />
      </View>
    </View>
  );
}

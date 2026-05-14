import { default as React, useState } from "react";
import { Alert, View } from "react-native";
import { filterDate, getResults } from "../backend/FlatSwapAPI";
import { DefaultStyles } from "../components/ui/DefaultStyles";
import FlatSwapCalendar from "../components/ui/FlatSwapCalendar";
import FlatSwapIconButton from "../components/ui/FlatSwapIconButton";
import FlatSwapInput from "../components/ui/FlatSwapInput";
import FlatSwapScrollList from "../components/ui/FlatSwapScrollList"
import { useSearchData } from "./SearchData";

export default function ListSearch() {
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
  return (
    <View style={{ flex: 1, padding: 10 }}>
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
            onChangeText={(val) => {
              setQuery(val);
              useSearchData.getState().setQuery(val);
            }}
            onSubmitEditing={() => {
              const result = filterDate(startDate, endDate, getResults(query));
              setSearchResult(result);
              useSearchData.getState().setSearchResult(result);
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
      </View>
      <View style={{ flex: 15 }}>
        <FlatSwapScrollList searchResult={searchResult} />
      </View>
    </View>
  );
}

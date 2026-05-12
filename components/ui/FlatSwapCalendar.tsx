import React from "react";
import { View, Modal, StyleSheet, Text, Pressable } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter  } from "expo-router";
import { Calendar } from 'react-native-calendars';
type Properties = {
  isVisible: boolean;
  top: string;
  left: string;
  startDate: string;
  endDate: string;
  onBackdropPress: () => void;
  onDatePress: () => void;
};

export default function FlatSwapCalendar({isVisible, top="30", left="152", startDate, endDate, onBackdropPress,onDatePress}: Properties) {
  const markedDates = buildMarkedDateRange(
    startDate,
    endDate
  );
  const currentDate = startDate ? startDate : "2026-06-01"
  return (
    <Modal visible={isVisible} transparent animationType="fade">
	<Pressable style={styles.background} onPress={onBackdropPress}/>
      <View style={[styles.modal, {top:top, left:left}]}>
      <Calendar
		current={currentDate}
		startDate={startDate}
		endDate={endDate}
		markingType="period"
        onDayPress={onDatePress}
		markedDates={markedDates}
      />
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  modal: {
	position: "absolute",
	flex:1,
    width: 220,
    height: 150,
    backgroundColor: "white",
	flexDirection: "column",
	alignItems: "flex-start",
	
  },
  background:{
	...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0)"
  },
 });
 
 
 function buildMarkedDateRange(startDate, endDate, options = {}) {
  const  color = "#00adf5";
  const textColor = "#ffffff";
  const markedDates = {};
  if(startDate==null){
	return markedDates;
  }
  if (endDate==null){
	markedDates[startDate]={
      color: color,
      textColor,
      startingDay: true,
      endingDay: true,
    }
  }
  
 else{
	const start = new Date(startDate);
	const end = new Date(endDate);

	start.setHours(0, 0, 0, 0);
	end.setHours(0, 0, 0, 0);

	const current = new Date(start);
	while (current <= end) {
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    const dateString = `${yyyy}-${mm}-${dd}`;
    const isStart = dateString === startDate;
    const isEnd = dateString === endDate;

    markedDates[dateString] = {
      color: color,
      textColor,
      startingDay: isStart,
      endingDay: isEnd,
    };
    current.setDate(current.getDate() + 1);
  }
  }
  return markedDates;
}
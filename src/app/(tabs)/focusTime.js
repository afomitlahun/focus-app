import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTasks } from '../../contexts/taskContets';
import { useColors } from '../../contexts/ColorContets';

export default function FocusTime() {
  const { colors } = useColors();
  const { setTasks, selectedTask } = useTasks();
  const focusTask = selectedTask;

  const times = [5, 900, 1200]; // በሰከንድ (5s, 15:00, 20:00)
  const [isRunning, setIsRunning] = useState(false); // timer እየሰራ ነው?
  const [selectedTime, setSelectedTime] = useState(null); // የተመረጠው ሰዓት

  const timeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    return `${minutes}:${second < 10 ? '0' : ''}${second}`; // 5:03
  };

  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: `you have successfully focused on ${focusTask}`,
    });
  };

  // isRunning ሲቀየር interval ይጀምራል/ያቆማል
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setSelectedTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // ሰዓቱ 0 ሲደርስ
  useEffect(() => {
    if (isRunning && selectedTime === 0) {
      showToast();
      setIsRunning(false);
      setTasks((prev) => [...prev, selectedTask]);
    }
  }, [selectedTime]);

  const onStartPress = () => {
    if (!selectedTime) return; // ሰዓት ካልተመረጠ አይጀምርም
    setIsRunning(!isRunning);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      {/* Back button */}
      <TouchableOpacity
        style={styles.backFab}
        onPress={() => {
          router.back();
          setSelectedTime(null);
          setIsRunning(false);
        }}
      >
        <View style={[styles.backCircle, { backgroundColor: colors.textPrimary + '20' }]}>
          <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
        </View>
        <Text style={{ color: colors.textPrimary, marginLeft: 10, fontSize: 13 }}>
          Focus Session
        </Text>
      </TouchableOpacity>

      {/* Timer */}
      <Text style={[styles.timerText, { color: colors.textPrimary }]}>
        {selectedTime ? timeFormat(selectedTime) : '00:00'}
      </Text>

      {/* Focusing on card */}
      <View style={[styles.focusCard, { backgroundColor: colors.textPrimary + '15' }]}>
        <Text style={[styles.subTite, { color: colors.textPrimary }]}>
          Focusing on : <Text style={styles.focusTask}>{focusTask}</Text>
        </Text>
      </View>

      {/* Time options */}
      <View style={styles.timeOptions}>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            disabled={isRunning}
            style={[
              styles.timeOptionsButton,
              { backgroundColor: colors.textPrimary + '15' },
              selectedTime === time && { borderWidth: 2, borderColor: '#7ED321' },
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[styles.timeOptionsText, { color: colors.textPrimary }]}>
              {timeFormat(time)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Start / Stop */}
      <TouchableOpacity style={styles.startFab} onPress={onStartPress}>
        <Text style={styles.startText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  backFab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 11,
  },
  backCircle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontWeight: 'bold',
    fontSize: 56,
    marginTop: 50,
  },

  focusCard: {
    width: '90%',
    marginTop: 40,
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  subTite: {
    fontSize: 16,
  },
  focusTask: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 30,
  },
  timeOptionsButton: {
    flex: 1,
    height: 48,
    marginHorizontal: 6,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeOptionsText: {
    fontSize: 16,
  },

  startFab: {
    width: '90%',
    height: 52,
    marginTop: 30,
    borderRadius: 18,
    backgroundColor: '#7ED321',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
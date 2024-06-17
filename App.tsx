import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import RenderItem from './RenderItem';

export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('mytodo-tasks', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('mytodo-tasks');
      if (value !== null) {
        const tasksLocal = JSON.parse(value);
        setTasks(tasksLocal);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = () => {
    const taskExists = tasks.some(task => task.title === text.trim());

    if (taskExists) {
      Alert.alert('Tarea Duplicada', 'La tarea ya existe, por favor ingresa una nueva.');
      return;
    }

    const newTask = {
      title: text.trim(),
      done: false,
      date: new Date(),
    };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    storeData(updatedTasks);
    setText('');
  };

  const confirmDeleteTask = (task: Task) => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar la tarea "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteFunction(task) },
      ],
      { cancelable: true }
    );
  };

  const deleteFunction = (task: Task) => {
    const updatedTasks = tasks.filter(t => t.title !== task.title);
    setTasks(updatedTasks);
    storeData(updatedTasks);
  };

  const markDone = (task: Task) => {
    const updatedTasks = tasks.map(t => t.title === task.title ? { ...t, done: !t.done } : t);
    setTasks(updatedTasks);
    storeData(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas por hacer.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(t: string) => setText(t)}
          value={text}
          placeholder="Agrega nueva tarea"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              deleteFunction={() => confirmDeleteTask(item)}
              markDone={markDone}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

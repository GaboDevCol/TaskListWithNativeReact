import React from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import styles from './Styles';
import RenderItem from './RenderItem';

const tasks = [
  {
    title: 'Alimentar al perro',
    done: false,
    date: new Date(),
  },
  {
    title: 'Salir a correr',
    done: false,
    date: new Date(),
  },
  {
    title: 'Hacer la tarea',
    done: true,
    date: new Date(),
  },
];

export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  const markDone = () => {
    console.log('markDone')
  };
  const deleteFunction = () => {
    console.log('delete')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis tareas por hacer.</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Agrega nueva tarea" style={styles.textInput} />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.whiteText}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <FlatList
          renderItem={({item}) => (
            <RenderItem item={item} deleteFunction={deleteFunction} markDone={markDone} />
          )}
          data={tasks}
        />
      </View>
    </View>
  );
}

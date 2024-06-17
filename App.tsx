import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
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

  const addTask = () => {
    const tmp = [...tasks];
    const newTask = {
      title: text,
      done: false,
      date: new Date(),
    };
    tmp.push(newTask);

    setTasks(tmp);
    setText('');
  };

  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(el => el.title === task.title);
    const todo = tasks[index];

    todo.done = !todo.done;
    setTasks(tmp);
  };

  const deleteFunction = () => {
    console.log('delete');
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
          renderItem={({item}) => (
            <RenderItem
              item={item}
              deleteFunction={deleteFunction}
              markDone={markDone}
            />
          )}
          data={tasks}
        />
      </View>
    </View>
  );
}

import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,FlatList,Alert, TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addtodo';
import Sandbox from './components/sandbox';

export default function App() {
  const [todos, setTodos] = useState([
    {text:'buy coffee', key:'1'},
    {text:'create an app', key:'2'},
    {text:'play on the switch',key:'3'}
  ])
  const pressHandler = (key) =>{
    setTodos((prevTodos)=>{return prevTodos.filter(todo => todo.key != key)})
  }
  const submitHandler = (text) =>{
    if(text.length > 3){
      setTodos((prevTodos) =>{
      return [
        {text:text, key:Math.random().toString()},
        ...prevTodos
      ]
    })
    }else{
      
        Alert.alert('OOPS!','ToDos must be over 3 characters long',[{text:'Ok',onPress:()=>{console.log('alert closed')}}])
    
    }
    
  }
  return (
    // <Sandbox/>
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log('dismissed')}}>
        <View style={styles.container}>
      {/* header */}
      <Header/>
      <View style = {styles.content}> 
       {/* to form */}
       <AddTodo submitHandler={submitHandler}/>
       <View style = {styles.list}>
      {/* flat list */}
      <FlatList
      data={todos}
      renderItem={({item})=>(
        <TodoItem item ={item} pressHandler={pressHandler}/>
      )}
      />

     
       </View>
      </View>
      <StatusBar style="auto" />
    </View>
    </TouchableWithoutFeedback>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  content:{
    
    flex:1,
    padding:40
  },
  list:{
    flex:1,
    
    marginTop:20
  }
});

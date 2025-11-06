
import { Directory, File, Paths,  } from 'expo-file-system';
import { TodoList } from '../types';

const listsDir = new Directory(Paths.document, "lists")
if (!listsDir.exists) listsDir.create()

export const readTodoLists = () => {
  const newLists: TodoList[] = []
  try {
    const listPaths = listsDir.list()
    for (const path of listPaths) {
      newLists.push(JSON.parse(new File(path).textSync()))
    }
    return newLists
  } catch(error) {
    console.error("Error reading list", error)
  }
}

export const writeTodoList = (list :TodoList) => {
  try {
    const file = new File(listsDir, list.id + ".json")
    if (!file.exists) file.create()
    file.write(JSON.stringify(list))
  } catch (error) {
      console.error("Error writing list", error)
  }
}

export const deleteTodoList = (list: TodoList) => {
  try {
    const file = new File(listsDir, list.id + ".json")
    if (file.exists) file.delete()
  } catch (error) {
      console.error("Error deleting list", error)
  }
} 
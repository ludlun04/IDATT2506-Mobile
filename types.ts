export interface TodoEntry {
id: number
title: string
state: boolean
}

export interface TodoList {
id: number
title: string
entries: TodoEntry[]
}
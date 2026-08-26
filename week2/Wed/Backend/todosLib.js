let todosArray = [];
let nextId = 1;

const addOne = (task, complete, dueDate) => {
    if (!task || !dueDate) {
        return  false;
    }

    const newTodo = {
        id: nextId++,
        task,
        complete,
        dueDate
    }

    if (newTodo) {
        todosArray.push(newTodo);
    }
    return newTodo;
};

const getAll = () => { return todosArray };

const findById = (id) => {
    const numericId = Number(id);
    const todo = todosArray.find((todo) => todo.id === numericId);
    return todo || false;
}

const updateOneById = (id, updatedData) => {
    const todo = findById(id);
    if (todo) {
        if (updatedData.task) todo.task = updatedData.task;
        if (updatedData.complete !== undefined) todo.complete = updatedData.complete;
        if (updatedData.dueDate) todo.dueDate = updatedData.dueDate;
        return todo;
    }
    return false;
}

const deleteOneById = (id) => {
    const todo = findById(id);
    if (todo) {
        const initialLength = todosArray.length;
        todosArray = todosArray.filter((todo) => todo.id !== Number(id));
        return todosArray.length < initialLength
    }
    return false;
}

const ToDos = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = ToDos;

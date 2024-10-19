export const JSX_CODE = `import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoApp.css';

const TodoApp = ({ title }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = () => {
      const initialTodos = [
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
      ];
      setTodos(initialTodos);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim() === '') return;

    const todo = {
      id: todos.length + 1,
      text: newTodo.trim(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>{title}</h1>

      <form onSubmit={handleAddTodo}>
        <label htmlFor="new-todo">Add a new todo:</label>
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.length === 0 ? (
          <li>No todos available. Add one!</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </ul>

      <footer>
        <p>
          You have {todos.filter((todo) => !todo.completed).length} pending
          {todos.filter((todo) => !todo.completed).length !== 1 ? 's' : ''}.
        </p>
      </footer>
    </div>
  );
};

TodoApp.propTypes = {
  title: PropTypes.string.isRequired,
};

TodoApp.defaultProps = {
  title: 'My Todo App',
};

export default TodoApp;`;

export const PYTHON_CODE = `import json
from typing import List, Dict, Any

def process_data(data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    return [{"id": i, "processed": item} for i, item in enumerate(data)]

def load_data(filepath: str) -> List[Dict[str, Any]]:
    with open(filepath, 'r') as file:
        return json.load(file)

def save_data(filepath: str, data: List[Dict[str, Any]]) -> None:
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=2)

def main():
    data = load_data("input.json")
    processed_data = process_data(data)
    save_data("output.json", processed_data)
    print(f"Processed {len(processed_data)} items")

if __name__ == "__main__":
    main()

# Example of a lambda function
square = lambda x: x * x

# List comprehension
squares = [square(i) for i in range(5)]

# Simple error handling
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")

# Class definition
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email

    def __str__(self):
        return f"User: {self.name} ({self.email})"

# Creating an instance
user = User("Alice", "alice@example.com")
print(user)`;

export const JS_CODE = `// Simple RESTful API Server for managing users

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync(DATA_FILE);
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users, null, 2);
  fs.writeFileSync(DATA_FILE, dataJSON);
};

app.get('/', (req, res) => {
  res.send('Welcome to the Simple RESTful API Server!');
});

app.get('/users', (req, res) => {
  const users = loadUsers();
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const users = loadUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const users = loadUsers();
  const duplicate = users.find((u) => u.email === email);
  if (duplicate) return res.status(409).json({ error: 'Email already exists' });

  const newUser = { id: uuidv4(), name, email, createdAt: new Date().toISOString() };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const users = loadUsers();
  const userIndex = users.findIndex((u) => u.id === req.params.id);

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  if (name) users[userIndex].name = name;
  if (email) {
    const duplicate = users.find((u) => u.email === email && u.id !== req.params.id);
    if (duplicate) return res.status(409).json({ error: 'Email already exists' });
    users[userIndex].email = email;
  }

  users[userIndex].updatedAt = new Date().toISOString();
  saveUsers(users);
  res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
  const users = loadUsers();
  const userIndex = users.findIndex((u) => u.id === req.params.id);

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(userIndex, 1)[0];
  saveUsers(users);
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`;

export const JS_SMALL_CODE = `const url = 'https://api.withcortex.ai/apps/app_2ppwf5hXSgfUl7JShcw5H0/collections/col_561H41FEE3Smh6z0tPbRZg/records';

const options = {
  method: 'POST',
  headers: {
    "Authorization": "Bearer YOUR_TOKEN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "name": "My record",
    "run": "all",
    "rules": {
      "MY_PERSONAL_FIRST_WORKFLOW": {
        "object": {
          "object_field": "string"
        }
      }
    }
  }),
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

export const PYTHON_SMALL_CODE = `import requests

url = 'https://api.withcortex.ai/apps/app_2ppwf5hXSgfUl7JShcw5H0/collections/col_561H41FEE3Smh6z0tPbRZg/records'

headers = {
   'Authorization': 'Bearer YOUR_TOKEN',
   'Content-Type': 'application/json',
}

payload = {
  "name": "My record",
  "run": "all",
  "rules": {
    "MY_PERSONAL_FIRST_WORKFLOW": {
      "object": {
        "object_field": "string"
      }
    }
  }
}

response = requests.post(url, headers=headers, json=payload)

print(response.json())`;

export const SHELL_CODE = `curl --request POST \
  --url https://api.withcortex.ai/apps/app_2ppwf5hXSgfUl7JShcw5H0/collections/col_561H41FEE3Smh6z0tPbRZg/records \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "My record",
  "run": "all",
  "rules": {
    "MY_PERSONAL_FIRST_WORKFLOW": {
      "object": {
        "object_field": "string"
      }
    }
  }
}'`;

export const JSON_CODE = `{
  "name": "cortex-dark",
  "type": "dark",
  "colors": {
    "focusBorder": "#024DBA",
    "foreground": "#C0CAF5",
    "widget.shadow": "#000000CC",
    "selection.background": "#334A77",
    "descriptionForeground": "#C0CAF5",
    "errorForeground": "#F44747",
    "icon.foreground": "#C0CAF5",

    "window.activeBorder": "#024DBA",
    "window.inactiveBorder": "#1E1F26",
  },
  "tokenColors": [
    {
      "scope": ["comment", "punctuation.definition.comment"],
      "settings": {
        "foreground": "#6B728E",
        "fontStyle": "italic"
      }
    },
    {
      "scope": ["constant", "entity.name.constant"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["entity", "entity.name"],
      "settings": {
        "foreground": "#66D9EF"
      }
    },
    {
      "scope": ["keyword", "storage.type", "storage.modifier"],
      "settings": {
        "foreground": "#FF6C6B",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["storage.type.function", "entity.name.function"],
      "settings": {
        "foreground": "#66D9EF",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["string", "constant.other.symbol"],
      "settings": {
        "foreground": "#A6E22E"
      }
    },
    {
      "scope": ["variable", "meta.definition.variable", "entity.name.variable"],
      "settings": {
        "foreground": "#C0CAF5"
      }
    },
    {
      "scope": ["meta.class", "entity.name.class", "entity.name.type.class"],
      "settings": {
        "foreground": "#FFCC00",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["meta.interface", "entity.name.interface"],
      "settings": {
        "foreground": "#FF6C6B",
        "fontStyle": "italic"
      }
    },
    {
      "scope": ["meta.function-call", "support.function"],
      "settings": {
        "foreground": "#66D9EF"
      }
    },
    {
      "scope": ["punctuation", "delimiter", "operator"],
      "settings": {
        "foreground": "#C0CAF5"
      }
    },
    {
      "scope": ["punctuation.definition.tag", "punctuation.definition.tag.html"],
      "settings": {
        "foreground": "#FF6C6B"
      }
    },
    {
      "scope": ["entity.other.attribute-name.id", "entity.other.attribute-name.class"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["support.constant"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["meta.function", "meta.function-call"],
      "settings": {
        "foreground": "#66D9EF"
      }
    },
    {
      "scope": ["storage.type.java"],
      "settings": {
        "foreground": "#FF6C6B",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["string.regexp"],
      "settings": {
        "foreground": "#A6E22E"
      }
    },
    {
      "scope": ["punctuation.section.embedded"],
      "settings": {
        "foreground": "#FF6C6B"
      }
    },
    {
      "scope": ["variable.language"],
      "settings": {
        "foreground": "#FFCC00",
        "fontStyle": "italic"
      }
    },
    {
      "scope": ["meta.annotation"],
      "settings": {
        "foreground": "#66D9EF",
        "fontStyle": "italic"
      }
    },
    {
      "scope": ["constant.other.color"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["markup.bold"],
      "settings": {
        "fontStyle": "bold",
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["markup.italic"],
      "settings": {
        "fontStyle": "italic",
        "foreground": "#66D9EF"
      }
    },
    {
      "scope": ["markup.heading", "markup.heading.setext"],
      "settings": {
        "fontStyle": "bold",
        "foreground": "#FF6C6B"
      }
    },
    {
      "scope": ["markup.quote"],
      "settings": {
        "foreground": "#6B728E",
        "fontStyle": "italic"
      }
    },
    {
      "scope": ["markup.list"],
      "settings": {
        "foreground": "#A6E22E"
      }
    },
    {
      "scope": ["markup.inline.raw", "markup.raw.block"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["markup.underline.link"],
      "settings": {
        "foreground": "#66D9EF",
        "fontStyle": "underline"
      }
    },
    {
      "scope": ["markup.table"],
      "settings": {
        "foreground": "#C0CAF5"
      }
    },
    {
      "scope": ["meta.brace", "meta.delimiter", "meta.structure.dictionary.json meta.structure.dictionary.value.json"],
      "settings": {
        "foreground": "#C0CAF5"
      }
    },
    {
      "scope": ["invalid", "invalid.illegal"],
      "settings": {
        "foreground": "#FF5555",
        "fontStyle": "underline"
      }
    },
    {
      "scope": ["markup.inserted"],
      "settings": {
        "foreground": "#A6E22E",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["markup.deleted"],
      "settings": {
        "foreground": "#FF6C6B",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["markup.changed"],
      "settings": {
        "foreground": "#66D9EF",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["meta.diff", "meta.diff.header.from-file", "meta.diff.header.to-file"],
      "settings": {
        "foreground": "#66D9EF"
      }
    },
    {
      "scope": ["meta.separator"],
      "settings": {
        "foreground": "#FF6C6B",
        "fontStyle": "bold"
      }
    },
    {
      "scope": ["meta.output"],
      "settings": {
        "foreground": "#A6E22E"
      }
    },
    {
      "scope": ["constant.numeric"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["constant.language"],
      "settings": {
        "foreground": "#FFCC00"
      }
    },
    {
      "scope": ["constant.character"],
      "settings": {
        "foreground": "#FFCC00"
      }
    }
  ],
  "semanticTokenColors": {
    "namespace": "#66D9EF",
    "type": "#FFCC00",
    "class": "#FF6C6B",
    "enum": "#FF6C6B",
    "interface": "#FF6C6B",
    "struct": "#FF6C6B",
    "typeParameter": "#FFD700",
    "builtinType": "#FFCC00",
    "escapeSequence": "#A6E22E",
    "formatSpecifier": "#FFCC00",
    "selfParameter": {
      "foreground": "#FFD700",
      "fontStyle": "italic"
    },
    "macro": "#66D9EF",
    "comment.documentation": {
      "foreground": "#6B728E",
      "fontStyle": "italic"
    }
  },
  "semanticHighlighting": true
}`;

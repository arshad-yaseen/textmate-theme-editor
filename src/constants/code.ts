import { CodeMirrorOptions, MonacoEditorOptions } from "@/types/code";

export const DEFAULT_MONACO_OPTIONS: MonacoEditorOptions = {
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  lineNumbersMinChars: 5,
  glyphMargin: false,
  folding: false,
  overviewRulerLanes: 0,
  links: false,
  renderLineHighlightOnlyWhenFocus: true,
  renderLineHighlight: "line",
  scrollBeyondLastLine: false,
  automaticLayout: true,
  fontSize: 14,
  lineDecorationsWidth: 10,
  fontWeight: "500",
  lineHeight: 25,
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "never",
  },
  padding: {
    top: 10,
    bottom: 9,
  },
  autoIndent: "full",
  formatOnPaste: true,
  renderWhitespace: "selection",
  contextmenu: false,
  scrollbar: {
    vertical: "hidden",
    horizontal: "hidden",
    verticalSliderSize: 0,
    alwaysConsumeMouseWheel: false,
    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 0,
    useShadows: false,
  },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  suggest: {
    showFiles: false,
  },
  fontFamily: "var(--font-mono)",
};

export const DEFAULT_CODE_MIRROR_OPTIONS: CodeMirrorOptions = {
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: true,
  defaultKeymap: true,
  searchKeymap: true,
  historyKeymap: true,
  foldKeymap: true,
  foldGutter: false,
  completionKeymap: true,
  tabSize: 2,
};

export const PYTHON_CODE = `
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Module: custom_theme_test.py
Description: A comprehensive Python script to test custom-built themes.
Author: OpenAI ChatGPT
Date: 2024-10-18
"""

import sys
import os
from typing import List, Dict, Any, Optional

# Constants
VERSION = "1.0.0"
DEBUG_MODE = True

# Global Variables
global_counter = 0

def main():
    """Main function to execute the script."""
    print_banner()
    data = load_data("data/input.json")
    
    if DEBUG_MODE:
        print(f"Loaded data: {data}")
    
    processed_data = process_data(data)
    save_data("data/output.json", processed_data)
    
    for item in processed_data:
        print(f"Processed item: {item}")

class DataProcessor:
    """A class to process data."""

    def __init__(self, data: List[Dict[str, Any]]):
        self.data = data
        self.results = []

    def process(self):
        """Process each item in the data."""
        global global_counter
        for index, item in enumerate(self.data):
            global_counter += 1
            result = self._process_item(item, index)
            self.results.append(result)
            if DEBUG_MODE:
                print(f"Processed item {index}: {result}")

    def _process_item(self, item: Dict[str, Any], index: int) -> Dict[str, Any]:
        """
        Private method to process a single item.

        Args:
            item (Dict[str, Any]): The data item to process.
            index (int): The index of the item.

        Returns:
            Dict[str, Any]: The processed item.
        """
        # Example processing: add index and version
        processed = {
            "id": index,
            "version": VERSION,
            **item  # Unpacking the original item
        }
        return processed

    @staticmethod
    def validate(data: Any) -> bool:
        """Validate the data format."""
        if isinstance(data, list):
            return all(isinstance(item, dict) for item in data)
        return False

def load_data(filepath: str) -> Optional[List[Dict[str, Any]]]:
    """
    Load data from a JSON file.

    Args:
        filepath (str): Path to the JSON file.

    Returns:
        Optional[List[Dict[str, Any]]]: Loaded data or None if failed.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            data = json.load(file)
            if DataProcessor.validate(data):
                return data
            else:
                print("Invalid data format.")
                return None
    except FileNotFoundError:
        print(f"File not found: {filepath}")
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
    return None

def save_data(filepath: str, data: List[Dict[str, Any]]) -> bool:
    """
    Save data to a JSON file.

    Args:
        filepath (str): Path to the JSON file.
        data (List[Dict[str, Any]]): Data to save.

    Returns:
        bool: True if successful, False otherwise.
    """
    try:
        with open(filepath, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4)
        return True
    except IOError as e:
        print(f"IO error: {e}")
        return False

def print_banner():
    """Prints a stylized banner."""
    banner = """
    ================================
    === Custom Theme Test Script ===
    ================================
    """
    print(banner)

# Conditional Execution
if __name__ == "__main__":
    main()

# Lambda Functions and List Comprehensions
square = lambda x: x * x
squares = [square(i) for i in range(10)]

# Exception Handling
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Caught an exception: {e}")
finally:
    print("Execution completed.")

# Decorators
def decorator_example(func):
    """A simple decorator."""
    def wrapper(*args, **kwargs):
        print("Decorator before function call.")
        result = func(*args, **kwargs)
        print("Decorator after function call.")
        return result
    return wrapper

@decorator_example
def say_hello(name: str) -> None:
    """Function to greet someone."""
    print(f"Hello, {name}!")

say_hello("World")

# Classes with Inheritance
class AdvancedDataProcessor(DataProcessor):
    """A subclass that extends DataProcessor."""

    def _process_item(self, item: Dict[str, Any], index: int) -> Dict[str, Any]:
        """
        Override the parent method to add more processing.

        Args:
            item (Dict[str, Any]): The data item to process.
            index (int): The index of the item.

        Returns:
            Dict[str, Any]: The processed item with additional fields.
        """
        processed = super()._process_item(item, index)
        processed["processed_at"] = "2024-10-18T12:00:00Z"
        return processed

# Generators
def generate_numbers(n: int):
    """Generator that yields numbers up to n."""
    for i in range(n):
        yield i

for number in generate_numbers(5):
    print(f"Generated number: {number}")

# Context Managers
class CustomContextManager:
    """A simple custom context manager."""

    def __enter__(self):
        print("Entering the context.")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting the context.")

with CustomContextManager():
    print("Inside the context.")

# Type Hinting with Complex Types
def merge_dicts(a: Dict[str, Any], b: Dict[str, Any]) -> Dict[str, Any]:
    """Merge two dictionaries."""
    return {**a, **b}

# Using f-strings and different quotation marks
name = "Alice"
greeting = f"Hello, {name}! Welcome to the 'Python' world."
print(greeting)

# Multi-line strings
multi_line = """This is a multi-line string.
It spans multiple lines.
Useful for documentation and long messages."""
print(multi_line)

# Enum Example
from enum import Enum

class Status(Enum):
    """Enumeration for status."""
    ACTIVE = 1
    INACTIVE = 2
    PENDING = 3

current_status = Status.ACTIVE
print(f"Current status: {current_status.name}")

# Dataclasses
from dataclasses import dataclass

@dataclass
class User:
    """Dataclass representing a user."""
    id: int
    name: str
    email: str

user = User(id=1, name="Bob", email="bob@example.com")
print(user)

# Importing with Aliases
import math as m

print(f"Square root of 16 is {m.sqrt(16)}")

# Using __slots__ in a class
class Point:
    __slots__ = ['x', 'y']

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

p = Point(1.5, 2.5)
print(f"Point coordinates: ({p.x}, {p.y})")
`.trim();

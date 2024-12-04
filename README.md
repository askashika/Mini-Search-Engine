# Mini Search Engine

## Overview

The Mini Search Engine enables users to upload and search articles efficiently. This backend mimics the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.

## Features

- **Add Articles**: Users can add articles with a title, content, and tags.
- **Search Articles**: Allows searching articles by keywords in the title or content.
- **Sort Search Results**: Search results can be sorted by relevance or date.
- **Delete Articles**: Articles can be deleted by their ID.

## Requirements

### Endpoints

1. **POST /articles**  
   Add a new article with metadata (title, content, and tags).  
   **Request Body**:
   ```json
   {
     "title": "Article Title",
     "content": "Article content goes here.",
     "tags": ["tag1", "tag2"]
   }
   ```

2. **GET /articles**  
   Retrieve all articles.  

3. **GET /articles/search**  
   Search articles by keyword or tag. Supports sorting by relevance or date.  
   **Example query**:
   ```bash
   GET /articles/search?query=keyword&sortBy=relevance
   ```

4. **GET /articles/:id**  
   Retrieve the full article details by ID.  
   **Example**:
   ```bash
   GET /articles/1234-abcd-5678-efgh
   ```

5. **DELETE /articles/:id**  
   Delete an article by its ID.  
   **Example**:
   ```bash
   DELETE /articles/1234-abcd-5678-efgh
   ```

## Solution Design

### Indexing

- Articles are stored in an in-memory array with an index for fast searches.
- Relevance is calculated using keyword frequency in the title and content.

### Persistence

- Articles and their index are stored in a JSON file (`data/articles.json`) for persistence.
- If the server is restarted, the articles are loaded from the JSON file.

### Sorting

- Search results can be sorted by **relevance** (based on keyword frequency in title/content) or **date** (based on article creation time).

## Technologies

- **Node.js**: The backend is built using Node.js and the Express framework.
- **UUID**: Unique identifiers are generated using `uuid` for each article.
- **File System**: Articles and index data are stored in the file system for persistence.

## Installation

### Prerequisites

Ensure that you have the following installed:

- Node.js (version 14 or later)
- npm

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/askashika/Mini-Search-Engine
   ```

2. Navigate to the project directory:

   ```bash
   cd Mini-Search-Engine
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will be running at `http://localhost:3000`.

## File Structure

```
/Mini-Search-Engine
  ├── /data
  │   └── articles.json  # Stores articles and index data
  ├── /node_modules      # Installed dependencies
  ├── utils.js           # Utility functions
  ├── index.js           # Main server file (Express app)
  ├── articles.js        # Logic for managing articles
  ├── package.json       # npm configuration
  └── README.md          # This file
```

## Persistence

- Articles and their index data are stored in `data/articles.json`. If the server is restarted, the articles will be loaded from this file.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## About

Mini Search Engine: A backend system for uploading, searching, and managing articles with keyword-based search, relevance sorting, and optional persistence using Node.js.

## Resources

- [GitHub Repository](https://github.com/askashika/Mini-Search-Engine)

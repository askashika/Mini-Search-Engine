const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let articles = []; 


app.get('/', (req, res) => {
  res.send('Welcome to the Simple Article API!');
});

app.post('/articles', (req, res) => {
  const { id, title, text } = req.body;
  if (id && title && text) {
    articles.push({ id, title, text });
    res.json({ message: 'Article added successfully' });
  } else {
    res.status(400).json({ error: 'Invalid input. Please provide id, title, and text.' });
  }
});


app.get('/articles', (req, res) => {
  res.json({ articles });
});


app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const article = articles.find(article => article.id === id);
  
    if (article) {
      return res.status(200).json({ article });
    } else {
      return res.status(404).json({ error: "Article not found" });
    }
  });
  

  app.get('/articles/search', (req, res) => {
    const { title, keyword } = req.query;
  
    // If neither title nor keyword is provided
    if (!title && !keyword) {
      console.log("No search parameters provided");
      return res.status(400).json({ error: "No search parameters provided" });
    }
  
    // Search by title (exact match, case-insensitive)
    if (title) {
      const article = articles.find(article => article.title.toLowerCase() === title.toLowerCase());
      if (article) {
        return res.status(200).json({ article });
      } else {
        return res.status(404).json({ error: "Article not found" });
      }
    }
  
    // Search by keyword in the article's text (case-insensitive)
    if (keyword) {
      const result = articles
        .map(article => ({
          article,
          keywordFrequency: (article.text.match(new RegExp(keyword, 'gi')) || []).length
        }))
        .filter(result => result.keywordFrequency > 0);
  
      if (result.length > 0) {
        return res.status(200).json({ articles: result });
      } else {
        return res.status(404).json({ error: "No articles found with that keyword" });
      }
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

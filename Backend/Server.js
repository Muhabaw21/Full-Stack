import express from 'express';
import data from './data.js';

const app = express();
app.get('/api/products', (req, res) => {
  //send data to frontend
  res.send(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
//This is essential to integrate with the frontend  and backends
const port = process.env.PORT || 5007;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
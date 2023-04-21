import { Product } from '../data/models/product/Product';
import { dbUtility } from '../server';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    console.log(`get product by id: ${req.query.id}`);
    const product: Product | null = dbUtility.getProduct(parseInt(req.query.id as string));
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('product not found');
    }
  } else {
    console.log("get all products");
    const products: Product[] = dbUtility.getAllProducts();
    res.json(products); 
  }
});


// POST a new product
router.post('/', (req, res) => {
  console.log(req.body);
  try {
  const name = req.body.name;
  dbUtility.createProduct(new Product(name));
  res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

export default router;
import { dbUtility } from '../server';
import { Pet } from '../data/models/pet/Pet';
import { Species, Topic } from '../types';
import express from 'express';
import { producer } from '../server';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    console.log(`get pet by id: ${req.query.id}`);
    const pet: Pet | null = dbUtility.getPet(parseInt(req.query.id as string));
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).send('Pet not found');
    }
  } else {
    console.log('get all pets');
    const pets: Pet[] = dbUtility.getAllPets();
    res.json(pets);
  }
});

// POST a new pet
router.post('/', (req, res) => {
  console.log(req.body);
  try {
    const name = req.body.name;
    const species = req.body.species as Species;
    producer.send(Topic.PET, JSON.stringify({ name, species }));
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

export default router;

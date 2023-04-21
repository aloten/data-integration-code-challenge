import fs from 'fs';
import { DbUtility } from '../src/data/DbUtility';
import { Pet } from '../src/data/models/pet/Pet';
import { Prescription } from '../src/data/models/prescription/Prescription';
import { Product } from '../src/data/models/product/Product';
import { Species } from '../src/types';

describe('DbUtility', () => {
  let dbUtility: DbUtility;

  beforeEach(() => {
    // Create a new instance of DbUtility before each test
    dbUtility = new DbUtility();
  });

  afterEach(() => {
    // Remove the test database files after each test
    fs.unlinkSync(dbUtility['PET_CSV']);
    fs.unlinkSync(dbUtility['PRESCRIPTION_CSV']);
    fs.unlinkSync(dbUtility['PRODUCT_CSV']);
  });

  describe('createProduct and getAllProducts', () => {
    it('should create a new product', () => {
      const product = new Product('Test Product');
      dbUtility.createProduct(product);
      const products = dbUtility.getAllProducts();
      expect(products).toHaveLength(1);
      expect(products[0].name).toBe('Test Product');
    });
  });

  describe('createPrescription and getAllPrescriptions', () => {
    it('should create a new prescription', () => {
      const pet = new Pet('Test Pet', Species.DOG);
      dbUtility.createPet(pet);
      const product = new Product('Test Product');
      dbUtility.createProduct(product);
      const prescription = new Prescription(pet, product);
      dbUtility.createPrescription(prescription);
      const prescriptions = dbUtility.getAllPrescriptions();
      expect(prescriptions).toHaveLength(1);
      expect(prescriptions[0].pet.name).toBe('Test Pet');
      expect(prescriptions[0].product.name).toBe('Test Product');
    });
  });

  describe('createPet', () => {
    it('should create a new pet', () => {
      const pet = new Pet('Test Pet', Species.DOG);
      dbUtility.createPet(pet);
      const pets = dbUtility.getAllPets();
      expect(pets).toHaveLength(1);
      expect(pets[0].name).toBe('Test Pet');
      expect(pets[0].species).toBe(Species.DOG);
    });
  });

  describe('getProduct', () => {
    it('should return the product with the given id', () => {
      const product1 = new Product('Product 1');
      const product2 = new Product('Product 2');
      dbUtility.createProduct(product1);
      dbUtility.createProduct(product2);
      const result = dbUtility.getProduct(product2.id);
      expect(result).toEqual(product2);
    });

    it('should return null if no product with the given id exists', () => {
      const result = dbUtility.getProduct(999);
      expect(result).toBeNull();
    });
  });

  describe('getPet', () => {
    it('should return the pet with the given id', () => {
      const pet1 = new Pet('Pet 1', Species.DOG);
      const pet2 = new Pet('Pet 2', Species.CAT);
      dbUtility.createPet(pet1);
      dbUtility.createPet(pet2);
      const result = dbUtility.getPet(pet2.id);
      expect(result).toEqual(pet2);
    });

    it('should return null if no pet with the given id exists', () => {
      const result = dbUtility.getPet(999);
      expect(result).toBeNull();
    });
  });

  describe('getPrescription', () => {
    it('should return the prescription with the given id', () => {
      const pet = new Pet('Test Pet', Species.DOG);
      dbUtility.createPet(pet);
      const product = new Product('Test Product');
      dbUtility.createProduct(product);
      const prescription1 = new Prescription(pet, product);
      dbUtility.createPrescription(prescription1);
      const result = dbUtility.getPrescription(prescription1.id);
      expect(result).toEqual(prescription1);
    });
  });
});

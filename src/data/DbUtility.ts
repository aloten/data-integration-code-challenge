import fs from 'fs';
import { Pet } from './models/pet/Pet';
import { Model } from './models/Model';
import { Prescription } from './models/prescription/Prescription';
import { Product } from './models/product/Product';
import { Species } from '../types';

export class DbUtility {
  private DB_DIR = './database/';
  private PET_CSV = this.DB_DIR + 'pet.csv';
  private PRESCRIPTION_CSV = this.DB_DIR + 'prescription.csv';
  private PRODUCT_CSV = this.DB_DIR + 'product.csv';

  constructor() {
    fs.writeFileSync(this.PET_CSV, 'id,name,species\n');
    fs.writeFileSync(this.PRESCRIPTION_CSV, 'id,pet_id,product_id\n');
    fs.writeFileSync(this.PRODUCT_CSV, 'id,name\n');
  }

  createProduct(product: Product): void {
    this.createRecord(product, this.PRODUCT_CSV);
  }
  createPrescription(prescription: Prescription): void {
    this.createRecord(prescription, this.PRESCRIPTION_CSV);
  }
  createPet(pet: Pet): void {
    this.createRecord(pet, this.PET_CSV);
  }

  getProduct(id: number): Product | null {
    const result = this.getAllProducts().filter((product) => product.id === id);
    return result.length > 0 ? result[0] : null;
  }

  getPet(id: number): Pet | null {
    const result = this.getAllPets().filter((pet) => pet.id === id);
    return result.length > 0 ? result[0] : null;
  }
  
  getPrescription(id: number): Prescription | null {
    const result = this.getAllPrescriptions().filter((prescription) => prescription.id === id);
    return result.length > 0 ? result[0] : null;
  }

  getAllPrescriptions(): Prescription[] {
    const prescriptions: Prescription[] = [];
    const lines = this.readFileSync(this.PRESCRIPTION_CSV);
    for (const line of lines) {
      const values = line.split(',');
      const id = parseInt(values[0]);
      const productId = parseInt(values[1]);
      const petId = parseInt(values[2]);
      
      const product: Product = this.getProduct(productId)!;
      const pet: Pet = this.getPet(petId)!;
      
      const prescription = new Prescription(pet, product, id);
      prescriptions.push(prescription);
    }
    return prescriptions;
  }

  getAllProducts(): Product[] {
    const products: Product[] = [];
    const lines = this.readFileSync(this.PRODUCT_CSV);
    for (const line of lines) {
      const values = line.split(',');
      const id = parseInt(values[0]);
      const name = values[1];
      
      const product = new Product(name, id);
      products.push(product);
    }
    return products;
  }
  getAllPets(): Pet[] {
    const pets: Pet[] = [];
    const lines = this.readFileSync(this.PET_CSV);
    for (const line of lines) {
      const values = line.split(',');
      const id = parseInt(values[0]);
      const name = values[1];
      const species = values[2] as Species;
      
      const pet = new Pet(name, species, id);
      pets.push(pet);
    }
    return pets;
  }

  createRecord<T extends Model>(model: T, file: string): void {
    let row = '';
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key];
        if (value instanceof Model) {
          row += `${value.id},`;
        } else {
          row += `${value},`;
        }
      }
    }
    fs.appendFileSync(file, row.slice(0, -1) + '\n');
  }

  readFileSync(file: string): string[] {
    const fileContents = fs.readFileSync(file, 'utf-8');
    const rowsWithHeader = fileContents.split('\n').filter((line) => line.trim() != '');
    return rowsWithHeader.slice(1);
  }
}

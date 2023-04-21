const { DbUtility } = require("./dist/data/DbUtility");
const { Pet } = require("./dist/data/models/pet/Pet");
const { Prescription } = require("./dist/data/models/prescription/Prescription");
const { Product } = require("./dist/data/models/product/Product");
const { Species } = require("./dist/types");

const dbUtility = new DbUtility();

const pet1 = new Pet("po", Species.DOG);
dbUtility.createPet(pet1);
const product1 = new Product("simparica trio");
dbUtility.createProduct(product1);
const prescription1 = new Prescription(pet1, product1);
dbUtility.createPrescription(prescription1);

console.log(dbUtility.getPrescription(prescription1.id));
console.log(dbUtility.getPet(pet1.id));
console.log(dbUtility.getProduct(product1._id));



import { Injectable } from '@angular/core';
import { categoriesData } from './data-categories.service';
;



@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {

  constructor(private dataCategories: categoriesData) { }
  getCategories() {
    return this.dataCategories.categories;
  }
  setProductCategory(categoryId){
    let category =  this.dataCategories.categories.find(x => x.id == categoryId);
    category.products=this.dataCategories.products
  }
  getCategory(id) {
    let selected = null;
    this.dataCategories.categories.forEach(category => {
      if (category.id == id) {
        selected = category;
      }
    });
    return selected
  }
  addCategory(category) {
    category.id=this.dataCategories.categories.length
    this.dataCategories.categories.push(category)
  }
  // add/edit function
  addProduct(categoryId,product) {
    if (this.dataCategories.products.find(x => x.id == product.id)) {
      product.id=this.dataCategories.products.length;
      this.dataCategories.products.push(product);
    } else {
      this.dataCategories.products.forEach(element => {
        if (element.id = product.id) {
          element = product;
        }
      });
    }
    this.setProductCategory(categoryId)
  }
  deleteProduct(categoryId,products) {
    products.forEach(element => {
      this.dataCategories.products = this.dataCategories.products.filter((product) => {
        return product.id != element.id
      })
    });
    this.setProductCategory(categoryId)
  }
  
}
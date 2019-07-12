import { Component, OnInit } from '@angular/core';
import { CategoriesServiceService } from '../_services/categories-service.service';
declare var $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesServiceService:CategoriesServiceService) {
    this.categories=this.categoriesServiceService.getCategories();
   }

  categories:any=[];
  category:any={
    subCategoryOf:'',
    name:null,
    products:[]
  }
  
  ngOnInit() {
    console.log(this.categories);
  }
  addCategory(){
    if(this.category.name!=''){
      console.log(this.category);
      this.categoriesServiceService.addCategory(this.category)
      this.category={
        id:this.categories.length,
        subCategoryOf:null,
        name:'',
        products:[]
      }
      console.log(this.categories);
    }
   
    
  }

}

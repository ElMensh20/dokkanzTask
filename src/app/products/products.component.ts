import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesServiceService } from '../_services/categories-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { categoriesData } from '../_services/data-categories.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private categoriesServiceService:CategoriesServiceService,
    private dataProductService:categoriesData) { }

  categoryId;
  category;
  product:any={
    name:null,
    code:null,
    price:null
  };
  productsToDelete=[];
  displayedColumns: string[] = ['code', 'name', 'price','edit','delete'];
  dataSource:MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.categoryId=this.activatedRoute.snapshot.params['id'];
    this.category=this.categoriesServiceService.getCategory(this.categoryId); 
    this.dataProductService.products=this.category.products;
    console.log(this.dataProductService);
    this.dataSource=new MatTableDataSource(this.dataProductService.products);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  onEdit(product){
    this.product=product
  }
  onAdd(){
    this.product={}
  }
  onDelete(){
    this.categoriesServiceService.deleteProduct(this.categoryId,this.productsToDelete)
    this.dataSource=new MatTableDataSource(this.dataProductService.products);
    this.dataSource.paginator = this.paginator;
    this.productsToDelete=[]
  }
  addProduct(){
    let product=this.product 
    this.categoriesServiceService.addProduct(this.categoryId,product);
    this.dataSource=new MatTableDataSource(this.dataProductService.products);
    this.dataSource.paginator = this.paginator;
  }
  onClickDelete(product){
    this.productsToDelete.push(product);
  }
}
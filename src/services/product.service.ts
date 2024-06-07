import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Product } from "../entities/Product";
import { checkIfDefined } from "../util";
import { ProductModel } from "../models/product.model";




const repo = AppDataSource.getRepository(Product)

export class ProductService {

   static async getAllProduct() {
      return await repo.find({
         select: {

            productId: true,
            name: true,
            description: true,
            unit: true,
            price: true,
            energyValiue: true,
            categoryId: true,
            

         },
         where: {
            deletedAt: IsNull()
         }

      })




   }


   static async getProductByID(id: number) {
      const data = await repo.findOne({
         select: {
            productId: true,
            name: true,
            description: true,
            unit: true,
            price: true,
            energyValiue: true,
            categoryId: true,
            createdAt: true,


            category: {
               categoryId: true,
               name: true,
               createdAt: true
            }


         },

         where: {
            productId: id,
            deletedAt: IsNull()
         },
         relations: {
            category: true
         }
      })

      return checkIfDefined(data)

   }


   static async getProductWithoutRelationsById(id: number) {
      const data = await repo.findOne({
         select: {
            productId: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            categoryId : true


         },

         where: {
            productId: id,
            deletedAt: IsNull()
         }
      })

      return checkIfDefined(data)

   }

   static async createProduct(model: ProductModel){
      return await repo.save ({
         categoryId : model.categoryId,
         name : model.name,
         createdAt : new Date()
      })

      
         
   }

   static async updateProduct(id: number, model: ProductModel){
      const data : Product = await this.getProductWithoutRelationsById(id)
      data.name = model.name
      data.categoryId = model.categoryId
      data.updatedAt = new Date()

      return await repo.save(data)
   
   }



   static async deleteDeviceById(id: number){
      const data : Product = await this.getProductWithoutRelationsById(id)
      data.deletedAt = new  Date()

      await repo.save(data)
   }





}






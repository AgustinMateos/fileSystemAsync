import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.patch='./productos.txt'
        this.products=[]
    }

    static id =0

    addProduct=async(title,description,price,imagen,code,stock)=>{

         ProductManager.id++ 


        let newProduct={
            title,
            description,
            price,
            imagen,
            code,
            stock, 
            id:ProductManager.id
        }
        this.products.push(newProduct)

       await fs.writeFile(this.patch,JSON.stringify(this.products));
       console.log("Producto Agregado")
    };

    readProducts=async()=>{
    let respuesta= await fs.readFile(this.patch,"utf-8") 
    return JSON.parse(respuesta)
    }


    getProducts = async () => {
        let respuesta2=await this.readProducts()
       return console.log(respuesta2)
    }


    getProductsById=async(id)=>{
       let respuesta3=await this.readProducts()
       if(!respuesta3.find(product=>product.id===id)){
        console.log("Producto no encontrado")
       }else{
        console.log(respuesta3.find(product=>product.id===id))
       }
    }

    deleteProductById=async(id)=>{
        
            let respuesta3= await this.readProducts();
            let productFilter=respuesta3.filter((products)=>products.id != id)
            await fs.writeFile(this.patch,JSON.stringify(productFilter));
            console.log("Producto Eliminado ")
        } 
    
    updateProducts=async({id,...producto})=>{
        await this.deleteProductById(id);
        let productOld=await this.readProducts()
        let productsModif=[{...producto,id },...productOld]
        await fs.writeFile(this.patch,JSON.stringify(productsModif))

        
       }
} 

const productos= new ProductManager(); 

//productos.getProducts()
//productos.addProduct("titulo1",'descripcion1',200,"imagen1","asde1",3)
//productos.addProduct("titulo2",'descripcion2',1200,"imagen2","ased1",5)
//productos.addProduct("titulo3",'descripcion3',2200,"imagen3","ased1",9)

//productos.getProductsById(3)

//productos.deleteProductById(1)

productos.updateProducts({
    title: 'titulo2',
    description: 'descripcion2',
    price: 8200,
    imagen: 'imagen5',
    code: 'ased1',
    stock: 5,
    id: 2
  })


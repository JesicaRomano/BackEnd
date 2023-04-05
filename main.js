//npm install nodemon -g// para instalar nodemon al proyecto
//nodemon +nombre de carpeta que quiero ejecutar, se ejecuta

const fs = require ('fs');// nuevo

class ProductManager {

    constructor() {
        this.path = "./productos.txt";// nuevo
        this.products = [];
        this.productIdCounter = 1;
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        const existingProduct = this.products.find(
            (product) => product.code === code
        ); 
    
        existingProduct
            ? console.log("El producto con este código, ya existe")
            : !title || !description || !price || !thumbnail || !code || !stock
            ? console.log("Todos los items son requeridos")
            : this.products.push({
                id: this.productIdCounter++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                });
        
        let newProduct = {
            id: this.productIdCounter++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
        }
        this.products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }
    
    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
    } 
    
    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(respuesta3.find(product => product.id === id));
        }
    
    };

    deleteProductsById = async (id) => {
        let respuesta4 = await this.readProducts();
        let productFilter = respuesta4.filter(product => product.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
        console.log("Producto eliminado");
    }
    
    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsNew = [{...producto, id}, ...productOld];
        await fs.promises.writeFile(this.path, JSON.stringify(productsNew))
    }
};

    

const manager = new ProductManager();
manager.addProducts('Pantalón Jeans', 'Pantalón de jeans chupin', 15000, 'img', 0001, 10);
manager.addProducts('Pantalón Sastrero', 'Pantalón de vestir sastrero chupin', 15000,'img', 0002, 8);
console.log(manager.getProducts());

manager.getProductsById(8);
manager.getProductsById(1);  

manager.deleteProductsById(1)

manager.updateProducts({
    id: 4,
    title: 'Pantalón Sastrero',
    description: 'Pantalón de vestir sastrero chupin',
    price: 5000,
    thumbnail: 'img',
    code: 2,
    stock: 8
})


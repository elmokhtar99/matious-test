import axios from 'axios' ;

const PRODUCT_API_URL="https://fakestoreapi.com/products" ;
class ProductService {
    getProduct(){
        return axios.get(PRODUCT_API_URL);
    }

    getProductById(id){
        return axios.get(PRODUCT_API_URL+"/"+id);
    }
    getCategories(products){
        let categories = [];
        // eslint-disable-next-line
        products.map((produit)=>{
            if (!(categories.includes(produit.category)))
                categories.push(produit.category);
        })
        return  categories ;
    }
    
}

export default new ProductService() ;
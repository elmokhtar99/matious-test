import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ProductService from '../services/ProductService';
import Search from "./Search"
import "./products.css"
import { Link } from 'react-router-dom';
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            currentPage:1,
            productsPerPage:5,
            sort: '',
            filter:'all',
            sortrating: '' ,
        };
    }

    componentDidMount(){
        ProductService.getProduct().then((response)=>{
            this.setState({
                products:response.data
            })
        });
    }

    changePage =({selected}) =>{
        console.log(selected);
        this.setState(
            {
                currentPage : selected+1
            }
        );
    }

    display =(nbre) => {
        this.setState({
            productsPerPage:nbre
        })
    }

    onSortPrice =(e)=>{
        this.setState({sort: e.target.value})
        
    }

    onSortRating=(e)=>{
        this.setState({sortrating: e.target.value})
        
    }

    onFilter =(e)=>{
        this.setState({filter: e.target.value})
        
    }

    render() {
        // eslint-disable-next-line
        const sortedproductsbyprice = this.state.products.sort((a,b)=>{
            if(this.state.sort==="Expensive"){
                return b.price-a.price
            }
            else if (this.state.sort==="Sheap"){
                return a.price - b.price
            }
        });
        // eslint-disable-next-line
        const sortedproducts =sortedproductsbyprice.sort((a,b)=>{
            if(this.state.sortrating==="highest"){
                return b.rating.rate-a.rating.rate
            }
            else if (this.state.sortrating==="lowest"){
                return a.rating.rate - b.rating.rate
            }
        });
        // eslint-disable-next-line
        const filteredandsorted = sortedproducts.filter((val)=>{
            if(this.state.filter==="all") return val
            else {
                if (val.category ===this.state.filter)
                return val
            }
        })
        const indexOfLastProduct = this.state.currentPage * this.state.productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct -this.state.productsPerPage ;
        const displayProduct = filteredandsorted.slice(indexOfFirstProduct,indexOfLastProduct);
        const pageCount = Math.ceil(filteredandsorted.length/this.state.productsPerPage);
        return (
            <div>
                <Search products = {this.state.products} onFilter={this.onFilter} onSortPrice={this.onSortPrice}
                 onSortRating={this.onSortRating} />
                <div className='card'>
                    <div className='card-header'>
                    <h5 className="card-title  text-center">Liste des Produits</h5>               
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Rate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {  
                                        displayProduct.map((produit)=>
                                        <tr key={produit.id}>
                                            <td>{produit.id}</td>
                                            <td>{produit.category}</td>
                                            <td>{produit.price}</td>
                                            <td> {produit.rating.rate}</td>
                                            <td> <Link className='btn btn-primary' to={"/products/"+produit.id}>Product Details</Link></td>
                                        </tr>)
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={this.changePage}
                            containerClassName={"paginationBttns"}
                            activeClassName={"paginationActive"} 
                            />
                        </div>
                        <div className='col-6'>
                            <button className='btn btn-success m-1' type="button" onClick={()=>this.display(5)}>Display 5</button>
                            <button className='btn btn-success m-1' type="button" onClick={()=>this.display(10)}>Display 10</button>
                            <button className='btn btn-success m-1' type="button" onClick={()=>this.display(15)}>Display 15</button>
                        </div>
                        
                        
                    </div>
                    
                </div>

            </div>
        );
    }
}

export default Products;
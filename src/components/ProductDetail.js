import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import { Link } from 'react-router-dom';
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            product:{},
            rating : {}
            
        }
        
    }

    componentDidMount(){
        this.getProduct(this.props.match.params.id);
    }

    getProduct(id){
        ProductService.getProductById(id).then((resp)=>{
            
            this.setState({
                product:resp.data,
                rating : resp.data.rating
                
            })

        }).catch((err =>{
            console.log(err);
        }));
    }
    
    render() {
        return (
            <div className='container'>
                <div className="card mb-3">
                    <img className="card-img-top" src={this.state.product.image} height={400} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{this.state.product.title}</h5>
                        <p className="card-text">Category : {this.state.product.category}</p>
                        <p className="card-text">Price : {this.state.product.price}</p>
                        <p className="card-text">Rate : {this.state.rating.rate}</p>
                        <p className="card-text">Count : {this.state.rating.count}</p>
                        <p className="card-text">Description: {this.state.product.description}</p>
                    </div>
                    <div className="form-group">
                        <Link className='btn btn-primary' to={"/products"}>Back</Link>
                    </div>         
            </div>
          
        </div>
        );
    }
}

export default ProductDetail;
import React  from 'react';
import ProductService from '../services/ProductService';
import './Search.css';
function Search(props) {
  
    return (
        <div className='row'>
                <div className='header'>
                    <div className='search'>
                        <div className='searchBar'>
                            <select defaultValue="filter"  onChange={props.onFilter}>
                                <option disabled value="filter" >Filter by Categories</option>
                                <option  value="all" >All</option>
                                {ProductService.getCategories(props.products).map((categorie)=>{
                                    return <option value={categorie} key={categorie}>{categorie}</option>
                                }) }
                            </select>
                        <div className="form-group">
                            <select defaultValue="Sort" onChange={props.onSortPrice}>
                                <option  disabled value="Sort">Sort By Price</option>
                                <option value="Expensive">Expensive</option>
                                <option value="Sheap">sheapest</option>
                            
                            </select>
                        </div>

                        <div className="form-group">
                            <select defaultValue="Sort" onChange={props.onSortRating}>
                                <option  disabled value="Sort">Sort By Rating</option>
                                <option value="highest">Highest</option>
                                <option value="lowest">Lowest</option>
                            
                            </select>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
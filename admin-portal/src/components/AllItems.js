import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { configureImageURL } from '../utils/imageDirectories';

import { selectIngredient } from '../actions/ingredients';


const AllItems = ({ itemType, items, selectIngredient }) => {
    const ITEM_URL = `http://localhost:5400/${itemType}s`;

    const switchAction = id => {
        if (itemType === 'ingredient') {
            selectIngredient(id);
        }
    }

    return ( 
        <div className="ac-container">
            { items.map(item => (
                <Link to={ `/edit-${itemType}/${item._id}` } key={ item._id } 
                onClick={() => switchAction(item._id)} >
                    <div className="item-card">
                        <img className="circle-image" 
                            src={`${ITEM_URL}${configureImageURL(item.image)}`} 
                                alt={item.name} 
                        />
                        <h5>{ item.name }</h5>
                </div>
            </Link> 
        ))}
    </div>
    )
}

export default connect(null, { selectIngredient })(AllItems);
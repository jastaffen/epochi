import React from 'react';
import { Link } from 'react-router-dom';

import { configureImageURL } from '../utils/imageDirectories';


const AllItems = ({ itemType, items }) => {
    const ITEM_URL = `http://localhost:5400/api/${itemType}s`;

    return ( 
        <div className="ac-container">
            { items.map(item => (
                <Link to={ `/edit-${itemType}/${item._id}` } key={ item._id }>
                    <div className="item-card">
                        <img className="circle-image" 
                            src={ITEM_URL + 
                                configureImageURL(item.avatar ? item.avatar : item.image)} 
                                alt={item.name} 
                        />
                        <h5>{ item.name }</h5>
                </div>
            </Link> 
        ))}
    </div>
    )
}

export default AllItems;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllChefs, selectChef } from '../../actions/chefs';

import { CHEF_URL, configureImageURL } from '../../utils/imageDirectories';

const AllChefs = ({ getAllChefs, chefs: { loading, allChefs }, selectChef }) => {

    useEffect(() => {
        if (allChefs.length === 0) {
            getAllChefs()
        }
    }, [ getAllChefs, allChefs.length ]);

    return (
        <div className="ac-container">
            {!loading && allChefs.map(chef => (
                <Link to={`/edit-chef/${chef._id}`} onClick={ () => selectChef(chef._id) } key={chef._id} >
                    <div className="chef-card">
                        <img className="circle-image" src={CHEF_URL + configureImageURL(chef.avatar)} alt={chef.name} />
                        <h5>{chef.name}</h5>
                    </div>
                </Link>
                )) }
            </div>
        )

}

const msp = state => ({
    chefs: state.chefs
})

export default connect(msp, { getAllChefs, selectChef })(AllChefs);
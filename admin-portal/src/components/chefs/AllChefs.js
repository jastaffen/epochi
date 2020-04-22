import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


import { getAllChefs } from '../../actions/chefs';
import { connect } from 'react-redux';

const AllChefs = ({ from, getAllChefs, chefs: { loading, allChefs } }) => {

    useEffect(() => {
        getAllChefs()
    }, [ getAllChefs ])

    if (from === 'add-chef') {
        return (
            <div className="ac-container">
                {!loading && allChefs.map(chef => (
                    <div className="chef-card" key={chef._id}>
                        <img className="circle-image" src={chef.avatar} alt={chef.name} />
                        <h5>{chef.name}</h5>
                    </div>
                )) }
            </div>
        )

    } else {

        return (
            <div>
                Select the chef you'd like to update
            </div>
        )
    }
}

const msp = state => ({
    chefs: state.chefs
})

export default connect(msp, { getAllChefs })(AllChefs);
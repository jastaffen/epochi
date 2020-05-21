import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllChefs } from '../../../actions/chefs';

const ChefSelect = ({ getAllChefs, 
    chefs: { loading, allChefs }, 
        chefId, setChef }) => {

    const [ chefsToDisplay, setChefsToDisplay ] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    
    useEffect(() => {
        if (allChefs.length === 0) {
            getAllChefs();
        }
        setChefsToDisplay(allChefs);
    }, [ allChefs.length, getAllChefs ]);

    const renderChefs = () => {
        let filteredChefs = [...chefsToDisplay];

        if (searchText) {
            filteredChefs = filteredChefs.filter(chef => (
                chef.name.toLowerCase().includes(searchText.toLowerCase())
            ));
        }

        return filteredChefs.map(chef => {
            return (

                <div key={chef._id} onClick={() => setChef(chef._id)} 
                className={chef._id === chefId ? 
                'selected card' : 'card'} >
                    <span>{ chef.name }</span>
                </div>

            )
        });
    }

    return (
        <div className="radio-box-container">
            <h3>Choose A Chef</h3>
            <input type="text" value={searchText}
                className="search" placeholder="Search chef..."
                onChange={e => setSearchText(e.target.value)} 
            />
            <div className="radio-box">
                {!loading && renderChefs()}
            </div>
        </div>
    )

}

const msp = state => ({
    chefs: state.chefs
})

export default connect(msp, { getAllChefs })(ChefSelect);
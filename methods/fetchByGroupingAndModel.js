const fetchByGroupingAndModel = async ( group, model, selectors = null ) => {

    return group.map( async el => {
        // selectors is just a string of columns to exclusively return
        if ( selectors ) return await model.findById( el._id ).select( selectors );
        return await model.findById( el._id );
    });

}

module.exports = fetchByGroupingAndModel;
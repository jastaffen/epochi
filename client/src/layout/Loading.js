import React from 'react';

import LoadingDoc from '../images/loading-doc.gif';

const Loading = () => {
    return(

        <div id="loading">
            <img src={LoadingDoc} alt={'loading-gif'} />
        </div>
        
    )
}

export default Loading;
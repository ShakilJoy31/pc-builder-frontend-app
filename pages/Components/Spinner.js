import React from 'react';

import MyServiceCss from '../../style/MyServiceCSS.module.css';

const Spinner = () => {
    return (
        <div className=''>
            <div class={`${MyServiceCss.spinner}`}></div>
        </div>
    );
};

export default Spinner;
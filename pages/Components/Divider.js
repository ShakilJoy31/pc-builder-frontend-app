import React from 'react';

import { OrColor } from '../../constants/color-constants';

const Divider = ({children, color}) => {
    return (
        <div className="flex items-center w-full mt-4">
              <div
                style={{ background: color }}
                className="w-full h-[1px]"
              ></div>
              <div style={{ color: OrColor }}>{children}</div>
              <div
                style={{ background: color }}
                className="w-full h-[1px]"
              ></div>
            </div>
    );
};

export default Divider;
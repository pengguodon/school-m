import React from 'react';
import Loadable from 'react-loadable';

export default (loader) => {
    return Loadable({
        loader,
        loading() {
            return <div className='the_global_load .canNotSelect'>
                <div className="the_global_load-content">
                    <img width="200"  height="150" src="https://pengguodon-guli-file.oss-cn-guangzhou.aliyuncs.com/schoolMobile/loding.gif" alt="" />
                </div>
            </div>
        },
    });
}
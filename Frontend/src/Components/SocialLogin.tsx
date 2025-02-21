import React from 'react';

interface SocialOProps{
    provider?:"google";
    label?:string;
    logo?: React.ReactNode;
    authUrl?:string;
}

const SocialLogin: React.FC<SocialOProps> = ({provider,label,logo,authUrl}) => {
    return(
        <div className='w-full'>
            <a href={authUrl}
            className=''
            {...logo && <span className='mr-2'>{logo}</span>}
            ><span>{label}</span>
            </a>
        </div>
    )
}

export default SocialLogin
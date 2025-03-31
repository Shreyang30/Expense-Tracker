import {Link} from 'react-router-dom';

interface SubHeadingProps{
    text?: string;
    link: string;
    to?: string;
}

function SubHeading({text,to,link, ...props}: SubHeadingProps) {
  return (
    <div className='text-center text-xl text-gray-400 m-2' {...props}>
        {text}
        <Link className='text-blue-600 underline' to={link}>{to}</Link>
        </div>
  )
}

export default SubHeading
interface HeadingProps{
    text?: string;
}

function Heading({text, ...props}: HeadingProps) {
  return (
    <div className='text-4xl font-bold text-center text-white'{...props}>{text}</div>
  )
}

export default Heading
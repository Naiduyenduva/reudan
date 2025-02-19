
interface buttonProps {
  text: string,
  onClick: ()=>void
}
const Button = ({text,onClick}:buttonProps) => {
  return (
    <div>
        <button className={`bg-gradient-to-br from-blue-600 to-purple-600 p-1 px-2 rounded-lg w-full h-fit text-white cursor-pointer`} onClick={onClick}>{text}</button>
    </div>
  )
}

export default Button;
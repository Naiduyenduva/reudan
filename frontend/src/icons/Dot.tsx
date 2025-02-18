interface DotProps {
    color: string;
    size?: number;
  }

const Dot = ({color,size}:DotProps) => {
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={size} strokeLinecap="round" strokeLinejoin="round" color={color} className="lucide lucide-dot mt-1"><circle cx="12.1" cy="12.1" r="1"/></svg>
    </div>
  )
}

export default Dot
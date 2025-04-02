

const Button = ({text, onClick}) => {
    return (
        <button 
            onClick={onClick}
            className={`rounded-lg px-2 py-1 w-full md:w-auto bg-blue/90 hover:bg-blue shadow-[0px_4px_0px_hsl(211,100%,50%,0.5),0px_4px_4px_hsl(0,0%,0%,0.25)]`}>
            {text}
        </button>
    )
}

export default Button

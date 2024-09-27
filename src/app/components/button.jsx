export function Button({ name, onClick, type }) {

  return (
    <button className="rounded-full  shadow-lg hover:shadow-indigo-500/40 bg-[#FF0080] border-2 border-white text-white hover:border-[#FF0080] hover:bg-white hover:text-[#FF0080] p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" type={type} onClick={onClick}>
        {name}
    </button>
  )
}

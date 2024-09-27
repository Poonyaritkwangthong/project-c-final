export function Input({ id, name, value , type , placeholder, onChange }) {
  return (
    <input type={type} id={id} name={name} value={value} placeholder={placeholder} className="" onChange={onChange}/>
  )
}

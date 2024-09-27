export default function LayoutApp({ children }) {
    return (
        <div className=" min-h-dvh bg-cover flex flex-col">
            <div className="w-[90%] mx-auto">
                {children}
            </div>
        </div>
    )
}

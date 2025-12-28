export default function Information({
    type,
    title,
    children,
    onClose = () => { location.reload(); }
}: any) {
    const typeStyles: any = {
        info: 'bg-blue-200 border-blue-400 text-blue-500',
        warning: 'bg-yellow-200 border-yellow-400 text-yellow-500',
        error: 'bg-red-200 border-red-400 text-red-500',
    };
    return (
        <div className={`rounded p-3 border m-1 ${typeStyles[type]}`}>
            <h1 className={`${typeStyles[type]} font-bold`}>{title}</h1>
            <p className={`${typeStyles[type]}`}>{children}</p>
            <button className="bg-gray-200 border-gray-400 hover:bg-gray-300 text-gray-800 border py-1 px-3 mt-3 rounded w-full" 
                onClick={() => {
                    onClose();
                }}>Cerrar</button>
        </div>);
}

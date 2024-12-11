export default function BigButton({ text, onClick }) {
    return (
        <div>
            <button
                className="flex p-8 h-24 w-52 rounded-md
                    flex-col text-text bg-slate-300 size-8 text-3xl
                    hover:bg-red-100 transition-all hover:shadow-xl"
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
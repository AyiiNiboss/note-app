const FormCreate = () => {
    return (
            <form action="">
                <div className="mb-2 pb-2">
                    <input type="text" placeholder="Title" name="title" className="w-full p-2 text-sm focus:outline-none bg-slate-200 border-b border-slate-500" />
                </div>
                <div className="mb-2 pb-2">
                    <textarea type="text" placeholder="Content" name="content" className="w-full h-[200px] p-2 rounded-md text-sm focus:outline-none bg-slate-200"></textarea>
                </div>
            </form>
    )
}
export default FormCreate
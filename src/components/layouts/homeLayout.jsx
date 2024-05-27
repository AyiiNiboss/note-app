import { BiSearch } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../services/notes.service";
import { useEffect, useState } from "react";
import formatDate from "../../helpers/formatedDate";
import Dropdowns from "../fragments/dropDown";
import { getNote, searchNote } from "../../store/noteSlice";
import bg from "@/bg.png";

const HomeLayout = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const notesRedux = useSelector((state) => state.note.value);
  const searchNotes = useSelector((state) => state.note.valueSearch);
  const valueSearch = useSelector((state) => state.note.search);
  const t = [...notesRedux]
  const x = [...searchNotes]

  const handleSearch = (e) => {
    const search = e.target.value;
    dispatch(searchNote(search));
  };
  useEffect(() => {
    setIsLoading(true);
    getNotes(token, (res) => {
      if (res.success === true) {
        setNotes(res.data);
        dispatch(getNote(res.data));
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <div className="mx-auto pt-[80px]">
      <div className="w-full px-3">
        <div className="flex">
          <label
            htmlFor="search"
            className="flex items-center px-3 py-2 bg-slate-300 w-full rounded-sm"
          >
            <input
              type="text"
              id="search"
              value={valueSearch || ""}
              placeholder="Search......."
              className="bg-slate-300 w-full text-sm focus:outline-none placeholder:italic"
              onChange={handleSearch}
            />
            <BiSearch />
          </label>
        </div>
      </div>
      <hr className="bg-slate-300 my-3 shadow-lg" />
      <div className="w-full px-3 pb-3">
        <Link to={"/create-note"}>
          <button
            className="text-sm rounded-full bg-slate-400 p-2 animate-bounce"
            title="Create"
          >
            <FaPlus color="white" />
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap px-3 gap-2 justify-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : (valueSearch ? searchNotes : notesRedux).length > 0 ? (
          (valueSearch ? x.sort(((a, b) => b.is_pinned - a.is_pinned)) : t.sort(((a, b) => b.is_pinned - a.is_pinned))).map((note) => (
            <div
              className={`flex flex-col h-full gap-1 w-[48%] rounded-lg bg-cover `}
              style={{ backgroundImage: `url(${bg})` }}
              key={note.id}
            >
              <div className="p-3">
              <div className="flex items-center justify-between gap-1">
                <div className="h-[25px] overflow-hidden">
                  <span className="text-sm" style={{ color: note.font_color }}>
                    {note.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <Dropdowns slug={note.slug} />
                </div>
              </div>
              <div className="h-[100px] overflow-hidden">
                <span
                  className="w-full h-full text-sm focus:outline-none cursor-default"
                  style={{
                    backgroundColor: note.color,
                    color: note.font_color,
                  }}
                >
                  {note.content ? note.content : null}
                </span>
              </div>
              <Link to={`/notes/${note.slug}`}>
                <div className="flex items-center">
                  <div
                    className="text-xs w-full"
                    style={{ color: note.font_color }}
                  >
                    {formatDate(note.updated_at)}
                  </div>
                  <div className="bg-slate-500 rounded-full p-1">
                    <MdOutlineEdit
                      color="white"
                      size={25}
                      className="p-1 text-white"
                    />
                  </div>
                </div>
              </Link>
              </div>
            </div>
          ))
        ) : (
          <div>Not Found</div>
        )}
      </div>
    </div>
  );
};
export default HomeLayout;

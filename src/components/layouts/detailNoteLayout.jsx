import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailNotes, updateNote } from "../../services/notes.service";
import { IoMdArrowBack } from "react-icons/io";
import { ColorPicker, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSearch } from "../../store/noteSlice";

const DetailNoteLayout = () => {
  const { slug } = useParams();
  const token = localStorage.getItem("token");
  const [dataNote, setDataNote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(dataNote.color);
  const [colorFont, setColorFont] = useState(dataNote.font_color);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setColor(dataNote.color || '');
    setColorFont(dataNote.font_color || '');
  }, [dataNote]);

  useEffect(() => {
    setIsLoading(true);
    getDetailNotes(slug, token, (res) => {
      if (res.success === true) {
        setDataNote(res.data);
        setIsLoading(false);
        dispatch(deleteSearch());
      }
    });
  }, []);

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-'); // Mengubah judul menjadi huruf kecil dan mengganti spasi dengan tanda strip
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      color: color,
      font_color: colorFont,
    };
    updateNote(slug, data, token, (res) => {
      console.log(res);
      setIsEdit(false);
    });
    const newSlug = generateSlug(e.target.title.value)
    navigate(`/notes/${newSlug}`);
  };
 
  const handleColor = (value) => {
    const colorConvert = value.toHexString();
    setColor(colorConvert);
    setIsEdit(true);
  };

  const handleColorFont = (value) => {
    const colorConvert = value.toHexString(); // Mengambil nilai warna dari objek yang dikembalikan
    setColorFont(colorConvert);
    setIsEdit(true);
  };

  return (
    <>
    {isLoading ? (
      <div className="mx-auto pt-[80px] px-3">
        <p >Loading...</p>
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="mx-auto pt-[80px] px-3">
          <div
            className="px-3 rounded-lg"
            style={{ backgroundColor: color }}
          >
            <div className="w-full flex justify-between items-center py-3">
              <Link to={"/home"}>
                <IoMdArrowBack style={{ color: colorFont }} size={20} title="Back" />
              </Link>
              {isEdit && <button className="text-sm" style={{ color: colorFont }} type="submit">Simpan</button>}
            </div>
            <div className="mt-3">
              <div className="mb-2 pb-2">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  defaultValue={dataNote.title}
                  className="w-full p-2 text-sm focus:outline-none border-b border-slate-500"
                  style={{ backgroundColor: color, color: colorFont }}
                  onChange={(e) => setIsEdit(true)}
                />
              </div>
              <div className="pb-2">
                <textarea
                  type="text"
                  placeholder="Content"
                  name="content"
                  className="w-full h-[200px] p-2 rounded-md text-sm focus:outline-none overflow-hidden"
                  style={{ backgroundColor: color, color: colorFont }}
                  defaultValue={dataNote.content}
                  onChange={(e) => setIsEdit(true)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="py-2 flex gap-2 justify-between">
          <div className="flex flex-col justify-center gap-2">
            <label className="text-sm">
              Background Color
            </label>
            <Space className="justify-center">
              <ColorPicker
                defaultValue={dataNote.color}
                onChange={handleColor}
              />
            </Space>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <label className="text-sm">
              Font Color
            </label>
            <Space className="justify-center">
              <ColorPicker
                defaultValue={dataNote.font_color}
                onChange={handleColorFont}
              />
            </Space>
          </div>
        </div>
        </div>
      </form>
    )}
    </>
  );
};

export default DetailNoteLayout;

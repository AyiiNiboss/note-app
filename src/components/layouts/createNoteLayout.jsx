import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addNote } from "../../store/noteSlice";
import { ColorPicker, Space } from "antd";
import { useState } from "react";
import { createNote } from "../../services/notes.service";

const CreateNoteLayout = () => {
  const [colorBackground, setColorBackground] = useState("#CAD5E1");
  const [colorFont, setColorFont] = useState("#000000");
  const token = localStorage.getItem("token");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleColorBackground = (value) => {
    const colorConvert = value.toHexString(); // Mengambil nilai warna dari objek yang dikembalikan
    setColorBackground(colorConvert);
    setIsEdit(true);
  };

  const handleColorFont = (value) => {
    const colorConvert = value.toHexString(); // Mengambil nilai warna dari objek yang dikembalikan
    setColorFont(colorConvert);
    setIsEdit(true);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, "-"); // Mengubah judul menjadi huruf kecil dan mengganti spasi dengan tanda strip
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      color: colorBackground,
      font_color: colorFont,
    };
    createNote(data, token, (res) => {
      console.log(res);
      if (res.success === true) {
        const newSlug = generateSlug(res.data.slug);
        navigate(`/notes/${newSlug}`);
      }
      setIsEdit(false);
    });
  };
  return (
    <form onSubmit={handleCreate}>
      <div className="mx-auto pt-[80px] px-3">
        <div className="px-3 rounded-lg" style={{ backgroundColor: colorBackground }}>
          <div className="w-full flex justify-between items-center py-3">
            <Link to={"/home"}>
              <IoMdArrowBack size={20} style={{ color: colorFont }} title="Back" />
            </Link>
            {isEdit && (
              <button className="text-sm" style={{ color: colorFont }} type="submit">
                Simpan
              </button>
            )}
          </div>
          <p className="py-2" style={{ color: colorFont }}>Create Note</p>
          <hr />
          <div className="mt-3">
            <div className="mb-2 pb-2">
              <input
                type="text"
                placeholder="Title"
                name="title"
                className="w-full p-2 text-sm focus:outline-none border-b border-slate-500"
                style={{ backgroundColor: colorBackground, color: colorFont }}
                onChange={(e) => {
                  setIsEdit(true);
                }}
              />
            </div>
            <div className="mb-2 pb-2">
              <textarea
                type="text"
                placeholder="Content"
                name="content"
                className="w-full h-[200px] p-2 rounded-md text-sm focus:outline-none overflow-hidden"
                style={{ backgroundColor: colorBackground, color: colorFont }}
                onChange={(e) => {
                  setIsEdit(true);
                }}
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
                value={colorBackground}
                onChange={handleColorBackground}
              />
            </Space>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <label className="text-sm">
              Font Color
            </label>
            <Space className="justify-center">
              <ColorPicker
                value={colorFont}
                onChange={handleColorFont}
              />
            </Space>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateNoteLayout;

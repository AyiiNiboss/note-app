import React from "react";
import { Dropdown, Space } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import { createPinnedNote, deleteNote, updateNote } from "../../services/notes.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteNotes, updatePinnedNote } from "../../store/noteSlice";

const Dropdowns = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = props;
  const handleDeleteNote = () => {
    const token = localStorage.getItem("token");
    deleteNote(slug, token, (res) => {
      dispatch(deleteNotes(slug));
    });
  };

  const handlepinnedNote = () => {
    const token = localStorage.getItem("token");
    createPinnedNote(slug, token, (res) => {
      dispatch(updatePinnedNote(slug));
    })
  };
  const items = [
    {
      label: (
      <BsPinAngle onClick={handlepinnedNote} title="Pin" size={20} />
      ),
      key: "0",
    },
    {
      label: (
        <MdOutlineDelete onClick={handleDeleteNote} title="Delete" size={20} />
      ),
      key: "1",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <BsThreeDotsVertical />
        </Space>
      </a>
    </Dropdown>
  );
};
export default Dropdowns;

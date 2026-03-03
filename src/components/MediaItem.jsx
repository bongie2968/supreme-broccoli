import React from "react";

export default function MediaItem({ item, isOpen, setOpenItemId, onDelete }) {
  const handleClick = (e) => {
    e.stopPropagation();
    setOpenItemId(isOpen ? null : item.id);
  };

  return (
    <div className={`media-item ${isOpen ? "open" : ""}`} onClick={handleClick}>
      {item.type.startsWith("video") ? (
        <video src={item.data} muted />
      ) : (
        <img src={item.data} alt={item.name} />
      )}
      <div className="media-name">{item.name}</div>
      {isOpen && (
        <div className="dropdown">
          <div onClick={onDelete}>このアイテムを削除</div>
          <div>このアイテムをライブラリに追加</div>
        </div>
      )}
    </div>
  );
}

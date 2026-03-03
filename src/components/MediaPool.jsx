import React from "react";
import MediaItem from "./MediaItem";

export default function MediaPool({ items, openItemId, setOpenItemId, onDeleteItem }) {
  return (
    <div className="media-pool">
      {items.map((item) => (
        <MediaItem
          key={item.id}
          item={item}
          isOpen={openItemId === item.id}
          setOpenItemId={setOpenItemId}
          onDelete={() => onDeleteItem(item.id)}
        />
      ))}
    </div>
  );
}

import React, { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import MediaPool from "./components/MediaPool";
import PreviewBox from "./components/PreviewBox";

function App() {
  const [mediaItems, setMediaItems] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);
  const fileInputRef = useRef(null);

  // ファイル選択ボタン
  const handleLoadMedia = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
  };

  // ファイル読み込み
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const newItems = await Promise.all(
      files.map(async (file) => {
        const data = await toDataURL(file);
        return {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          data,
        };
      })
    );
    setMediaItems((prev) => [...prev, ...newItems]);
  };

  const handleDeleteItem = (id) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    if (openItemId === id) setOpenItemId(null);
  };

  return (
    <div className="area16x9">
      <TopBar onLoadMedia={handleLoadMedia} />
      <div className="header">
        <div className="title">無題のプロジェクト</div>
        <div className="line">
          <div className="left-overlay">
            <div className="left-text">メディアプール</div>
            <div className="left-overlay-line"></div>
          </div>
        </div>
        <MediaPool
          items={mediaItems}
          openItemId={openItemId}
          setOpenItemId={setOpenItemId}
          onDeleteItem={handleDeleteItem}
        />
        <PreviewBox />
        <div className="line-bottom"></div>
        <div className="line-extra"></div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}

// ファイル → DataURL
function toDataURL(file) {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.readAsDataURL(file);
  });
}

export default App;

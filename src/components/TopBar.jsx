import React, { useState } from "react";

const menus = [
  { name: "ファイル", items: ["新規", "読み込む"] },
  { name: "編集", items: ["元に戻す", "やり直し"] },
  { name: "トリム", items: ["開始点", "終了点"] },
  { name: "マーク", items: ["追加", "削除"] },
  { name: "クリップ", items: ["分割", "結合"] },
  { name: "変更", items: ["設定"] },
  { name: "表示", items: ["ズーム", "全画面"] },
  { name: "ウィンドウ", items: ["配置"] },
  { name: "ヘルプ", items: ["ヘルプを見る"] },
];

export default function TopBar({ onLoadMedia }) {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    if (menuName === "ファイル") {
      onLoadMedia();
    }
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="topbar">
      <b>Bongie Movie Studio</b>
      {menus.map((menu) => (
        <div
          key={menu.name}
          className={`menu ${openMenu === menu.name ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleMenuClick(menu.name);
          }}
        >
          {menu.name}
          <div className="dropdown">
            {menu.items.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

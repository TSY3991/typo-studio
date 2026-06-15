function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} = React;

/* ══════════ CONSTANTS ══════════ */
const GFONTS = ["Noto Sans TC", "Noto Serif TC", "LXGW WenKai TC", "Zen Maru Gothic", "Playfair Display", "Bebas Neue", "Oswald", "Syne", "DM Serif Display", "Instrument Serif", "Cormorant Garamond", "Space Mono", "Caveat", "Monoton", "Cinzel Decorative", "Press Start 2P", "Fredoka", "Righteous", "Abril Fatface", "Rubik Mono One", "M PLUS Rounded 1c", "Pacifico"];
const FONT_CATS = {
  "中文": ["Noto Sans TC", "Noto Serif TC", "LXGW WenKai TC", "Zen Maru Gothic", "M PLUS Rounded 1c"],
  "襯線": ["Playfair Display", "DM Serif Display", "Instrument Serif", "Cormorant Garamond", "Abril Fatface", "Cinzel Decorative"],
  "無襯線": ["Bebas Neue", "Oswald", "Syne", "Righteous", "Fredoka", "Rubik Mono One"],
  "特殊": ["Monoton", "Press Start 2P", "Space Mono", "Caveat", "Pacifico"]
};
const PAGE_TYPES = [{
  id: "cover",
  label: "封面",
  icon: "T",
  desc: "大標題封面頁"
}, {
  id: "img-top",
  label: "圖上文下",
  icon: "▀",
  desc: "上圖+下文"
}, {
  id: "text-top",
  label: "文上圖下",
  icon: "▄",
  desc: "上文+下圖"
}, {
  id: "side-lr",
  label: "左圖右文",
  icon: "◧",
  desc: "左圖右文"
}, {
  id: "side-rl",
  label: "左文右圖",
  icon: "◨",
  desc: "左文右圖"
}, {
  id: "list",
  label: "條列/步驟",
  icon: "≡",
  desc: "編號清單"
}, {
  id: "quote",
  label: "金句",
  icon: "❝",
  desc: "引言金句頁"
}, {
  id: "cta",
  label: "結尾",
  icon: "➤",
  desc: "行動呼籲結尾頁"
}];
const BG_LIST = ["#111111", "#0d0d14", "#0a1a1a", "#141210", "#f5f0e8", "#1a0a1a", "#0a0e1a", "#08080a", "#0c0c0c", "linear-gradient(180deg,#f5f0e8,#e8dcc8)", "linear-gradient(135deg,#4158D0,#C850C0,#FFCC70)", "linear-gradient(180deg,#0d0d0d,#1a0a2e)", "linear-gradient(160deg,#0a0a12,#141420)", "linear-gradient(160deg,#fdf2f4,#eec4ce)", "linear-gradient(160deg,#0a0a0a,#171717)", "linear-gradient(180deg,#fefae0,#e9dfc0)", "linear-gradient(180deg,#fdf6f0,#f0e6d8)", "linear-gradient(160deg,#1a3a2a,#2d5a3d)", "linear-gradient(135deg,#e07a5f,#f2cc8f)", "linear-gradient(135deg,#0f2027,#203a43,#2c5364)", "#1a1a2e", "#fafaf5", "linear-gradient(135deg,#1e3c72,#2a5298)", "linear-gradient(135deg,#fc5c7d,#6a82fb)", "linear-gradient(160deg,#232526,#414345)", "linear-gradient(135deg,#0f0c29,#302b63,#24243e)"];
const ACCENTS = ["#FFD600", "#ff4757", "#4ecdc4", "#c9a84c", "#c44900", "#ff9ff3", "#00d2ff", "#ff00cc", "#00ff41", "#ffffff", "#1a1a1a", "#9e3c5d", "#e07a5f", "#feca57", "#7bed9f", "#8e7aaa", "#ff6b6b", "#5f27cd", "#54a0ff", "#ee5253", "#10ac84", "#f368e0"];
const RATIOS = [{
  id: "1:1",
  w: 1,
  h: 1,
  label: "1:1",
  px: "1080x1080"
}, {
  id: "4:5",
  w: 4,
  h: 5,
  label: "4:5",
  px: "1080x1350"
}, {
  id: "9:16",
  w: 9,
  h: 16,
  label: "9:16",
  px: "1080x1920"
}];
const COLOR_COMBOS = [{
  accent: "#FFD600",
  bgColor: "#111111",
  textColor: "#ffffff"
}, {
  accent: "#ff4757",
  bgColor: "#0d0d14",
  textColor: "#e8e8f0"
}, {
  accent: "#4ecdc4",
  bgColor: "#0a1a1a",
  textColor: "#e0f0f0"
}, {
  accent: "#c9a84c",
  bgColor: "#141210",
  textColor: "#e8e0d4"
}, {
  accent: "#c44900",
  bgColor: "#f5f0e8",
  textColor: "#2c2c2c"
}, {
  accent: "#ff9ff3",
  bgColor: "#1a0a1a",
  textColor: "#f0e0f0"
}, {
  accent: "#00d2ff",
  bgColor: "#0a0e1a",
  textColor: "#d0e0f8"
}, {
  accent: "#ff00cc",
  bgColor: "#08080a",
  textColor: "#ffffff"
}, {
  accent: "#7bed9f",
  bgColor: "#0a1a12",
  textColor: "#d0f0e0"
}, {
  accent: "#feca57",
  bgColor: "#1a1410",
  textColor: "#f0e8d0"
}, {
  accent: "#ffffff",
  bgColor: "linear-gradient(135deg,#4158D0,#C850C0,#FFCC70)",
  textColor: "rgba(255,255,255,0.7)"
}, {
  accent: "#9e3c5d",
  bgColor: "linear-gradient(180deg,#f5f0e8,#e8dcc8)",
  textColor: "#3a3a3a"
}, {
  accent: "#e07a5f",
  bgColor: "#fafaf5",
  textColor: "#2c2c2c"
}, {
  accent: "#8e7aaa",
  bgColor: "#0e0a14",
  textColor: "#e0d8f0"
}, {
  accent: "#00ff41",
  bgColor: "#0a0a0a",
  textColor: "#d0ffd0"
}];
const COVER_PRESETS = [{
  id: "list-5",
  topLabel: "懶人包",
  bigNumber: "5",
  headline: "個超實用的\nIG排版技巧",
  subtitle: "新手必學 / 2026最新整理",
  accent: "#FFD600",
  bgColor: "#111111",
  textColor: "#ffffff",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "number-left",
  decoStyle: "line",
  headSize: 36,
  numSize: 120,
  topSize: 13,
  subSize: 14,
  bottomTag: "@hao0321_studio"
}, {
  id: "trend-hot",
  topLabel: "趨勢分析",
  bigNumber: "",
  headline: "現在最火的\n{hl}短影音趨勢{/hl}",
  subtitle: "不跟上就落伍了",
  accent: "#ff4757",
  bgColor: "#0d0d14",
  textColor: "#e8e8f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "center",
  decoStyle: "line",
  headSize: 40,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: "SWIPE TO READ"
}, {
  id: "tips-7",
  topLabel: "實用整理",
  bigNumber: "7",
  headline: "個讓你粉絲\n{hl}翻倍成長{/hl}的秘訣",
  subtitle: "我整理了最有效的方法",
  accent: "#4ecdc4",
  bgColor: "#0a1a1a",
  textColor: "#e0f0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "number-left",
  decoStyle: "dot",
  headSize: 34,
  numSize: 110,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "mustknow",
  topLabel: "你不能不知道",
  bigNumber: "",
  headline: "2026年\n{hl}自媒體{/hl}必備工具",
  subtitle: "免費 + 付費完整推薦",
  accent: "#c9a84c",
  bgColor: "#141210",
  textColor: "#e8e0d4",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "center",
  decoStyle: "bracket",
  headSize: 38,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: "SAVE THIS POST"
}, {
  id: "minimal-quote",
  topLabel: "",
  bigNumber: "",
  headline: "慢慢來\n{hl}比較快{/hl}",
  subtitle: "",
  accent: "#c44900",
  bgColor: "#f5f0e8",
  textColor: "#2c2c2c",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  layout: "center",
  decoStyle: "line",
  headSize: 52,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "sorted-10",
  topLabel: "我整理了",
  bigNumber: "10",
  headline: "款最好用的\n{hl}修圖APP{/hl}",
  subtitle: "全部免費下載",
  accent: "#ff9ff3",
  bgColor: "#1a0a1a",
  textColor: "#f0e0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "number-left",
  decoStyle: "dot",
  headSize: 34,
  numSize: 120,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "neon-impact",
  topLabel: "",
  bigNumber: "",
  headline: "DREAM\n{hl}BIG{/hl}",
  subtitle: "",
  accent: "#ff00cc",
  bgColor: "#08080a",
  textColor: "#ffffff",
  fontHead: "Bebas Neue",
  fontBody: "Bebas Neue",
  layout: "center",
  decoStyle: "none",
  headSize: 72,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "warm-literary",
  topLabel: "",
  bigNumber: "",
  headline: "生活不在別處\n就在{hl}此刻{/hl}",
  subtitle: "",
  accent: "#9e3c5d",
  bgColor: "linear-gradient(180deg,#f5f0e8,#e8dcc8)",
  textColor: "#3a3a3a",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  layout: "center",
  decoStyle: "none",
  headSize: 44,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "pastel-gradient",
  topLabel: "STAY",
  bigNumber: "",
  headline: "{hl}CREATIVE{/hl}",
  subtitle: "KEEP PUSHING FORWARD",
  accent: "#ffffff",
  bgColor: "linear-gradient(135deg,#4158D0,#C850C0,#FFCC70)",
  textColor: "rgba(255,255,255,0.7)",
  fontHead: "Syne",
  fontBody: "Syne",
  layout: "center",
  decoStyle: "none",
  headSize: 58,
  numSize: 100,
  topSize: 14,
  subSize: 13,
  bottomTag: ""
}, {
  id: "howto-4",
  topLabel: "完整指南",
  bigNumber: "4",
  headline: "步驟打造\n{hl}個人品牌{/hl}",
  subtitle: "從零開始也不怕",
  accent: "#54a0ff",
  bgColor: "linear-gradient(135deg,#1e3c72,#2a5298)",
  textColor: "#eaf2ff",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  layout: "number-left",
  decoStyle: "corners",
  headSize: 34,
  numSize: 120,
  topSize: 12,
  subSize: 14,
  bottomTag: "SAVE THIS"
}, {
  id: "deep-night",
  topLabel: "深度思考",
  bigNumber: "",
  headline: "獨處\n是一種{hl}能力{/hl}",
  subtitle: "而非孤獨",
  accent: "#8e7aaa",
  bgColor: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
  textColor: "#e8e2f5",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  layout: "center",
  decoStyle: "corners",
  headSize: 46,
  numSize: 100,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}, {
  id: "bold-stat",
  topLabel: "數據說話",
  bigNumber: "90%",
  headline: "的人\n都{hl}不知道{/hl}",
  subtitle: "這個小技巧",
  accent: "#ff6b6b",
  bgColor: "#0d0d14",
  textColor: "#ffffff",
  fontHead: "Bebas Neue",
  fontBody: "Noto Sans TC",
  layout: "number-left",
  decoStyle: "line",
  headSize: 38,
  numSize: 96,
  topSize: 12,
  subSize: 14,
  bottomTag: ""
}];
const CONTENT_PRESETS = [{
  id: "ct-img-top-1",
  pageType: "img-top",
  label: "圖文教學",
  headline: "重點整理",
  bodyText: "這是內文說明的區域，\n可以放入重點文字敘述。",
  accent: "#FFD600",
  bgColor: "#111111",
  textColor: "#ffffff",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 28,
  bodySize: 16,
  imgColor: "#222230"
}, {
  id: "ct-img-top-2",
  pageType: "img-top",
  label: "產品介紹",
  headline: "{hl}產品亮點{/hl}",
  bodyText: "簡短描述產品特色，\n讓讀者快速理解價值。",
  accent: "#4ecdc4",
  bgColor: "#0a1a1a",
  textColor: "#e0f0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 26,
  bodySize: 15,
  imgColor: "#152525"
}, {
  id: "ct-text-top-1",
  pageType: "text-top",
  label: "金句分享",
  headline: "好的設計是\n{hl}看不見的設計{/hl}",
  bodyText: "",
  accent: "#c9a84c",
  bgColor: "#141210",
  textColor: "#e8e0d4",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  headSize: 30,
  bodySize: 15,
  imgColor: "#1e1a14"
}, {
  id: "ct-text-top-2",
  pageType: "text-top",
  label: "教學步驟",
  headline: "Step {hl}01{/hl}",
  bodyText: "打開 App，\n選擇「新建專案」",
  accent: "#ff4757",
  bgColor: "#0d0d14",
  textColor: "#e8e8f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 32,
  bodySize: 15,
  imgColor: "#181828"
}, {
  id: "ct-side-lr-1",
  pageType: "side-lr",
  label: "對比排版",
  headline: "Before\n& {hl}After{/hl}",
  bodyText: "修圖前後的效果對比，\n讓視覺衝擊更強。",
  accent: "#ff9ff3",
  bgColor: "#1a0a1a",
  textColor: "#f0e0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 24,
  bodySize: 14,
  imgColor: "#251530"
}, {
  id: "ct-side-rl-1",
  pageType: "side-rl",
  label: "圖文並排",
  headline: "{hl}Tips{/hl} 小技巧",
  bodyText: "實用的小訣竅，\n簡單明瞭地呈現。",
  accent: "#00d2ff",
  bgColor: "#0a0e1a",
  textColor: "#d0e0f8",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 24,
  bodySize: 14,
  imgColor: "#121828"
}, {
  id: "ct-list-1",
  pageType: "list",
  label: "步驟拆解",
  headline: "操作步驟",
  listItems: ["打開應用程式", "點選「建立」按鈕", "選擇你喜歡的模板", "自訂顏色和文字", "匯出並分享"],
  accent: "#FFD600",
  bgColor: "#111111",
  textColor: "#ffffff",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 26,
  bodySize: 15,
  listStyle: "number"
}, {
  id: "ct-list-2",
  pageType: "list",
  label: "重點條列",
  headline: "{hl}必知重點{/hl}",
  listItems: ["內容為王，品質優先", "保持一致的視覺風格", "善用Hashtag增加曝光", "與粉絲互動建立連結"],
  accent: "#4ecdc4",
  bgColor: "#0a1a1a",
  textColor: "#e0f0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 28,
  bodySize: 15,
  listStyle: "bullet"
}, {
  id: "ct-list-3",
  pageType: "list",
  label: "排名清單",
  headline: "TOP {hl}5{/hl} 推薦",
  listItems: ["Canva - 免費設計神器", "CapCut - 影片剪輯首選", "Notion - 內容規劃好幫手", "ChatGPT - 文案靈感來源", "Lightroom - 修圖必備"],
  accent: "#c9a84c",
  bgColor: "#141210",
  textColor: "#e8e0d4",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 28,
  bodySize: 14,
  listStyle: "number"
}, {
  id: "ct-quote-1",
  pageType: "quote",
  label: "金句卡",
  headline: "你的時間有限\n別浪費在{hl}別人的人生{/hl}裡",
  subtitle: "— Steve Jobs",
  accent: "#c9a84c",
  bgColor: "#0c0c0c",
  textColor: "#e8e0d4",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  headSize: 30,
  subSize: 14
}, {
  id: "ct-quote-2",
  pageType: "quote",
  label: "溫暖語錄",
  headline: "慢慢來\n{hl}比較快{/hl}",
  subtitle: "— 給急著長大的你",
  accent: "#9e3c5d",
  bgColor: "linear-gradient(180deg,#f5f0e8,#e8dcc8)",
  textColor: "#3a3a3a",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Serif TC",
  headSize: 42,
  subSize: 14
}, {
  id: "ct-quote-3",
  pageType: "quote",
  label: "暗黑金句",
  headline: "成功\n是{hl}熬出來{/hl}的",
  subtitle: "— 致正在努力的你",
  accent: "#00d2ff",
  bgColor: "#08080a",
  textColor: "#e8f4ff",
  fontHead: "Noto Serif TC",
  fontBody: "Noto Sans TC",
  headSize: 44,
  subSize: 13
}, {
  id: "ct-cta-1",
  pageType: "cta",
  label: "追蹤結尾",
  topLabel: "謝謝你讀到這裡",
  headline: "覺得有用\n記得{hl}收藏分享{/hl}",
  listItems: ["按讚 ❤️", "收藏 🔖", "分享 ➤"],
  bottomTag: "@hao0321_studio",
  accent: "#FFD600",
  bgColor: "#111111",
  textColor: "#ffffff",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 34
}, {
  id: "ct-cta-2",
  pageType: "cta",
  label: "行動呼籲",
  topLabel: "下一步",
  headline: "立即開始\n{hl}你的第一篇{/hl}",
  listItems: ["追蹤我", "分享給朋友"],
  bottomTag: "@your_handle",
  accent: "#4ecdc4",
  bgColor: "#0a1a1a",
  textColor: "#e0f0f0",
  fontHead: "Noto Sans TC",
  fontBody: "Noto Sans TC",
  headSize: 32
}];
function makePage(type = "cover", base = {}) {
  const defaults = {
    pageType: type,
    topLabel: "",
    bigNumber: "",
    headline: "",
    subtitle: "",
    bottomTag: "",
    layout: "center",
    decoStyle: "line",
    accent: "#FFD600",
    bgColor: "#111111",
    textColor: "#ffffff",
    fontHead: type === "quote" ? "Noto Serif TC" : "Noto Sans TC",
    fontBody: type === "quote" ? "Noto Serif TC" : "Noto Sans TC",
    headSize: type === "cover" ? 40 : type === "quote" ? 44 : type === "cta" ? 34 : 26,
    numSize: 120,
    topSize: 13,
    subSize: 14,
    bodyText: "",
    bodySize: 15,
    imgColor: "#222230",
    imgData: null,
    listItems: type === "cta" ? ["按讚 ❤️", "收藏 🔖", "分享 ➤"] : ["項目一", "項目二", "項目三"],
    listStyle: "number",
    showPageNum: false
  };
  return {
    ...defaults,
    ...base,
    id: Date.now() + Math.random()
  };
}

/* ── SVG Icons ── */
const Ic = ({
  d,
  s = 16
}) => React.createElement("svg", {
  width: s,
  height: s,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, d);
const ICO = {
  grid: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }))
  }),
  pen: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 20h9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
    }))
  }),
  tune: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "21",
      x2: "4",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "10",
      x2: "4",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "21",
      x2: "12",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "8",
      x2: "12",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "21",
      x2: "20",
      y2: "16"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "20",
      y1: "12",
      x2: "20",
      y2: "3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "1",
      y1: "14",
      x2: "7",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "8",
      x2: "15",
      y2: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "17",
      y1: "16",
      x2: "23",
      y2: "16"
    }))
  }),
  img: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8.5",
      cy: "8.5",
      r: "1.5"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "21 15 16 10 5 21"
    }))
  }),
  dl: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "15",
      x2: "12",
      y2: "3"
    })),
    s: 14
  }),
  chk: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    }),
    s: 12
  }),
  undo: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "1 4 1 10 7 10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
    })),
    s: 15
  }),
  redo: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "23 4 23 10 17 10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20.49 15a9 9 0 1 1-2.13-9.36L23 10"
    })),
    s: 15
  }),
  dice: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "2",
      width: "20",
      height: "20",
      rx: "3"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "8",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "8",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "16",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "16",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.2",
      fill: "currentColor",
      stroke: "none"
    }))
  }),
  copy: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "9",
      width: "13",
      height: "13",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
    })),
    s: 14
  }),
  plus: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    s: 14
  }),
  trash: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
      points: "3 6 5 6 21 6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
    })),
    s: 14
  }),
  upload: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 8 12 3 7 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "3",
      x2: "12",
      y2: "15"
    })),
    s: 14
  }),
  wand: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "m3 21 9-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 4V2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M15 16v-2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 9H6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 9h-2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m17.5 6.5 1.4-1.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m11.1 12.9 1.4-1.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m17.5 11.5 1.4 1.4"
    })),
    s: 14
  }),
  save: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 21 17 13 7 13 7 21"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 3 7 8 15 8"
    })),
    s: 14
  }),
  folder: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
    }),
    s: 14
  }),
  arrowL: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement("polyline", {
      points: "15 18 9 12 15 6"
    }),
    s: 14
  }),
  arrowR: /*#__PURE__*/React.createElement(Ic, {
    d: /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    }),
    s: 14
  })
};
const renderHL = (text, accent, textColor) => {
  const parts = (text || "").split(/(\{hl\}[\s\S]*?\{\/hl\})/);
  return parts.map((p, i) => {
    if (p.startsWith("{hl}")) {
      const inner = p.replace("{hl}", "").replace("{/hl}", "");
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          color: accent,
          fontWeight: 800
        }
      }, inner);
    }
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, p);
  });
};
const plainHL = t => (t || "").replace(/\{hl\}/g, "").replace(/\{\/hl\}/g, "");
// Canvas rounded-rectangle path (Electron's ctx.roundRect exists but we keep a portable helper)
const roundRectPath = (ctx, x, y, w, h, r) => {
  r = Math.min(r, h / 2, w / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

/* ══════════ TEXT MEASUREMENT & AUTO-FIT ══════════ */
const _mcanvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
const _mctx = _mcanvas ? _mcanvas.getContext("2d") : null;
const _measCache = new Map();
const measureTextWidth = (text, font) => {
  if (!_mctx || !text) return 0;
  const key = font + "\n" + text;
  const hit = _measCache.get(key);
  if (hit !== undefined) return hit;
  _mctx.font = font;
  const w = _mctx.measureText(text).width;
  if (_measCache.size > 6000) _measCache.clear();
  _measCache.set(key, w);
  return w;
};

/* CJK detection + kinsoku (避頭尾) punctuation rules */
const CJK_RE = /[぀-ヿ㐀-䶿一-鿿豈-﫿＀-￯　-〿]/;
const isCJKChar = ch => !!ch && CJK_RE.test(ch);
// Characters that must NOT begin a line (closing brackets / trailing punctuation)
const NO_LINE_START = "、。，．：；！？）｝」』】〕〉》”’》｠〙〗・ー々ぁぃぅぇぉっゃゅょゎ゛゜ヽヾ!),.:;?]}％‰°’”»";
// Characters that must NOT end a line (opening brackets / leading punctuation)
const NO_LINE_END = "（｛「『【〔〈《“‘《｟〘〖([{«";
// Runs of these ASCII chars stay glued together as one unbreakable token
const WORD_CH_RE = /[0-9A-Za-z@#&._%+‐‑/'’\-]/;

// Parse raw text (with optional {hl}…{/hl}) into typed segments
const parseHLSegments = text => {
  const segs = [];
  const re = /(\{hl\}[\s\S]*?\{\/hl\})/g;
  let last = 0,
    m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segs.push({
      text: text.slice(last, m.index),
      hl: false
    });
    segs.push({
      text: m[1].replace(/^\{hl\}/, "").replace(/\{\/hl\}$/, ""),
      hl: true
    });
    last = re.lastIndex;
  }
  if (last < text.length) segs.push({
    text: text.slice(last),
    hl: false
  });
  return segs;
};

// Serialize atoms back into a {hl}-tagged string
const atomsToHLString = atoms => {
  let out = "",
    inHL = false;
  for (const a of atoms) {
    if (a.hl && !inHL) {
      out += "{hl}";
      inHL = true;
    } else if (!a.hl && inHL) {
      out += "{/hl}";
      inHL = false;
    }
    out += a.ch;
  }
  if (inHL) out += "{/hl}";
  return out;
};
// Same, but drop whitespace atoms at the line edges first
const atomsToHLStringTrim = atoms => {
  let s = 0,
    e = atoms.length;
  while (s < e && atoms[s].ws) s++;
  while (e > s && atoms[e - 1].ws) e--;
  return atomsToHLString(atoms.slice(s, e));
};
// Break HL segments into layout atoms: CJK = one char each, ASCII words/numbers stay glued, whitespace runs grouped
const tokenizeToAtoms = segs => {
  const atoms = [];
  for (const s of segs) {
    const t = s.text;
    let i = 0;
    while (i < t.length) {
      const ch = t[i];
      if (/\s/.test(ch)) {
        let j = i + 1;
        while (j < t.length && /\s/.test(t[j])) j++;
        atoms.push({
          ch: t.slice(i, j),
          hl: s.hl,
          ws: true
        });
        i = j;
      } else if (WORD_CH_RE.test(ch)) {
        let j = i + 1;
        while (j < t.length && WORD_CH_RE.test(t[j])) j++;
        atoms.push({
          ch: t.slice(i, j),
          hl: s.hl,
          ws: false
        });
        i = j;
      } else {
        atoms.push({
          ch,
          hl: s.hl,
          ws: false
        });
        i++;
      }
    }
  }
  return atoms;
};
// Greedy pack atoms into lines (array of atom-arrays) given a max width
const packWithWidth = (atoms, maxWidth, font) => {
  const lines = [];
  let cur = [],
    curW = 0;
  for (const a of atoms) {
    if (a.ws && !cur.length) continue; // no leading whitespace
    const aw = measureTextWidth(a.ch, font);
    if (curW + aw > maxWidth && cur.length) {
      lines.push(cur);
      if (a.ws) {
        cur = [];
        curW = 0;
      } else {
        cur = [a];
        curW = aw;
      }
    } else {
      cur.push(a);
      curW += aw;
    }
  }
  if (cur.length) lines.push(cur);
  return lines.length ? lines : [atoms.slice()];
};
// Apply Japanese/Chinese kinsoku: no closer at line start, no opener at line end
const applyKinsoku = lines => {
  for (let i = 1; i < lines.length; i++) {
    let guard = 0;
    while (lines[i].length > 1 && guard++ < 6) {
      const c = lines[i][0].ch;
      if (c.length === 1 && NO_LINE_START.indexOf(c) >= 0) lines[i - 1].push(lines[i].shift());else break;
    }
  }
  for (let i = 0; i < lines.length - 1; i++) {
    let guard = 0;
    while (lines[i].length > 1 && guard++ < 6) {
      const c = lines[i][lines[i].length - 1].ch;
      if (c.length === 1 && NO_LINE_END.indexOf(c) >= 0) lines[i + 1].unshift(lines[i].pop());else break;
    }
  }
  return lines.filter(l => l.length);
};
// Balance ragged lines: minimise the longest line while keeping the same line count (text-wrap:balance)
const balanceAtoms = (atoms, maxWidth, font, targetLines) => {
  let lo = 0,
    hi = maxWidth,
    best = maxWidth;
  for (let it = 0; it < 16; it++) {
    const mid = (lo + hi) / 2;
    if (packWithWidth(atoms, mid, font).length <= targetLines) {
      best = mid;
      hi = mid;
    } else lo = mid;
  }
  return packWithWidth(atoms, best, font);
};

// Wrap a single raw line (may contain HL markers) to fit maxWidth; returns array of lines with HL preserved.
const wrapLineWithHL = (text, maxWidth, font) => {
  if (text == null) return [""];
  const plain = plainHL(text);
  if (!plain) return [text];
  if (measureTextWidth(plain, font) <= maxWidth) return [text];
  const atoms = tokenizeToAtoms(parseHLSegments(text));
  const lines = applyKinsoku(packWithWidth(atoms, maxWidth, font));
  const out = lines.map(atomsToHLStringTrim).filter(l => l !== "");
  return out.length ? out : [text];
};

// Wrap all raw lines (split by \n). balance=true evens ragged headline lines.
const wrapAllLines = (text, maxWidth, font, balance = false) => {
  const out = [];
  for (const rl of (text || "").split("\n")) {
    if (!rl) {
      out.push("");
      continue;
    }
    const plain = plainHL(rl);
    if (measureTextWidth(plain, font) <= maxWidth) {
      out.push(rl);
      continue;
    }
    const atoms = tokenizeToAtoms(parseHLSegments(rl));
    let lines = packWithWidth(atoms, maxWidth, font);
    if (balance && lines.length > 1) lines = balanceAtoms(atoms, maxWidth, font, lines.length);
    lines = applyKinsoku(lines);
    for (const l of lines) {
      const s = atomsToHLStringTrim(l);
      if (s !== "") out.push(s);
    }
  }
  return out.length ? out : [""];
};

// Shrink font until text fits in maxWidth (no wrap). Only looks at plain-text width per user-entered line.
const fitFontSize = (text, maxWidth, baseSize, fontFamily, fontWeight = "700", minSize = 10) => {
  if (!text || maxWidth <= 0) return baseSize;
  const rawLines = (text || "").split("\n").map(plainHL).filter(Boolean);
  if (!rawLines.length) return baseSize;
  let size = baseSize;
  for (let i = 0; i < 40; i++) {
    const font = `${fontWeight} ${size}px "${fontFamily}",sans-serif`;
    let maxW = 0;
    for (const l of rawLines) maxW = Math.max(maxW, measureTextWidth(l, font));
    if (maxW <= maxWidth || size <= minSize) break;
    const ratio = maxWidth / maxW;
    size = Math.max(minSize, Math.floor(size * Math.max(0.9, ratio * 0.98)));
  }
  return size;
};

// Fit multi-line wrappable text to fit both maxWidth and maxHeight. Returns {fontSize, lines (HL-preserved)}
const fitAndWrap = (text, maxWidth, maxHeight, baseSize, lineH, fontFamily, fontWeight = "400", minSize = 9) => {
  if (!text) return {
    fontSize: baseSize,
    lines: []
  };
  let size = baseSize;
  let lines = [];
  for (let i = 0; i < 30; i++) {
    const font = `${fontWeight} ${size}px "${fontFamily}",sans-serif`;
    lines = wrapAllLines(text, maxWidth, font);
    const totalH = lines.length * size * lineH;
    if (totalH <= maxHeight || size <= minSize) break;
    size = Math.max(minSize, Math.floor(size * 0.92));
  }
  return {
    fontSize: size,
    lines
  };
};

/* ══════════ COLOR / CONTRAST ══════════ */
const hexToRgb = hex => {
  if (typeof hex !== "string") return null;
  const s = hex.trim();
  const rgbm = s.match(/rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)/i);
  if (rgbm) return {
    r: Math.round(+rgbm[1]),
    g: Math.round(+rgbm[2]),
    b: Math.round(+rgbm[3])
  };
  let h = s.replace(/^#/, "");
  if (h.length === 3 || h.length === 4) h = h.slice(0, 3).split("").map(c => c + c).join(""); // #abc / #abcd → drop alpha
  if (h.length === 8) h = h.slice(0, 6); // #rrggbbaa → drop alpha
  if (h.length !== 6) return null;
  const n = parseInt(h, 16);
  if (isNaN(n)) return null;
  return {
    r: n >> 16 & 255,
    g: n >> 8 & 255,
    b: n & 255
  };
};
const firstColorOf = bg => {
  if (typeof bg !== "string") return "#000000";
  const m = bg.match(/#[0-9a-fA-F]{3,8}/);
  return m ? m[0] : "#000000";
};
const relLum = ({
  r,
  g,
  b
}) => {
  const f = c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrastRatio = (c1, c2) => {
  const a = hexToRgb(c1),
    b = hexToRgb(typeof c2 === "string" && c2[0] === "#" ? c2 : firstColorOf(c2));
  if (!a || !b) return 21;
  const l1 = relLum(a),
    l2 = relLum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
const bestTextColor = bg => {
  const c = hexToRgb(firstColorOf(bg));
  if (!c) return "#ffffff";
  return relLum(c) > 0.4 ? "#1a1a1a" : "#ffffff";
};

/* ══════════ AUTO-FIX TYPOGRAPHY ══════════ */
// Visual length of the longest line (CJK≈1, ASCII≈0.55)
const longestLineLen = text => {
  let mx = 0;
  for (const l of (text || "").split("\n")) {
    let len = 0;
    for (const ch of plainHL(l)) len += isCJKChar(ch) ? 1 : 0.55;
    if (len > mx) mx = len;
  }
  return mx;
};
// Pick a headline size that fills the canvas without overflowing (render still shrinks if needed)
const pickHeadSize = (text, isCover) => {
  const L = longestLineLen(text) || 1;
  const table = isCover ? [[4, 62], [6, 52], [9, 44], [13, 36], [18, 30], [24, 25]] : [[6, 34], [10, 28], [16, 24], [22, 20]];
  for (const [n, s] of table) if (L <= n) return s;
  return isCover ? 22 : 18;
};
const _normText = s => typeof s === "string" ? s.replace(/[ \t　]+\n/g, "\n").replace(/\n[ \t　]+/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ").replace(/^\s+|\s+$/g, "") : s;
// Pure function: returns a patch of props that fixes spacing, contrast and sizing for one page
const autoFixPage = p => {
  const out = {};
  if (typeof p.headline === "string") out.headline = _normText(p.headline);
  if (typeof p.subtitle === "string") out.subtitle = _normText(p.subtitle);
  if (typeof p.bodyText === "string") out.bodyText = _normText(p.bodyText);
  if (typeof p.topLabel === "string") out.topLabel = _normText(p.topLabel);
  if (typeof p.bottomTag === "string") out.bottomTag = _normText(p.bottomTag);
  if (Array.isArray(p.listItems)) {
    const items = p.listItems.map(x => typeof x === "string" ? x.replace(/\s+/g, " ").trim() : x).filter(x => x !== "");
    out.listItems = items.length ? items : p.listItems;
  }
  // Contrast: only override text colour when it is genuinely hard to read
  if (contrastRatio(p.textColor, p.bgColor) < 3.2) out.textColor = bestTextColor(p.bgColor);
  // Size to fill
  const isCover = (p.pageType || "cover") === "cover";
  const headText = out.headline !== undefined ? out.headline : p.headline;
  if (typeof headText === "string" && headText.trim()) out.headSize = pickHeadSize(headText, isCover);
  if (!isCover && (p.pageType === "img-top" || p.pageType === "text-top" || p.pageType === "side-lr" || p.pageType === "side-rl")) {
    const bl = longestLineLen(out.bodyText !== undefined ? out.bodyText : p.bodyText);
    out.bodySize = bl > 26 ? 13 : bl > 16 ? 14 : 16;
  }
  return out;
};

/* ══════════ STORAGE ══════════ */
const STORAGE_KEY = "typo-studio-data";
function saveToStorage(data) {
  const build = keepImg => JSON.stringify({
    pages: data.pages.map(p => ({
      ...p,
      _imgEl: undefined,
      imgData: keepImg ? p.imgData || null : null
    })),
    curIdx: data.curIdx,
    ratioId: data.ratioId
  });
  try {
    localStorage.setItem(STORAGE_KEY, build(true));
  } catch (e) {
    // Quota exceeded (embedded images are large) — persist layout without images
    // rather than silently truncating base64 into a corrupt image.
    try {
      localStorage.setItem(STORAGE_KEY, build(false));
    } catch (_) {}
  }
}
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/* ══════════ UI PIECES (outside App to avoid remount on re-render) ══════════ */
const Sec = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "sec-title"
}, children);
const Sld = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  sfx = ""
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 16
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "field-label",
  style: {
    marginBottom: 0
  }
}, label), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 11,
    color: "#7070a0",
    fontFamily: "'Space Mono',monospace",
    fontWeight: 600
  }
}, typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value, sfx)), /*#__PURE__*/React.createElement("input", {
  type: "range",
  min: min,
  max: max,
  step: step,
  value: value,
  onChange: onChange,
  style: {
    width: "100%",
    height: 2,
    appearance: "none",
    background: "#2a2a38",
    borderRadius: 1,
    outline: "none",
    cursor: "pointer"
  }
}));

/* IME-safe input hook */
const useIMEInput = (value, onChange) => {
  const [local, setLocal] = useState(value);
  const composingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const elRef = useRef(null);
  useEffect(() => {
    if (!composingRef.current && elRef.current !== document.activeElement) {
      setLocal(value);
    }
  }, [value]);
  const handleChange = useCallback(e => {
    const v = e.target.value;
    setLocal(v);
    if (!composingRef.current) onChangeRef.current(v);
  }, []);
  const handleCompositionStart = useCallback(() => {
    composingRef.current = true;
  }, []);
  const handleCompositionEnd = useCallback(e => {
    composingRef.current = false;
    const v = e.target.value;
    setLocal(v);
    onChangeRef.current(v);
  }, []);
  return {
    value: local,
    onChange: handleChange,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    ref: elRef
  };
};
const Field = ({
  label,
  value,
  onChange,
  rows = 1,
  placeholder = ""
}) => {
  const bind = useIMEInput(value, onChange);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, label), rows > 1 ? /*#__PURE__*/React.createElement("textarea", _extends({}, bind, {
    rows: rows,
    placeholder: placeholder,
    className: "field-input",
    style: {
      resize: "none"
    }
  })) : /*#__PURE__*/React.createElement("input", _extends({
    type: "text"
  }, bind, {
    placeholder: placeholder,
    className: "field-input"
  })));
};
const ListItemInput = ({
  value,
  onChange
}) => {
  const bind = useIMEInput(value, onChange);
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "text"
  }, bind, {
    className: "field-input",
    style: {
      flex: 1,
      padding: "8px 12px"
    }
  }));
};

/* ══════════ APP ══════════ */
function App() {
  const saved = useMemo(() => loadFromStorage(), []);
  const [pages, setPages] = useState(saved?.pages || [makePage("cover", COVER_PRESETS[0])]);
  const [curIdx, setCurIdx] = useState(saved?.curIdx || 0);
  const [tab, setTab] = useState("presets");
  const [openCat, setOpenCat] = useState(null);
  const [ratio, setRatio] = useState(RATIOS.find(r => r.id === saved?.ratioId) || RATIOS[0]);
  const [copied, setCopied] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [exportFmt, setExportFmt] = useState("png");
  const fileRef = useRef(null);
  const addBtnRef = useRef(null);
  const projFileRef = useRef(null);
  const toastTimerRef = useRef(null);
  const kbRef = useRef({});
  const showToast = useCallback(msg => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 1800);
  }, []);

  /* ── Current page as independent state (avoids full re-render on typing) ── */
  const [P, setCurrentPage] = useState(pages[curIdx] || pages[0]);
  const totalPages = pages.length;

  // sync P back into pages array (debounced — only needed for save/export/thumbnails, NOT for preview)
  const syncTimerRef = useRef(null);
  const syncPToPages = useCallback(pageData => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      setPages(prev => {
        const n = [...prev];
        n[curIdx] = {
          ...pageData
        };
        return n;
      });
    }, 1500);
  }, [curIdx]);

  // when switching pages, flush current P into pages and load new page
  const switchPage = newIdx => {
    // flush current P immediately
    setPages(prev => {
      const n = [...prev];
      n[curIdx] = {
        ...P
      };
      return n;
    });
    setCurIdx(newIdx);
    setCurrentPage(pages[newIdx] || pages[0]);
  };

  // when pages change externally (undo, add, delete), sync P
  const prevPagesRef = useRef(pages);
  useEffect(() => {
    if (prevPagesRef.current !== pages) {
      // clamp curIdx so undo/redo/delete that shrinks the array never leaves it out of range
      const ci = Math.min(curIdx, pages.length - 1);
      if (ci !== curIdx) setCurIdx(ci);
      if (pages[ci]) setCurrentPage(pages[ci]);
    }
    prevPagesRef.current = pages;
  }, [pages, curIdx]);

  /* auto-save — debounced */
  const saveTimerRef = useRef(null);
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      // flush P into pages for save
      const savPages = [...pages];
      savPages[curIdx] = {
        ...P
      };
      saveToStorage({
        pages: savPages,
        curIdx,
        ratioId: ratio.id
      });
    }, 1000);
    return () => clearTimeout(saveTimerRef.current);
  }, [P, curIdx, ratio]);

  /* undo — ref-based */
  const histRef = useRef({
    stack: [],
    idx: -1
  });
  const histTimerRef = useRef(null);
  const pushHistoryNow = pagesSnap => {
    const h = histRef.current;
    h.stack = h.stack.slice(0, h.idx + 1);
    h.stack.push(JSON.parse(JSON.stringify(pagesSnap)));
    if (h.stack.length > 40) h.stack.shift();
    h.idx = h.stack.length - 1;
  };
  const debouncedPushHistory = () => {
    if (histTimerRef.current) clearTimeout(histTimerRef.current);
    histTimerRef.current = setTimeout(() => {
      const snap = [...pages];
      snap[curIdx] = {
        ...P
      };
      pushHistoryNow(snap);
    }, 1000);
  };
  const undo = () => {
    if (histTimerRef.current) {
      clearTimeout(histTimerRef.current);
      histTimerRef.current = null;
    }
    const h = histRef.current;
    if (h.idx > 0) {
      h.idx--;
      const p = JSON.parse(JSON.stringify(h.stack[h.idx]));
      setPages(p);
    }
  };
  const redo = () => {
    const h = histRef.current;
    if (h.idx < h.stack.length - 1) {
      h.idx++;
      const p = JSON.parse(JSON.stringify(h.stack[h.idx]));
      setPages(p);
    }
  };
  useEffect(() => {
    if (histRef.current.stack.length === 0) pushHistoryNow(pages);
  }, []);

  /* ── set/setMulti only update P (fast, no pages array copy) ── */
  const set = (k, v) => {
    setCurrentPage(prev => {
      const n = {
        ...prev,
        [k]: v
      };
      syncPToPages(n);
      debouncedPushHistory();
      return n;
    });
  };
  const setMulti = obj => {
    setCurrentPage(prev => {
      const n = {
        ...prev,
        ...obj
      };
      syncPToPages(n);
      debouncedPushHistory();
      return n;
    });
  };
  useEffect(() => {
    const f = GFONTS.map(f => f.replace(/ /g, "+")).join("&family=");
    const l = document.createElement("link");
    l.href = `https://fonts.googleapis.com/css2?family=${f}:wght@100;300;400;500;700;800;900&display=swap`;
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);

  /* keyboard shortcuts — skip during IME composition */
  useEffect(() => {
    const handler = e => {
      if (e.isComposing || e.keyCode === 229) return;
      const k = kbRef.current;
      const tag = e.target && e.target.tagName || "";
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z") && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || e.key === "Y" || (e.key === "z" || e.key === "Z") && e.shiftKey)) {
        e.preventDefault();
        redo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "D")) {
        e.preventDefault();
        k.duplicatePage && k.duplicatePage(k.curIdx);
        return;
      }
      if (!typing && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const ni = k.curIdx + (e.key === "ArrowLeft" ? -1 : 1);
        if (ni >= 0 && ni < k.total) {
          e.preventDefault();
          k.switchPage && k.switchPage(ni);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* click outside add menu */
  useEffect(() => {
    if (!showAddMenu) return;
    const h = e => {
      if (addBtnRef.current && !addBtnRef.current.contains(e.target)) setShowAddMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showAddMenu]);
  const addPage = (type, base = {}) => {
    // flush current P first
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const np = makePage(type, {
      accent: P.accent,
      bgColor: P.bgColor,
      textColor: P.textColor,
      fontHead: P.fontHead,
      fontBody: P.fontBody,
      ...base
    });
    const newPages = [...flushed, np];
    setPages(newPages);
    setCurIdx(newPages.length - 1);
    setCurrentPage(np);
    setTab("presets");
    setShowAddMenu(false);
    pushHistoryNow(newPages);
  };
  const deletePage = idx => {
    if (pages.length <= 1) return;
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const newPages = flushed.filter((_, i) => i !== idx);
    const newIdx = curIdx >= idx ? Math.max(0, curIdx - 1) : curIdx;
    setPages(newPages);
    setCurIdx(newIdx);
    setCurrentPage(newPages[newIdx]);
    pushHistoryNow(newPages);
  };
  const duplicatePage = idx => {
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const cp = {
      ...flushed[idx],
      id: Date.now() + Math.random()
    };
    const newPages = [...flushed];
    newPages.splice(idx + 1, 0, cp);
    setPages(newPages);
    setCurIdx(idx + 1);
    setCurrentPage(cp);
    pushHistoryNow(newPages);
  };
  const randomColor = () => {
    const c = COLOR_COMBOS[Math.floor(Math.random() * COLOR_COMBOS.length)];
    setMulti(c);
  };

  /* ── auto-fix typography ── */
  const autoFixCurrent = () => {
    setMulti(autoFixPage(P));
    showToast("已自動修正本頁排版");
  };
  const autoFixAll = () => {
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const fixed = flushed.map(pg => ({
      ...pg,
      ...autoFixPage(pg)
    }));
    setPages(fixed);
    setCurrentPage(fixed[curIdx]);
    pushHistoryNow(fixed);
    showToast("已自動修正全部 " + fixed.length + " 頁");
  };

  /* ── reorder pages ── */
  const movePage = dir => {
    const j = curIdx + dir;
    if (j < 0 || j >= pages.length) return;
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const [m] = flushed.splice(curIdx, 1);
    flushed.splice(j, 0, m);
    setPages(flushed);
    setCurIdx(j);
    setCurrentPage(flushed[j]);
    pushHistoryNow(flushed);
  };

  /* ── project import / export (full carousel as JSON) ── */
  const exportProject = () => {
    const flushed = [...pages];
    flushed[curIdx] = {
      ...P
    };
    const data = {
      app: "typo-studio",
      version: 2,
      ratioId: ratio.id,
      pages: flushed.map(pg => ({
        ...pg,
        _imgEl: undefined
      }))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = `typo-project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(u);
    showToast("已匯出專案 JSON");
  };
  const importProject = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data || !Array.isArray(data.pages) || !data.pages.length) throw new Error("bad");
        const np = data.pages.map(pg => {
          const pt = pg && pg.pageType || "cover";
          return makePage(pt, {
            ...pg,
            pageType: pt
          });
        });
        setPages(np);
        setCurIdx(0);
        setCurrentPage(np[0]);
        const r = RATIOS.find(x => x.id === data.ratioId);
        if (r) setRatio(r);
        pushHistoryNow(np);
        showToast("已匯入專案（" + np.length + " 頁）");
      } catch (_) {
        showToast("匯入失敗：檔案格式不符");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const handleImageUpload = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => set("imgData", ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };
  const handleDrop = e => {
    e.preventDefault();
    e.currentTarget.classList.remove("dragging");
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = ev => set("imgData", ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ══════════ PREVIEW ══════════ */
  const Preview = ({
    size = 340,
    data = null,
    aspectRatio = null,
    interactive = false,
    showPageIndicator = false,
    pageIndex = 0
  }) => {
    const p = data || P;
    const r = aspectRatio || ratio;
    const w = size;
    const h = size * (r.h / r.w);
    const sc = size / 340;
    const pt = p.pageType || "cover";
    const bgStyle = {
      width: w,
      height: h,
      background: p.bgColor,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    };
    const ImgArea = ({
      style
    }) => {
      const base = {
        background: p.imgData ? `url(${p.imgData}) center/cover no-repeat` : p.imgColor || "#222230",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      };
      if (interactive) {
        return /*#__PURE__*/React.createElement("div", {
          className: "drop-zone",
          style: base,
          onDragOver: e => {
            e.preventDefault();
            e.currentTarget.classList.add("dragging");
          },
          onDragLeave: e => e.currentTarget.classList.remove("dragging"),
          onDrop: handleDrop,
          onClick: () => fileRef.current?.click()
        }, !p.imgData && /*#__PURE__*/React.createElement("div", {
          style: {
            color: p.accent,
            opacity: 0.35,
            fontSize: 11 * sc,
            textAlign: "center",
            fontFamily: "'Space Mono',monospace",
            cursor: "pointer",
            userSelect: "none"
          }
        }, /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 28 * sc,
            marginBottom: 4 * sc,
            lineHeight: 1
          }
        }, "+"), /*#__PURE__*/React.createElement("div", null, "\u4E0A\u50B3\u5716\u7247")));
      }
      return /*#__PURE__*/React.createElement("div", {
        style: base
      });
    };
    const Decos = () => {
      if (pt !== "cover") return null;
      return /*#__PURE__*/React.createElement(React.Fragment, null, p.decoStyle === "line" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: w * 0.08,
          top: h * 0.06,
          width: w * 0.12,
          height: Math.max(1, w * 0.006),
          background: p.accent,
          opacity: 0.6
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          right: w * 0.08,
          bottom: h * 0.06,
          width: w * 0.12,
          height: Math.max(1, w * 0.006),
          background: p.accent,
          opacity: 0.6
        }
      })), p.decoStyle === "dot" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: w * 0.08,
          top: h * 0.06,
          width: w * 0.024,
          height: w * 0.024,
          borderRadius: "50%",
          background: p.accent,
          opacity: 0.5
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          right: w * 0.08,
          bottom: h * 0.06,
          width: w * 0.024,
          height: w * 0.024,
          borderRadius: "50%",
          background: p.accent,
          opacity: 0.5
        }
      })), p.decoStyle === "bracket" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: w * 0.06,
          top: h * 0.05,
          width: w * 0.06,
          height: w * 0.06,
          borderLeft: `${Math.max(1, w * 0.005)}px solid ${p.accent}`,
          borderTop: `${Math.max(1, w * 0.005)}px solid ${p.accent}`,
          opacity: 0.4
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          right: w * 0.06,
          bottom: h * 0.05,
          width: w * 0.06,
          height: w * 0.06,
          borderRight: `${Math.max(1, w * 0.005)}px solid ${p.accent}`,
          borderBottom: `${Math.max(1, w * 0.005)}px solid ${p.accent}`,
          opacity: 0.4
        }
      })), p.decoStyle === "frame" && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          inset: w * 0.06,
          border: `${Math.max(1, w * 0.004)}px solid ${p.accent}`,
          opacity: 0.2,
          borderRadius: w * 0.01
        }
      }), p.decoStyle === "grid" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: h * 0.05,
          bottom: h * 0.05,
          width: Math.max(1, w * 0.003),
          background: p.accent,
          opacity: 0.06
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: "50%",
          left: w * 0.05,
          right: w * 0.05,
          height: Math.max(1, w * 0.003),
          background: p.accent,
          opacity: 0.06
        }
      })), p.decoStyle === "diagonal" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          width: w * 0.4,
          height: w * 0.4,
          background: `linear-gradient(135deg,${p.accent}08,transparent)`,
          borderRadius: `0 0 0 ${w}px`
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: w * 0.3,
          height: w * 0.3,
          background: `linear-gradient(315deg,${p.accent}08,transparent)`,
          borderRadius: `0 ${w}px 0 0`
        }
      })), p.decoStyle === "corners" && (() => {
        const bw = Math.max(1, w * 0.005),
          s = w * 0.05,
          ox = w * 0.06,
          oy = h * 0.05;
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          style: {
            position: "absolute",
            left: ox,
            top: oy,
            width: s,
            height: s,
            borderLeft: `${bw}px solid ${p.accent}`,
            borderTop: `${bw}px solid ${p.accent}`,
            opacity: 0.5
          }
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            position: "absolute",
            right: ox,
            top: oy,
            width: s,
            height: s,
            borderRight: `${bw}px solid ${p.accent}`,
            borderTop: `${bw}px solid ${p.accent}`,
            opacity: 0.5
          }
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            position: "absolute",
            left: ox,
            bottom: oy,
            width: s,
            height: s,
            borderLeft: `${bw}px solid ${p.accent}`,
            borderBottom: `${bw}px solid ${p.accent}`,
            opacity: 0.5
          }
        }), /*#__PURE__*/React.createElement("div", {
          style: {
            position: "absolute",
            right: ox,
            bottom: oy,
            width: s,
            height: s,
            borderRight: `${bw}px solid ${p.accent}`,
            borderBottom: `${bw}px solid ${p.accent}`,
            opacity: 0.5
          }
        }));
      })());
    };
    const PageNum = () => {
      if (!showPageIndicator || !p.showPageNum) return null;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: h * 0.04,
          right: w * 0.06,
          fontSize: 10 * sc,
          color: p.textColor,
          opacity: 0.3,
          fontFamily: "'Space Mono',monospace",
          fontWeight: 600,
          letterSpacing: 1 * sc
        }
      }, pageIndex + 1, "/", totalPages);
    };
    if (pt === "cover") {
      const isNumLeft = p.layout === "number-left" && p.bigNumber;
      const pad = w * 0.1;
      // estimate big number width (character-aspect ≈ 0.55 for digits)
      const numPx = (p.numSize || 120) * sc;
      const numApproxW = isNumLeft ? (String(p.bigNumber || "").length || 1) * numPx * 0.58 : 0;
      const gapPx = isNumLeft ? w * 0.03 : 0;
      const availHeadW = Math.max(40, w - pad * 2 - numApproxW - gapPx);
      // auto-fit headline
      const baseHead = (p.headSize || 40) * sc;
      const effHead = fitFontSize(p.headline, availHeadW, baseHead, p.fontHead, "700", Math.max(10, 12 * sc));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, availHeadW, headFont, true);
      // auto-fit subtitle / top label
      const baseSub = (p.subSize || 14) * sc;
      const effSub = fitFontSize(p.subtitle, availHeadW, baseSub, p.fontBody, "400", Math.max(8, 9 * sc));
      const baseTop = (p.topSize || 12) * sc;
      const effTop = fitFontSize(p.topLabel, availHeadW, baseTop, p.fontBody, "700", Math.max(7, 8 * sc));
      return /*#__PURE__*/React.createElement("div", {
        style: bgStyle
      }, /*#__PURE__*/React.createElement(Decos, null), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: pad,
          display: "flex",
          flexDirection: isNumLeft ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: gapPx,
          textAlign: isNumLeft ? "left" : "center",
          minWidth: 0
        }
      }, p.topLabel && !isNumLeft && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: effTop,
          fontFamily: `"${p.fontBody}",sans-serif`,
          color: p.accent,
          fontWeight: 700,
          letterSpacing: 4 * sc,
          textTransform: "uppercase",
          marginBottom: h * 0.03
        }
      }, p.topLabel), isNumLeft && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: numPx,
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontWeight: 900,
          color: p.accent,
          lineHeight: 0.9,
          flexShrink: 0,
          textShadow: `0 0 ${40 * sc}px ${p.accent}30`
        }
      }, p.bigNumber), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 0,
          minWidth: 0,
          flex: isNumLeft ? 1 : undefined
        }
      }, isNumLeft && p.topLabel && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: effTop,
          fontFamily: `"${p.fontBody}",sans-serif`,
          color: p.accent,
          fontWeight: 700,
          letterSpacing: 4 * sc,
          textTransform: "uppercase",
          marginBottom: h * 0.015
        }
      }, p.topLabel), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 700,
          color: p.textColor,
          lineHeight: 1.35,
          letterSpacing: 2 * sc,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((line, li) => /*#__PURE__*/React.createElement("div", {
        key: li
      }, renderHL(line, p.accent, p.textColor)))), p.subtitle && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: effSub,
          fontFamily: `"${p.fontBody}",sans-serif`,
          color: p.textColor,
          opacity: 0.5,
          marginTop: h * 0.025,
          letterSpacing: 2 * sc,
          fontWeight: 400,
          wordBreak: "break-word"
        }
      }, p.subtitle))), p.bottomTag && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: h * 0.05,
          left: w * 0.06,
          right: w * 0.06,
          textAlign: "center",
          fontSize: 9 * sc,
          fontFamily: "'Space Mono',monospace",
          color: p.accent,
          letterSpacing: 3 * sc,
          opacity: 0.4,
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, p.bottomTag), /*#__PURE__*/React.createElement(PageNum, null));
    }
    if (pt === "img-top" || pt === "text-top") {
      const imgH = h * 0.48;
      const padH = w * 0.08,
        padV = w * 0.06;
      const txtW = Math.max(40, w - padH * 2);
      const txtH = Math.max(20, h - imgH - padV * 2);
      const baseHead = (p.headSize || 26) * sc;
      const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(10, 12 * sc));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, txtW, headFont, true);
      const headBlockH = headLines.length * effHead * 1.4 + 8 * sc;
      const baseBody = (p.bodySize || 15) * sc;
      const bodyRes = fitAndWrap(p.bodyText, txtW, Math.max(0, txtH - headBlockH), baseBody, 1.7, p.fontBody, "400", Math.max(9, 10 * sc));
      const textBlock = /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: `${padV}px ${padH}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 700,
          color: p.textColor,
          lineHeight: 1.4,
          marginBottom: 8 * sc,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))), p.bodyText && /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontBody}",sans-serif`,
          fontSize: bodyRes.fontSize,
          color: p.textColor,
          opacity: 0.7,
          lineHeight: 1.7,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, bodyRes.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))));
      const imgBlock = /*#__PURE__*/React.createElement(ImgArea, {
        style: {
          width: "100%",
          height: imgH,
          flexShrink: 0
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        style: bgStyle
      }, pt === "img-top" ? /*#__PURE__*/React.createElement(React.Fragment, null, imgBlock, textBlock) : /*#__PURE__*/React.createElement(React.Fragment, null, textBlock, imgBlock), /*#__PURE__*/React.createElement(PageNum, null));
    }
    if (pt === "side-lr" || pt === "side-rl") {
      const imgW = w * 0.45;
      const pad = w * 0.06;
      const txtW = Math.max(30, w - imgW - pad * 2);
      const txtH = Math.max(20, h - pad * 2);
      const baseHead = (p.headSize || 24) * sc;
      const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(9, 11 * sc));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, txtW, headFont, true);
      const headBlockH = headLines.length * effHead * 1.4 + 8 * sc;
      const baseBody = (p.bodySize || 14) * sc;
      const bodyRes = fitAndWrap(p.bodyText, txtW, Math.max(0, txtH - headBlockH), baseBody, 1.7, p.fontBody, "400", Math.max(8, 10 * sc));
      const textBlock = /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: `${pad}px ${pad}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 700,
          color: p.textColor,
          lineHeight: 1.4,
          marginBottom: 8 * sc,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))), p.bodyText && /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontBody}",sans-serif`,
          fontSize: bodyRes.fontSize,
          color: p.textColor,
          opacity: 0.7,
          lineHeight: 1.7,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, bodyRes.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))));
      const imgBlock = /*#__PURE__*/React.createElement(ImgArea, {
        style: {
          width: imgW,
          height: "100%",
          flexShrink: 0
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        style: {
          ...bgStyle,
          flexDirection: "row"
        }
      }, pt === "side-lr" ? /*#__PURE__*/React.createElement(React.Fragment, null, imgBlock, textBlock) : /*#__PURE__*/React.createElement(React.Fragment, null, textBlock, imgBlock), /*#__PURE__*/React.createElement(PageNum, null));
    }
    if (pt === "list") {
      const items = p.listItems || [];
      const isDarkBg = !p.bgColor?.includes?.("f5f0e8") && !p.bgColor?.includes?.("fafaf5");
      const pad = w * 0.08;
      const txtW = Math.max(40, w - pad * 2);
      const bulletSize = 24 * sc,
        bulletGap = 10 * sc;
      const itemTxtW = Math.max(20, txtW - bulletSize - bulletGap);
      const baseHead = (p.headSize || 26) * sc;
      const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(10, 12 * sc));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, txtW, headFont, true);
      const headH = headLines.length * effHead * 1.4 + 16 * sc;
      const itemSpace = Math.max(20, h - pad * 2 - headH);
      // shrink items until total fits
      const baseItem = (p.bodySize || 15) * sc;
      const minItem = Math.max(8, 10 * sc);
      let itemSize = baseItem;
      let wrappedItems = [];
      for (let it = 0; it < 20; it++) {
        const itFont = `400 ${itemSize}px "${p.fontBody}",sans-serif`;
        wrappedItems = items.map(item => wrapLineWithHL(item, itemTxtW, itFont));
        let totalH = 0;
        for (const lines of wrappedItems) {
          totalH += Math.max(bulletSize, lines.length * itemSize * 1.6) + 10 * sc;
        }
        if (totalH <= itemSpace || itemSize <= minItem) break;
        itemSize = Math.max(minItem, Math.floor(itemSize * 0.93));
      }
      return /*#__PURE__*/React.createElement("div", {
        style: bgStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: `${pad}px ${pad}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 700,
          color: p.textColor,
          lineHeight: 1.4,
          marginBottom: 16 * sc,
          textAlign: "center",
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10 * sc
        }
      }, wrappedItems.map((lines, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: bulletGap,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: bulletSize,
          height: bulletSize,
          borderRadius: p.listStyle === "bullet" ? "50%" : 4 * sc,
          background: p.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12 * sc,
          fontWeight: 800,
          color: isDarkBg ? "#000" : "#fff",
          fontFamily: "'Space Mono',monospace",
          flexShrink: 0,
          marginTop: 2 * sc
        }
      }, p.listStyle === "number" ? i + 1 : ""), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0,
          fontFamily: `"${p.fontBody}",sans-serif`,
          fontSize: itemSize,
          color: p.textColor,
          lineHeight: 1.6,
          opacity: 0.85,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, lines.map((l, j) => /*#__PURE__*/React.createElement("div", {
        key: j
      }, renderHL(l, p.accent, p.textColor)))))))), /*#__PURE__*/React.createElement(PageNum, null));
    }
    if (pt === "quote") {
      const pad = w * 0.12;
      const availW = Math.max(40, w - pad * 2);
      const baseHead = (p.headSize || 44) * sc;
      const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "700", Math.max(12, 14 * sc));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, availW, headFont, true);
      const baseSub = (p.subSize || 14) * sc;
      const effSub = fitFontSize(p.subtitle, availW, baseSub, p.fontBody, "600", Math.max(8, 10 * sc));
      return /*#__PURE__*/React.createElement("div", {
        style: bgStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: pad,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",serif`,
          fontSize: 62 * sc,
          lineHeight: 0.6,
          color: p.accent,
          opacity: 0.85,
          marginBottom: 14 * sc,
          fontWeight: 800
        }
      }, "\u201C"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 700,
          color: p.textColor,
          lineHeight: 1.5,
          letterSpacing: 1 * sc,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))), p.subtitle && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: w * 0.1,
          height: Math.max(1, w * 0.005),
          background: p.accent,
          opacity: 0.6,
          margin: `${h * 0.035}px 0 ${h * 0.018}px`
        }
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: effSub,
          fontFamily: `"${p.fontBody}",sans-serif`,
          color: p.accent,
          fontWeight: 600,
          letterSpacing: 2 * sc,
          opacity: 0.9
        }
      }, p.subtitle))), p.bottomTag && /*#__PURE__*/React.createElement("div", {
        style: {
          position: "absolute",
          bottom: h * 0.05,
          left: w * 0.06,
          right: w * 0.06,
          textAlign: "center",
          fontSize: 9 * sc,
          fontFamily: "'Space Mono',monospace",
          color: p.accent,
          letterSpacing: 3 * sc,
          opacity: 0.4,
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, p.bottomTag), /*#__PURE__*/React.createElement(PageNum, null));
    }
    if (pt === "cta") {
      const pad = w * 0.1;
      const availW = Math.max(40, w - pad * 2);
      const baseHead = (p.headSize || 34) * sc;
      const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "800", Math.max(12, 14 * sc));
      const headFont = `800 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, availW, headFont, true);
      const chips = (p.listItems || []).filter(c => c && c.trim()).slice(0, 4);
      const baseTop = (p.topSize || 13) * sc;
      const effTop = fitFontSize(p.topLabel, availW, baseTop, p.fontBody, "700", Math.max(8, 9 * sc));
      const bw = Math.max(1, w * 0.004);
      return /*#__PURE__*/React.createElement("div", {
        style: bgStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          padding: pad,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: h * 0.022,
          minWidth: 0
        }
      }, p.topLabel && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: effTop,
          color: p.accent,
          fontWeight: 700,
          letterSpacing: 4 * sc,
          textTransform: "uppercase",
          fontFamily: `"${p.fontBody}",sans-serif`
        }
      }, p.topLabel), /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: `"${p.fontHead}",sans-serif`,
          fontSize: effHead,
          fontWeight: 800,
          color: p.textColor,
          lineHeight: 1.3,
          letterSpacing: 1 * sc,
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }, headLines.map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: i
      }, renderHL(l, p.accent, p.textColor)))), chips.length > 0 && /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: 7 * sc,
          justifyContent: "center",
          marginTop: h * 0.012
        }
      }, chips.map((c, i) => /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          border: `${bw}px solid ${p.accent}`,
          color: p.accent,
          borderRadius: 999,
          padding: `${5 * sc}px ${13 * sc}px`,
          fontSize: 12 * sc,
          fontWeight: 700,
          fontFamily: `"${p.fontBody}",sans-serif`,
          whiteSpace: "nowrap"
        }
      }, c))), p.bottomTag && /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: h * 0.028,
          fontSize: 15 * sc,
          color: p.accent,
          fontWeight: 800,
          fontFamily: "'Space Mono',monospace",
          letterSpacing: 1 * sc
        }
      }, p.bottomTag)), /*#__PURE__*/React.createElement(PageNum, null));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: bgStyle
    });
  };

  /* ══════════ CANVAS EXPORT ══════════ */
  // Canvas uses "display units" where 340 = base preview width. Multiply font sizes by S = W/340.
  const drawHLLine = (ctx, p, rawLine, x, y, align, fontSize, fontFamily, weight) => {
    const sz = fontSize || p.headSize;
    const ff = fontFamily || p.fontHead;
    const wt = weight || 700;
    // Parse line into HL-tagged segments
    const segs = [];
    const re = /(\{hl\}[\s\S]*?\{\/hl\})/g;
    let last = 0,
      m;
    while ((m = re.exec(rawLine)) !== null) {
      if (m.index > last) segs.push({
        text: rawLine.slice(last, m.index),
        hl: false
      });
      segs.push({
        text: m[1].replace(/^\{hl\}/, "").replace(/\{\/hl\}$/, ""),
        hl: true
      });
      last = re.lastIndex;
    }
    if (last < rawLine.length) segs.push({
      text: rawLine.slice(last),
      hl: false
    });
    // Measure total width for alignment
    let totalW = 0;
    for (const s of segs) {
      ctx.font = `${s.hl ? 800 : wt} ${sz}px "${ff}",sans-serif`;
      totalW += ctx.measureText(s.text).width;
    }
    const prev = ctx.textAlign;
    ctx.textAlign = "left";
    let cx = align === "center" ? x - totalW / 2 : align === "right" ? x - totalW : x;
    for (const s of segs) {
      ctx.font = `${s.hl ? 800 : wt} ${sz}px "${ff}",sans-serif`;
      ctx.fillStyle = s.hl ? p.accent : p.textColor;
      ctx.fillText(s.text, cx, y);
      cx += ctx.measureText(s.text).width;
    }
    ctx.textAlign = prev;
  };
  const drawImgArea = (ctx, p, x, y, w, h) => {
    if (p._imgEl) {
      const img = p._imgEl;
      const ar = img.width / img.height;
      const tr = w / h;
      let sw, sh, sx, sy;
      if (ar > tr) {
        sh = img.height;
        sw = sh * tr;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / tr;
        sy = (img.height - sh) / 2;
        sx = 0;
      }
      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    } else {
      ctx.fillStyle = p.imgColor || "#222230";
      ctx.fillRect(x, y, w, h);
    }
  };
  const renderToCanvas = (pageData, r, pgIdx, scale = 3) => {
    const p = pageData;
    const pt = p.pageType || "cover";
    const W = 1080;
    const H = Math.round(1080 * (r.h / r.w));
    const c = document.createElement("canvas");
    c.width = W * scale;
    c.height = H * scale;
    const ctx = c.getContext("2d");
    ctx.scale(scale, scale);
    const bg = p.bgColor;
    if (bg.startsWith("linear")) {
      const am = bg.match(/(\d+)deg/);
      const a = am ? +am[1] : 135;
      const rd = (a - 90) * Math.PI / 180;
      const g = ctx.createLinearGradient(W / 2 - Math.cos(rd) * W / 2, H / 2 - Math.sin(rd) * H / 2, W / 2 + Math.cos(rd) * W / 2, H / 2 + Math.sin(rd) * H / 2);
      const cols = bg.match(/#[a-fA-F0-9]{3,8}/g) || [];
      cols.forEach((cl, i) => g.addColorStop(i / (cols.length - 1), cl));
      ctx.fillStyle = g;
    } else ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    return new Promise(resolve => {
      const draw = () => {
        if (pt === "cover") drawCover(ctx, p, W, H);else if (pt === "img-top" || pt === "text-top") drawImgText(ctx, p, W, H, pt);else if (pt === "side-lr" || pt === "side-rl") drawSide(ctx, p, W, H, pt);else if (pt === "list") drawList(ctx, p, W, H);else if (pt === "quote") drawQuote(ctx, p, W, H);else if (pt === "cta") drawCta(ctx, p, W, H);
        if (p.showPageNum) {
          const S = W / 340;
          ctx.font = `600 ${10 * S}px "Space Mono",monospace`;
          ctx.fillStyle = p.textColor;
          ctx.globalAlpha = 0.3;
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.fillText(`${pgIdx + 1}/${totalPages}`, W - W * 0.06, H - H * 0.04);
          ctx.globalAlpha = 1;
        }
        resolve(c);
      };
      if (p.imgData) {
        const img = new Image();
        img.onload = () => {
          p._imgEl = img;
          draw();
        };
        img.src = p.imgData;
      } else draw();
    });
  };
  const drawCover = (ctx, p, W, H) => {
    const S = W / 340; // preview base is 340
    ctx.globalAlpha = 0.6;
    if (p.decoStyle === "line") {
      ctx.fillStyle = p.accent;
      ctx.fillRect(W * 0.08, H * 0.06, W * 0.12, Math.max(3, W * 0.006));
      ctx.fillRect(W - W * 0.08 - W * 0.12, H - H * 0.06 - Math.max(3, W * 0.006), W * 0.12, Math.max(3, W * 0.006));
    }
    if (p.decoStyle === "dot") {
      const r = W * 0.012;
      ctx.beginPath();
      ctx.arc(W * 0.08 + r, H * 0.06 + r, r, 0, Math.PI * 2);
      ctx.fillStyle = p.accent;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(W - W * 0.08 - r, H - H * 0.06 - r, r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (p.decoStyle === "bracket") {
      ctx.strokeStyle = p.accent;
      ctx.lineWidth = Math.max(2, W * 0.005);
      ctx.globalAlpha = 0.4;
      const bl = W * 0.06;
      ctx.beginPath();
      ctx.moveTo(W * 0.06, H * 0.05 + bl);
      ctx.lineTo(W * 0.06, H * 0.05);
      ctx.lineTo(W * 0.06 + bl, H * 0.05);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W - W * 0.06, H - H * 0.05 - bl);
      ctx.lineTo(W - W * 0.06, H - H * 0.05);
      ctx.lineTo(W - W * 0.06 - bl, H - H * 0.05);
      ctx.stroke();
    }
    if (p.decoStyle === "frame") {
      ctx.strokeStyle = p.accent;
      ctx.lineWidth = Math.max(1, W * 0.004);
      ctx.globalAlpha = 0.2;
      ctx.strokeRect(W * 0.06, H * 0.06, W * 0.88, H * 0.88);
    }
    if (p.decoStyle === "corners") {
      ctx.strokeStyle = p.accent;
      ctx.lineWidth = Math.max(2, W * 0.005);
      ctx.globalAlpha = 0.5;
      const s = W * 0.05,
        ox = W * 0.06,
        oy = H * 0.05;
      ctx.beginPath();
      ctx.moveTo(ox, oy + s);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + s, oy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W - ox, oy + s);
      ctx.lineTo(W - ox, oy);
      ctx.lineTo(W - ox - s, oy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ox, H - oy - s);
      ctx.lineTo(ox, H - oy);
      ctx.lineTo(ox + s, H - oy);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(W - ox, H - oy - s);
      ctx.lineTo(W - ox, H - oy);
      ctx.lineTo(W - ox - s, H - oy);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    const isNumLeft = p.layout === "number-left" && p.bigNumber;
    if (isNumLeft) {
      const pad = W * 0.1;
      const numSize = (p.numSize || 120) * S;
      ctx.font = `900 ${numSize}px "${p.fontHead}",sans-serif`;
      ctx.fillStyle = p.accent;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const numW = ctx.measureText(p.bigNumber).width;
      ctx.fillText(p.bigNumber, pad, H * 0.48);
      const bx = pad + numW + W * 0.03;
      const availW = W - bx - pad;
      const baseHead = (p.headSize || 40) * S;
      const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "700", Math.max(14, 12 * S));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, availW, headFont, true);
      const baseTop = (p.topSize || 12) * S;
      const effTop = fitFontSize(p.topLabel, availW, baseTop, p.fontBody, "700", Math.max(8, 9 * S));
      const baseSub = (p.subSize || 14) * S;
      const effSub = fitFontSize(p.subtitle, availW, baseSub, p.fontBody, "400", Math.max(8, 10 * S));
      // vertically center the block around H*0.48
      const blockH = (p.topLabel ? effTop + 12 * S : 0) + headLines.length * effHead * 1.35 + (p.subtitle ? effSub + 8 * S : 0);
      let curY = H * 0.48 - blockH / 2;
      ctx.textBaseline = "top";
      if (p.topLabel) {
        ctx.font = `700 ${effTop}px "${p.fontBody}",sans-serif`;
        ctx.fillStyle = p.accent;
        ctx.fillText(p.topLabel, bx, curY);
        curY += effTop + 12 * S;
      }
      headLines.forEach(line => {
        drawHLLine(ctx, p, line, bx, curY, "left", effHead, p.fontHead, 700);
        curY += effHead * 1.35;
      });
      if (p.subtitle) {
        ctx.font = `400 ${effSub}px "${p.fontBody}",sans-serif`;
        ctx.fillStyle = p.textColor;
        ctx.globalAlpha = 0.5;
        ctx.fillText(p.subtitle, bx, curY + 8 * S);
        ctx.globalAlpha = 1;
      }
    } else {
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const availW = W * 0.8;
      const baseHead = (p.headSize || 40) * S;
      const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "700", Math.max(14, 12 * S));
      const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
      const headLines = wrapAllLines(p.headline, availW, headFont, true);
      const baseTop = (p.topSize || 12) * S;
      const effTop = fitFontSize(p.topLabel, availW, baseTop, p.fontBody, "700", Math.max(8, 9 * S));
      const baseSub = (p.subSize || 14) * S;
      const effSub = fitFontSize(p.subtitle, availW, baseSub, p.fontBody, "400", Math.max(8, 10 * S));
      const blockH = (p.topLabel ? effTop + 20 * S : 0) + headLines.length * effHead * 1.35 + (p.subtitle ? effSub + 10 * S : 0);
      let curY = H * 0.5 - blockH / 2;
      if (p.topLabel) {
        ctx.font = `700 ${effTop}px "${p.fontBody}",sans-serif`;
        ctx.fillStyle = p.accent;
        ctx.fillText(p.topLabel, W / 2, curY);
        curY += effTop + 20 * S;
      }
      headLines.forEach(line => {
        drawHLLine(ctx, p, line, W / 2, curY, "center", effHead, p.fontHead, 700);
        curY += effHead * 1.35;
      });
      if (p.subtitle) {
        ctx.font = `400 ${effSub}px "${p.fontBody}",sans-serif`;
        ctx.fillStyle = p.textColor;
        ctx.globalAlpha = 0.5;
        ctx.fillText(p.subtitle, W / 2, curY + 10 * S);
        ctx.globalAlpha = 1;
      }
    }
    if (p.bottomTag) {
      ctx.font = `600 ${9 * S}px "Space Mono",monospace`;
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.4;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(p.bottomTag, W / 2, H - H * 0.05);
      ctx.globalAlpha = 1;
    }
  };
  const drawImgText = (ctx, p, W, H, pt) => {
    const S = W / 340;
    const imgH = H * 0.48;
    const imgY = pt === "img-top" ? 0 : H - imgH;
    drawImgArea(ctx, p, 0, imgY, W, imgH);
    const padH = W * 0.08,
      padV = W * 0.06;
    const textTop = pt === "img-top" ? imgH + padV : padV;
    const textBot = pt === "img-top" ? H - padV : H - imgH - padV;
    const txtW = W - padH * 2;
    const txtH = Math.max(20, textBot - textTop);
    const baseHead = (p.headSize || 26) * S;
    const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(12, 12 * S));
    const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
    const headLines = wrapAllLines(p.headline, txtW, headFont, true);
    const headH = headLines.length * effHead * 1.4 + 8 * S;
    const baseBody = (p.bodySize || 15) * S;
    const bodyRes = fitAndWrap(p.bodyText, txtW, Math.max(0, txtH - headH), baseBody, 1.7, p.fontBody, "400", Math.max(10, 10 * S));
    // vertical center
    const totalH = headH + (p.bodyText ? bodyRes.lines.length * bodyRes.fontSize * 1.7 : 0);
    let curY = textTop + Math.max(0, (txtH - totalH) / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    headLines.forEach(line => {
      drawHLLine(ctx, p, line, padH, curY, "left", effHead, p.fontHead, 700);
      curY += effHead * 1.4;
    });
    if (p.bodyText) {
      curY += 8 * S;
      ctx.globalAlpha = 0.7;
      bodyRes.lines.forEach(l => {
        drawHLLine(ctx, p, l, padH, curY, "left", bodyRes.fontSize, p.fontBody, 400);
        curY += bodyRes.fontSize * 1.7;
      });
      ctx.globalAlpha = 1;
    }
  };
  const drawSide = (ctx, p, W, H, pt) => {
    const S = W / 340;
    const imgW = W * 0.45;
    const imgX = pt === "side-lr" ? 0 : W - imgW;
    const textX = pt === "side-lr" ? imgW : 0;
    drawImgArea(ctx, p, imgX, 0, imgW, H);
    const pad = W * 0.06;
    const txtW = W - imgW - pad * 2;
    const txtH = H - pad * 2;
    const baseHead = (p.headSize || 24) * S;
    const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(11, 11 * S));
    const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
    const headLines = wrapAllLines(p.headline, txtW, headFont, true);
    const headH = headLines.length * effHead * 1.4 + 8 * S;
    const baseBody = (p.bodySize || 14) * S;
    const bodyRes = fitAndWrap(p.bodyText, txtW, Math.max(0, txtH - headH), baseBody, 1.7, p.fontBody, "400", Math.max(10, 10 * S));
    const totalH = headH + (p.bodyText ? bodyRes.lines.length * bodyRes.fontSize * 1.7 : 0);
    let curY = pad + Math.max(0, (txtH - totalH) / 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    headLines.forEach(line => {
      drawHLLine(ctx, p, line, textX + pad, curY, "left", effHead, p.fontHead, 700);
      curY += effHead * 1.4;
    });
    if (p.bodyText) {
      curY += 8 * S;
      ctx.globalAlpha = 0.7;
      bodyRes.lines.forEach(l => {
        drawHLLine(ctx, p, l, textX + pad, curY, "left", bodyRes.fontSize, p.fontBody, 400);
        curY += bodyRes.fontSize * 1.7;
      });
      ctx.globalAlpha = 1;
    }
  };
  const drawList = (ctx, p, W, H) => {
    const S = W / 340;
    const pad = W * 0.08;
    const txtW = W - pad * 2;
    const bulletSize = 24 * S;
    const bulletGap = 10 * S;
    const itemTxtW = txtW - bulletSize - bulletGap;
    const items = p.listItems || [];
    const isDarkBg = !p.bgColor?.includes?.("f5f0e8") && !p.bgColor?.includes?.("fafaf5");
    const baseHead = (p.headSize || 26) * S;
    const effHead = fitFontSize(p.headline, txtW, baseHead, p.fontHead, "700", Math.max(12, 12 * S));
    const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
    const headLines = wrapAllLines(p.headline, txtW, headFont, true);
    const headH = headLines.length * effHead * 1.4 + 16 * S;
    const itemSpace = H - pad * 2 - headH;
    // shrink items uniformly until they fit
    const baseItem = (p.bodySize || 15) * S;
    const minItem = Math.max(10, 10 * S);
    let itemSize = baseItem;
    let wrappedItems = [];
    for (let it = 0; it < 20; it++) {
      const itFont = `400 ${itemSize}px "${p.fontBody}",sans-serif`;
      wrappedItems = items.map(item => wrapLineWithHL(item, itemTxtW, itFont));
      let totalH = 0;
      for (const lines of wrappedItems) {
        totalH += Math.max(bulletSize, lines.length * itemSize * 1.6) + 10 * S;
      }
      if (totalH <= itemSpace || itemSize <= minItem) break;
      itemSize = Math.max(minItem, Math.floor(itemSize * 0.93));
    }
    // Vertical center
    let totalBlockH = headH;
    for (const lines of wrappedItems) {
      totalBlockH += Math.max(bulletSize, lines.length * itemSize * 1.6) + 10 * S;
    }
    totalBlockH -= 10 * S; // last gap
    let curY = Math.max(pad, (H - totalBlockH) / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    headLines.forEach(line => {
      drawHLLine(ctx, p, line, W / 2, curY, "center", effHead, p.fontHead, 700);
      curY += effHead * 1.4;
    });
    curY += 16 * S;
    ctx.textAlign = "left";
    const bulletR = bulletSize / 2;
    wrappedItems.forEach((lines, i) => {
      const bx = pad,
        by = curY;
      ctx.fillStyle = p.accent;
      if (p.listStyle === "bullet") {
        ctx.beginPath();
        ctx.arc(bx + bulletR, by + bulletR, bulletR, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        const rr = 4 * S;
        ctx.moveTo(bx + rr, by);
        ctx.lineTo(bx + bulletSize - rr, by);
        ctx.quadraticCurveTo(bx + bulletSize, by, bx + bulletSize, by + rr);
        ctx.lineTo(bx + bulletSize, by + bulletSize - rr);
        ctx.quadraticCurveTo(bx + bulletSize, by + bulletSize, bx + bulletSize - rr, by + bulletSize);
        ctx.lineTo(bx + rr, by + bulletSize);
        ctx.quadraticCurveTo(bx, by + bulletSize, bx, by + bulletSize - rr);
        ctx.lineTo(bx, by + rr);
        ctx.quadraticCurveTo(bx, by, bx + rr, by);
        ctx.fill();
        ctx.fillStyle = isDarkBg ? "#000" : "#fff";
        ctx.font = `800 ${Math.round(bulletSize * 0.5)}px "Space Mono",monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("" + (i + 1), bx + bulletR, by + bulletR);
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
      }
      ctx.globalAlpha = 0.85;
      let ly = by + 2 * S;
      lines.forEach(l => {
        drawHLLine(ctx, p, l, bx + bulletSize + bulletGap + 4 * S, ly, "left", itemSize, p.fontBody, 400);
        ly += itemSize * 1.6;
      });
      ctx.globalAlpha = 1;
      curY += Math.max(bulletSize, lines.length * itemSize * 1.6) + 10 * S;
    });
  };
  const drawQuote = (ctx, p, W, H) => {
    const S = W / 340;
    const pad = W * 0.12;
    const availW = Math.max(40, W - pad * 2);
    const baseHead = (p.headSize || 44) * S;
    const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "700", Math.max(12, 14 * S));
    const headFont = `700 ${effHead}px "${p.fontHead}",sans-serif`;
    const headLines = wrapAllLines(p.headline, availW, headFont, true);
    const baseSub = (p.subSize || 14) * S;
    const effSub = fitFontSize(p.subtitle, availW, baseSub, p.fontBody, "600", Math.max(8, 10 * S));
    const quoteH = 62 * S * 0.7;
    const ruleH = Math.max(2, W * 0.005);
    const headH = headLines.length * effHead * 1.5;
    const subBlock = p.subtitle ? H * 0.035 + ruleH + H * 0.018 + effSub : 0;
    const totalH = quoteH + 14 * S + headH + subBlock;
    let curY = Math.max(pad, (H - totalH) / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = p.accent;
    ctx.font = `800 ${62 * S}px "${p.fontHead}",serif`;
    ctx.fillText("“", W / 2, curY);
    ctx.globalAlpha = 1;
    curY += quoteH + 14 * S;
    headLines.forEach(l => {
      drawHLLine(ctx, p, l, W / 2, curY, "center", effHead, p.fontHead, 700);
      curY += effHead * 1.5;
    });
    if (p.subtitle) {
      curY += H * 0.035;
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.6;
      ctx.fillRect(W / 2 - W * 0.05, curY, W * 0.1, ruleH);
      ctx.globalAlpha = 1;
      curY += ruleH + H * 0.018;
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.9;
      ctx.font = `600 ${effSub}px "${p.fontBody}",sans-serif`;
      ctx.fillText(p.subtitle, W / 2, curY);
      ctx.globalAlpha = 1;
    }
    if (p.bottomTag) {
      ctx.font = `600 ${9 * S}px "Space Mono",monospace`;
      ctx.fillStyle = p.accent;
      ctx.globalAlpha = 0.4;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(p.bottomTag, W / 2, H - H * 0.05);
      ctx.globalAlpha = 1;
    }
  };
  const drawCta = (ctx, p, W, H) => {
    const S = W / 340;
    const pad = W * 0.1;
    const availW = Math.max(40, W - pad * 2);
    const baseHead = (p.headSize || 34) * S;
    const effHead = fitFontSize(p.headline, availW, baseHead, p.fontHead, "800", Math.max(12, 14 * S));
    const headFont = `800 ${effHead}px "${p.fontHead}",sans-serif`;
    const headLines = wrapAllLines(p.headline, availW, headFont, true);
    const chips = (p.listItems || []).filter(c => c && c.trim()).slice(0, 4);
    const baseTop = (p.topSize || 13) * S;
    const effTop = fitFontSize(p.topLabel, availW, baseTop, p.fontBody, "700", Math.max(8, 9 * S));
    const gap = H * 0.022;
    const chipFont = `700 ${12 * S}px "${p.fontBody}",sans-serif`;
    const chipH = 22 * S,
      chipPadX = 13 * S,
      chipGap = 7 * S;
    ctx.font = chipFont;
    const dims = chips.map(c => ({
      t: c,
      w: ctx.measureText(c).width + chipPadX * 2
    }));
    const rows = [];
    let row = [],
      rw = 0;
    for (const d of dims) {
      if (rw + d.w > availW && row.length) {
        rows.push(row);
        row = [d];
        rw = d.w + chipGap;
      } else {
        row.push(d);
        rw += d.w + chipGap;
      }
    }
    if (row.length) rows.push(row);
    const headH = headLines.length * effHead * 1.3;
    const chipsH = rows.length ? rows.length * chipH + (rows.length - 1) * chipGap : 0;
    const totalH = (p.topLabel ? effTop + gap : 0) + headH + (rows.length ? gap + chipsH : 0) + (p.bottomTag ? gap + 15 * S : 0);
    let curY = Math.max(pad, (H - totalH) / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (p.topLabel) {
      ctx.font = `700 ${effTop}px "${p.fontBody}",sans-serif`;
      ctx.fillStyle = p.accent;
      ctx.fillText(p.topLabel, W / 2, curY);
      curY += effTop + gap;
    }
    headLines.forEach(l => {
      drawHLLine(ctx, p, l, W / 2, curY, "center", effHead, p.fontHead, 800);
      curY += effHead * 1.3;
    });
    if (rows.length) {
      curY += gap;
      rows.forEach((r, ri) => {
        const tw = r.reduce((a, c) => a + c.w, 0) + chipGap * (r.length - 1);
        let cx = W / 2 - tw / 2;
        for (const d of r) {
          ctx.strokeStyle = p.accent;
          ctx.lineWidth = Math.max(1, W * 0.004);
          roundRectPath(ctx, cx, curY, d.w, chipH, chipH / 2);
          ctx.stroke();
          ctx.fillStyle = p.accent;
          ctx.font = chipFont;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(d.t, cx + d.w / 2, curY + chipH / 2);
          ctx.textBaseline = "top";
          cx += d.w + chipGap;
        }
        curY += chipH + (ri < rows.length - 1 ? chipGap : 0);
      });
    }
    if (p.bottomTag) {
      curY += gap;
      ctx.font = `800 ${15 * S}px "Space Mono",monospace`;
      ctx.fillStyle = p.accent;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(p.bottomTag, W / 2, curY);
    }
  };
  const doExport = useCallback(async (toClipboard = false) => {
    const c = await renderToCanvas(P, ratio, curIdx);
    if (toClipboard) {
      c.toBlob(async blob => {
        try {
          await navigator.clipboard.write([new ClipboardItem({
            "image/png": blob
          })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (e) {
          console.error(e);
        }
      }, "image/png");
    } else {
      const mime = exportFmt === "jpg" ? "image/jpeg" : "image/png";
      const ext = exportFmt === "jpg" ? "jpg" : "png";
      c.toBlob(blob => {
        const u = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = u;
        a.download = `ig-p${curIdx + 1}-${ratio.id}-${Date.now()}.${ext}`;
        a.click();
        URL.revokeObjectURL(u);
      }, mime, exportFmt === "jpg" ? 0.95 : undefined);
    }
  }, [P, ratio, curIdx, totalPages, exportFmt]);
  const doExportAll = useCallback(async () => {
    // flush current P into pages for export
    const allPages = [...pages];
    allPages[curIdx] = {
      ...P
    };
    const mime = exportFmt === "jpg" ? "image/jpeg" : "image/png";
    const ext = exportFmt === "jpg" ? "jpg" : "png";
    for (let i = 0; i < allPages.length; i++) {
      const c = await renderToCanvas(allPages[i], ratio, i);
      await new Promise(res => {
        c.toBlob(blob => {
          const u = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = u;
          a.download = `ig-p${i + 1}-${ratio.id}-${Date.now()}.${ext}`;
          a.click();
          URL.revokeObjectURL(u);
          setTimeout(res, 300);
        }, mime, exportFmt === "jpg" ? 0.95 : undefined);
      });
    }
    showToast("已匯出全部 " + allPages.length + " 頁");
  }, [pages, P, ratio, curIdx, totalPages, exportFmt, showToast]);

  /* UI pieces are defined OUTSIDE App — see above */

  const tabs = [{
    id: "presets",
    label: "模板",
    ico: ICO.grid
  }, {
    id: "text",
    label: "內容",
    ico: ICO.pen
  }, {
    id: "style",
    label: "樣式",
    ico: ICO.tune
  }, {
    id: "bg",
    label: "背景",
    ico: ICO.img
  }];

  // expose latest page actions to the (mount-once) keyboard handler
  kbRef.current = {
    switchPage,
    duplicatePage,
    curIdx,
    total: pages.length
  };

  /* ══════════ MAIN LAYOUT ══════════ */
  /* Desktop: left=preview, right=editor. Fluid. */
  const previewMaxH = window.innerHeight - 120;
  const previewMaxW = Math.min(500, window.innerWidth * 0.45);
  const idealH = previewMaxW * (ratio.h / ratio.w);
  const actualPreviewW = idealH > previewMaxH ? previewMaxW * (previewMaxH / idealH) : previewMaxW;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0c0c12"
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: handleImageUpload
  }), /*#__PURE__*/React.createElement("input", {
    ref: projFileRef,
    type: "file",
    accept: "application/json,.json",
    style: {
      display: "none"
    },
    onChange: importProject
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #1a1a24",
      background: "#0e0e16",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 6,
      fontFamily: "'Space Mono',monospace",
      color: "#d0d0e0"
    }
  }, "TYPO STUDIO"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 8,
      color: "#4a4a68",
      letterSpacing: 3,
      marginTop: 1,
      fontFamily: "'Space Mono',monospace"
    }
  }, "IG CAROUSEL COMPOSER")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: "#1e1e2a"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: undo,
    style: {
      padding: "6px 8px"
    },
    title: "\u5FA9\u539F Ctrl+Z"
  }, ICO.undo), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: redo,
    style: {
      padding: "6px 8px"
    },
    title: "\u91CD\u505A Ctrl+Y"
  }, ICO.redo)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: "#1e1e2a"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, RATIOS.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    className: `btn${ratio.id === r.id ? " active" : ""}`,
    onClick: () => setRatio(r),
    style: {
      padding: "5px 12px",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: 1
    }
  }, r.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: exportProject,
    style: {
      padding: "6px 8px"
    },
    title: "\u532F\u51FA\u5C08\u6848 JSON"
  }, ICO.save), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => projFileRef.current?.click(),
    style: {
      padding: "6px 8px"
    },
    title: "\u532F\u5165\u5C08\u6848 JSON"
  }, ICO.folder), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: "#1e1e2a"
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn active",
    onClick: autoFixCurrent,
    style: {
      padding: "6px 10px",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 1
    },
    title: "\u81EA\u52D5\u4FEE\u6B63\u672C\u9801\u6392\u7248\uFF08\u5B57\u7D1A\xB7\u65B7\u884C\xB7\u5C0D\u6BD4\uFF09"
  }, ICO.wand, " \u6392\u7248"), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: randomColor,
    style: {
      padding: "6px 10px",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: 2
    },
    title: "\u96A8\u6A5F\u914D\u8272"
  }, ICO.dice, " RANDOM"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: "#1e1e2a"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      border: "1px solid #2a2a3a",
      borderRadius: 6,
      overflow: "hidden"
    },
    title: "\u532F\u51FA\u683C\u5F0F"
  }, ["png", "jpg"].map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setExportFmt(f),
    style: {
      padding: "6px 9px",
      border: "none",
      background: exportFmt === f ? "#1e1e2a" : "transparent",
      color: exportFmt === f ? "#d0d0e0" : "#5a5a78",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 1,
      cursor: "pointer",
      fontFamily: "'Space Mono',monospace"
    }
  }, f.toUpperCase()))), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => doExport(true),
    style: {
      padding: "6px 8px",
      color: copied ? "#4ecdc4" : "",
      animation: copied ? "pop 0.3s ease" : "none"
    },
    title: "\u8907\u88FD\u5230\u526A\u8CBC\u7C3F"
  }, ICO.copy), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => doExport(false),
    style: {
      padding: "6px 14px",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 3
    }
  }, ICO.dl, " EXPORT"), pages.length > 1 && /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: doExportAll,
    style: {
      padding: "6px 14px",
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 3
    }
  }, ICO.dl, " ALL"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      background: "#0a0a10",
      borderRight: "1px solid #1a1a24"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderBottom: "1px solid #16161e",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
      flexWrap: "nowrap"
    }
  }, pages.map((pg, i) => /*#__PURE__*/React.createElement("div", {
    key: pg.id,
    className: `page-thumb${i === curIdx ? " active" : ""}`,
    onClick: () => switchPage(i),
    style: {
      width: 52,
      height: 52 * (ratio.h / ratio.w),
      flexShrink: 0,
      background: pg.bgColor || "#111"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      color: pg.accent || "#FFD600",
      opacity: 0.6,
      fontFamily: "'Space Mono',monospace",
      fontWeight: 700,
      userSelect: "none"
    }
  }, (PAGE_TYPES.find(t => t.id === pg.pageType) || PAGE_TYPES[0]).icon), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background: pg.accent || "#FFD600"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 3,
      right: 3,
      fontSize: 7,
      color: "rgba(255,255,255,0.5)",
      fontFamily: "'Space Mono',monospace",
      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
      lineHeight: 1
    }
  }, i + 1))), /*#__PURE__*/React.createElement("div", {
    ref: addBtnRef,
    style: {
      position: "relative",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => setShowAddMenu(!showAddMenu),
    style: {
      width: 52,
      height: 52 * (ratio.h / ratio.w),
      fontSize: 18,
      borderStyle: "dashed"
    }
  }, ICO.plus), showAddMenu && /*#__PURE__*/React.createElement("div", {
    className: "add-menu"
  }, PAGE_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => addPage(t.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-icon"
  }, t.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: "#c0c0d0"
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "#6060a0",
      marginTop: 2
    }
  }, t.desc)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexShrink: 0
    }
  }, pages.length > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => movePage(-1),
    disabled: curIdx === 0,
    title: "\u5F80\u524D\u79FB (\u2190)",
    style: {
      padding: "6px 7px",
      opacity: curIdx === 0 ? 0.4 : 1
    }
  }, ICO.arrowL), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => movePage(1),
    disabled: curIdx === pages.length - 1,
    title: "\u5F80\u5F8C\u79FB (\u2192)",
    style: {
      padding: "6px 7px",
      opacity: curIdx === pages.length - 1 ? 0.4 : 1
    }
  }, ICO.arrowR)), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => duplicatePage(curIdx),
    style: {
      padding: "6px 10px",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: 1
    },
    title: "\u8907\u88FD\u672C\u9801 (Ctrl+D)"
  }, "DUP"), pages.length > 1 && /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: autoFixAll,
    style: {
      padding: "6px 9px",
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: 1
    },
    title: "\u81EA\u52D5\u4FEE\u6B63\u5168\u90E8\u9801\u9762\u6392\u7248"
  }, ICO.wand, "\u5168\u90E8"), pages.length > 1 && /*#__PURE__*/React.createElement("button", {
    className: "btn danger",
    onClick: () => deletePage(curIdx),
    style: {
      padding: "6px 8px"
    }
  }, ICO.trash))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.04)"
    }
  }, /*#__PURE__*/React.createElement(Preview, {
    size: actualPreviewW,
    aspectRatio: ratio,
    interactive: true,
    showPageIndicator: true,
    pageIndex: curIdx
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 12,
      right: 24,
      fontSize: 9,
      color: "#3a3a58",
      fontFamily: "'Space Mono',monospace",
      letterSpacing: 2
    }
  }, ratio.px, " / P", curIdx + 1, " of ", totalPages))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      background: "#0e0e16"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      borderBottom: "1px solid #1a1a24",
      flexShrink: 0
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tab-btn${tab === t.id ? " active" : ""}`,
    onClick: () => setTab(t.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: tab === t.id ? 0.9 : 0.4
    }
  }, t.ico), t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 20,
      animation: "fi 0.15s ease"
    },
    key: tab + curIdx
  }, tab === "presets" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Sec, null, "PAGE TYPE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 6,
      marginBottom: 20
    }
  }, PAGE_TYPES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `btn${P.pageType === t.id ? " active" : ""}`,
    onClick: () => set("pageType", t.id),
    style: {
      padding: "10px 4px",
      fontSize: 11,
      fontWeight: 600,
      flexDirection: "column",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      lineHeight: 1
    }
  }, t.icon), /*#__PURE__*/React.createElement("span", null, t.label)))), P.pageType === "cover" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "COVER PRESETS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8
    }
  }, COVER_PRESETS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => setMulti({
      ...p,
      pageType: "cover"
    }),
    style: {
      border: "1px solid #1e1e2a",
      borderRadius: 6,
      padding: 0,
      cursor: "pointer",
      overflow: "hidden",
      transition: "all .2s",
      opacity: 0.75,
      background: "transparent",
      aspectRatio: `${ratio.w}/${ratio.h}`
    },
    onMouseEnter: e => e.currentTarget.style.opacity = "1",
    onMouseLeave: e => e.currentTarget.style.opacity = "0.75"
  }, /*#__PURE__*/React.createElement(Preview, {
    size: 110,
    data: {
      ...p,
      pageType: "cover"
    },
    aspectRatio: ratio
  }))))), P.pageType !== "cover" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "CONTENT PRESETS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8
    }
  }, CONTENT_PRESETS.filter(cp => cp.pageType === P.pageType).map(cp => /*#__PURE__*/React.createElement("button", {
    key: cp.id,
    onClick: () => setMulti({
      ...cp
    }),
    style: {
      border: "1px solid #1e1e2a",
      borderRadius: 6,
      padding: 0,
      cursor: "pointer",
      overflow: "hidden",
      transition: "all .2s",
      opacity: 0.75,
      background: "transparent",
      aspectRatio: `${ratio.w}/${ratio.h}`,
      position: "relative"
    },
    onMouseEnter: e => e.currentTarget.style.opacity = "1",
    onMouseLeave: e => e.currentTarget.style.opacity = "0.75"
  }, /*#__PURE__*/React.createElement(Preview, {
    size: 110,
    data: cp,
    aspectRatio: ratio
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(0,0,0,0.6)",
      padding: "4px 6px",
      fontSize: 9,
      color: "#aaa",
      textAlign: "center",
      fontWeight: 600
    }
  }, cp.label)))), CONTENT_PRESETS.filter(cp => cp.pageType === P.pageType).length === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#5a5a78",
      fontSize: 12,
      textAlign: "center",
      padding: "16px 0 12px"
    }
  }, "\u6B64\u985E\u578B\u66AB\u7121\u9810\u8A2D\uFF0C\u4EE5\u4E0B\u70BA\u6240\u6709\u5167\u6587\u6A21\u677F\uFF1A"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 8
    }
  }, CONTENT_PRESETS.map(cp => /*#__PURE__*/React.createElement("button", {
    key: cp.id,
    onClick: () => setMulti({
      ...cp,
      pageType: cp.pageType
    }),
    style: {
      border: "1px solid #1e1e2a",
      borderRadius: 6,
      padding: 0,
      cursor: "pointer",
      overflow: "hidden",
      transition: "all .2s",
      opacity: 0.75,
      background: "transparent",
      aspectRatio: `${ratio.w}/${ratio.h}`,
      position: "relative"
    },
    onMouseEnter: e => e.currentTarget.style.opacity = "1",
    onMouseLeave: e => e.currentTarget.style.opacity = "0.75"
  }, /*#__PURE__*/React.createElement(Preview, {
    size: 110,
    data: cp,
    aspectRatio: ratio
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(0,0,0,0.6)",
      padding: "4px 6px",
      fontSize: 9,
      color: "#aaa",
      textAlign: "center",
      fontWeight: 600
    }
  }, cp.label))))))), tab === "text" && /*#__PURE__*/React.createElement("div", null, P.pageType === "cover" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u5C01\u9762\u5167\u5BB9"), /*#__PURE__*/React.createElement(Field, {
    label: "\u4E0A\u65B9\u6A19\u7C64",
    value: P.topLabel,
    onChange: v => set("topLabel", v),
    placeholder: "\u61F6\u4EBA\u5305 / \u8DA8\u52E2\u5206\u6790"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u5927\u6578\u5B57",
    value: P.bigNumber,
    onChange: v => set("bigNumber", v),
    placeholder: "5 / 10"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u4E3B\u6A19\u984C  |  {hl}\u9AD8\u4EAE{/hl}",
    value: P.headline,
    onChange: v => set("headline", v),
    rows: 3,
    placeholder: "5\u500B\u8D85\u5BE6\u7528\u7684\\n{hl}\u6392\u7248\u6280\u5DE7{/hl}"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u526F\u6A19\u984C",
    value: P.subtitle,
    onChange: v => set("subtitle", v),
    placeholder: "\u65B0\u624B\u5FC5\u5B78"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u5E95\u90E8\u6A19\u8A18",
    value: P.bottomTag,
    onChange: v => set("bottomTag", v),
    placeholder: "@\u5E33\u865F"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u6392\u7248\u65B9\u5F0F")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [{
    v: "center",
    l: "置中"
  }, {
    v: "number-left",
    l: "數字+標題"
  }].map(x => /*#__PURE__*/React.createElement("button", {
    key: x.v,
    className: `btn${P.layout === x.v ? " active" : ""}`,
    onClick: () => set("layout", x.v),
    style: {
      flex: 1,
      padding: "10px 0",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 2
    }
  }, x.l)))), ["img-top", "text-top", "side-lr", "side-rl"].includes(P.pageType) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u5167\u5BB9\u7DE8\u8F2F"), /*#__PURE__*/React.createElement(Field, {
    label: "\u6A19\u984C  |  {hl}\u9AD8\u4EAE{/hl}",
    value: P.headline,
    onChange: v => set("headline", v),
    rows: 2,
    placeholder: "\u6A19\u984C\u6587\u5B57"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u5167\u6587",
    value: P.bodyText,
    onChange: v => set("bodyText", v),
    rows: 4,
    placeholder: "\u5167\u6587\u8AAA\u660E..."
  })), P.pageType === "quote" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u91D1\u53E5\u5167\u5BB9"), /*#__PURE__*/React.createElement(Field, {
    label: "\u91D1\u53E5  |  {hl}\u9AD8\u4EAE{/hl}",
    value: P.headline,
    onChange: v => set("headline", v),
    rows: 3,
    placeholder: "\u4F60\u7684\u6642\u9593\u6709\u9650\\n\u5225\u6D6A\u8CBB\u5728{hl}\u5225\u4EBA\u7684\u4EBA\u751F{/hl}\u88E1"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u51FA\u8655 / \u4F5C\u8005",
    value: P.subtitle,
    onChange: v => set("subtitle", v),
    placeholder: "\u2014 Steve Jobs"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u5E95\u90E8\u6A19\u8A18",
    value: P.bottomTag,
    onChange: v => set("bottomTag", v),
    placeholder: "@\u5E33\u865F"
  })), P.pageType === "cta" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u7D50\u5C3E\u5167\u5BB9"), /*#__PURE__*/React.createElement(Field, {
    label: "\u4E0A\u65B9\u6A19\u7C64",
    value: P.topLabel,
    onChange: v => set("topLabel", v),
    placeholder: "\u8B1D\u8B1D\u4F60\u8B80\u5230\u9019\u88E1"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u4E3B\u6A19\u984C  |  {hl}\u9AD8\u4EAE{/hl}",
    value: P.headline,
    onChange: v => set("headline", v),
    rows: 2,
    placeholder: "\u89BA\u5F97\u6709\u7528\\n\u8A18\u5F97{hl}\u6536\u85CF\u5206\u4EAB{/hl}"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u884C\u52D5\u6309\u9215")), (P.listItems || []).map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: P.accent,
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "'Space Mono',monospace",
      width: 20,
      textAlign: "center"
    }
  }, i + 1), /*#__PURE__*/React.createElement(ListItemInput, {
    value: item,
    onChange: v => {
      const items = [...(P.listItems || [])];
      items[i] = v;
      set("listItems", items);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn danger",
    onClick: () => {
      const items = [...(P.listItems || [])];
      items.splice(i, 1);
      set("listItems", items);
    },
    style: {
      padding: "6px 8px",
      fontSize: 12
    }
  }, "x"))), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => set("listItems", [...(P.listItems || []), "新按鈕"]),
    style: {
      width: "100%",
      padding: "10px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 2,
      borderStyle: "dashed",
      marginTop: 4
    }
  }, "+ \u65B0\u589E\u6309\u9215"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u5E33\u865F / Handle",
    value: P.bottomTag,
    onChange: v => set("bottomTag", v),
    placeholder: "@hao0321_studio"
  }))), P.pageType === "list" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u6E05\u55AE\u5167\u5BB9"), /*#__PURE__*/React.createElement(Field, {
    label: "\u6A19\u984C  |  {hl}\u9AD8\u4EAE{/hl}",
    value: P.headline,
    onChange: v => set("headline", v),
    rows: 2,
    placeholder: "\u64CD\u4F5C\u6B65\u9A5F"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u6E05\u55AE\u9805\u76EE")), (P.listItems || []).map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: P.accent,
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "'Space Mono',monospace",
      width: 20,
      textAlign: "center"
    }
  }, P.listStyle === "number" ? i + 1 : "*"), /*#__PURE__*/React.createElement(ListItemInput, {
    value: item,
    onChange: v => {
      const items = [...(P.listItems || [])];
      items[i] = v;
      set("listItems", items);
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn danger",
    onClick: () => {
      const items = [...(P.listItems || [])];
      items.splice(i, 1);
      set("listItems", items);
    },
    style: {
      padding: "6px 8px",
      fontSize: 12
    }
  }, "x"))), /*#__PURE__*/React.createElement("button", {
    className: "btn",
    onClick: () => set("listItems", [...(P.listItems || []), "新項目"]),
    style: {
      width: "100%",
      padding: "10px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 2,
      borderStyle: "dashed",
      marginTop: 4
    }
  }, "+ \u65B0\u589E\u9805\u76EE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 14
    }
  }, [{
    v: "number",
    l: "1 2 3 編號"
  }, {
    v: "bullet",
    l: "* 圓點"
  }].map(x => /*#__PURE__*/React.createElement("button", {
    key: x.v,
    className: `btn${P.listStyle === x.v ? " active" : ""}`,
    onClick: () => set("listStyle", x.v),
    style: {
      flex: 1,
      padding: "10px 0",
      fontSize: 11,
      fontWeight: 600
    }
  }, x.l)))), ["img-top", "text-top", "side-lr", "side-rl"].includes(P.pageType) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u5716\u7247")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => fileRef.current?.click(),
    style: {
      flex: 1,
      padding: "12px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 2
    }
  }, ICO.upload, " \u4E0A\u50B3\u5716\u7247"), P.imgData && /*#__PURE__*/React.createElement("button", {
    className: "btn danger",
    onClick: () => set("imgData", null),
    style: {
      padding: "12px 16px",
      fontSize: 11,
      fontWeight: 600
    }
  }, "\u6E05\u9664")), /*#__PURE__*/React.createElement("div", {
    className: "field-label"
  }, "\u5716\u7247\u5340\u57DF\u5E95\u8272"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      marginTop: 6
    }
  }, ["#222230", "#181828", "#152525", "#1e1a14", "#251530", "#121828", "#2a2a2a", "#333340"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => set("imgColor", c),
    style: {
      width: 28,
      height: 28,
      borderRadius: 4,
      background: c,
      border: P.imgColor === c ? "2px solid #7070a0" : "1px solid #2a2a3a",
      cursor: "pointer",
      transition: "all .15s"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: P.imgColor || "#222230",
    onChange: e => set("imgColor", e.target.value),
    style: {
      width: 28,
      height: 28,
      border: "1px solid #2a2a3a",
      borderRadius: 4,
      cursor: "pointer",
      background: "transparent",
      padding: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u9801\u78BC\u986F\u793A")), /*#__PURE__*/React.createElement("button", {
    className: `btn${P.showPageNum ? " active" : ""}`,
    onClick: () => set("showPageNum", !P.showPageNum),
    style: {
      width: "100%",
      padding: "10px",
      fontSize: 11,
      fontWeight: 600
    }
  }, P.showPageNum ? "顯示頁碼 (" + String(curIdx + 1) + "/" + totalPages + ")" : "不顯示頁碼")), tab === "style" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Sec, null, "\u5B57\u578B"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, Object.entries(FONT_CATS).map(([cat, fonts]) => /*#__PURE__*/React.createElement("div", {
    key: cat
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenCat(openCat === cat ? null : cat),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      borderBottom: "1px solid #1a1a24",
      color: "#7070a0",
      padding: "10px 0",
      fontSize: 11,
      fontWeight: 600,
      cursor: "pointer",
      textAlign: "left",
      letterSpacing: 2,
      display: "flex",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", null, cat), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#404066",
      transform: openCat === cat ? "rotate(90deg)" : "none",
      transition: "transform 0.2s",
      fontSize: 14
    }
  }, "\u203A")), openCat === cat && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "6px 0",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      animation: "fi 0.15s ease"
    }
  }, fonts.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    onClick: () => setMulti({
      fontHead: f,
      fontBody: f
    }),
    style: {
      background: P.fontHead === f ? "#1a1a28" : "transparent",
      border: "none",
      borderRadius: 6,
      color: P.fontHead === f ? "#d0d0e0" : "#7070a0",
      padding: "10px 12px",
      fontSize: 15,
      fontFamily: `"${f}",sans-serif`,
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all .15s"
    }
  }, /*#__PURE__*/React.createElement("span", null, f), P.fontHead === f && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#7070a0"
    }
  }, ICO.chk))))))), /*#__PURE__*/React.createElement(Sec, null, "\u5B57\u7D1A"), /*#__PURE__*/React.createElement(Sld, {
    label: "\u6A19\u984C\u5B57\u7D1A",
    value: P.headSize,
    min: 14,
    max: 120,
    step: 1,
    onChange: e => set("headSize", +e.target.value),
    sfx: "px"
  }), P.pageType === "cover" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sld, {
    label: "\u6578\u5B57\u5B57\u7D1A",
    value: P.numSize,
    min: 40,
    max: 200,
    step: 1,
    onChange: e => set("numSize", +e.target.value),
    sfx: "px"
  }), /*#__PURE__*/React.createElement(Sld, {
    label: "\u6A19\u7C64\u5B57\u7D1A",
    value: P.topSize,
    min: 8,
    max: 24,
    step: 1,
    onChange: e => set("topSize", +e.target.value),
    sfx: "px"
  }), /*#__PURE__*/React.createElement(Sld, {
    label: "\u526F\u6A19\u5B57\u7D1A",
    value: P.subSize,
    min: 8,
    max: 24,
    step: 1,
    onChange: e => set("subSize", +e.target.value),
    sfx: "px"
  })), P.pageType === "quote" && /*#__PURE__*/React.createElement(Sld, {
    label: "\u51FA\u8655\u5B57\u7D1A",
    value: P.subSize,
    min: 8,
    max: 28,
    step: 1,
    onChange: e => set("subSize", +e.target.value),
    sfx: "px"
  }), P.pageType === "cta" && /*#__PURE__*/React.createElement(Sld, {
    label: "\u6A19\u7C64\u5B57\u7D1A",
    value: P.topSize,
    min: 8,
    max: 28,
    step: 1,
    onChange: e => set("topSize", +e.target.value),
    sfx: "px"
  }), ["img-top", "text-top", "side-lr", "side-rl", "list"].includes(P.pageType) && /*#__PURE__*/React.createElement(Sld, {
    label: "\u5167\u6587\u5B57\u7D1A",
    value: P.bodySize || 15,
    min: 10,
    max: 28,
    step: 1,
    onChange: e => set("bodySize", +e.target.value),
    sfx: "px"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Sec, null, "\u5F37\u8ABF\u8272")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginBottom: 16
    }
  }, ACCENTS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => set("accent", c),
    style: {
      width: 28,
      height: 28,
      borderRadius: 4,
      background: c,
      border: P.accent === c ? "2px solid #9090c0" : "1px solid #2a2a3a",
      cursor: "pointer",
      transition: "all .15s"
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: P.accent,
    onChange: e => set("accent", e.target.value),
    style: {
      width: 28,
      height: 28,
      border: "1px solid #2a2a3a",
      borderRadius: 4,
      cursor: "pointer",
      background: "transparent",
      padding: 0
    }
  })), /*#__PURE__*/React.createElement(Sec, null, "\u6587\u5B57\u984F\u8272"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap",
      marginBottom: 8
    }
  }, ["#ffffff", "#e8e8f0", "#e0f0f0", "#e8e0d4", "#f0e0f0", "#d0e0f8", "#c0c0cc", "#8a8a7a", "#3a3a3a", "#2c2c2c", "#1a1a1a", "#00ff41"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => set("textColor", c),
    style: {
      width: 28,
      height: 28,
      borderRadius: 4,
      background: c,
      border: P.textColor === c ? "2px solid #9090c0" : "1px solid #2a2a3a",
      cursor: "pointer"
    }
  }))), (() => {
    const cr = contrastRatio(P.textColor, P.bgColor);
    const ok = cr >= 4.5;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        fontSize: 10,
        fontFamily: "'Space Mono',monospace",
        color: ok ? "#7bed9f" : "#ffb86b"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u5C0D\u6BD4 ", cr.toFixed(1), ":1 ", ok ? "✓ 清晰" : "⚠ 偏低"), !ok && /*#__PURE__*/React.createElement("button", {
      className: "btn",
      onClick: () => set("textColor", bestTextColor(P.bgColor)),
      style: {
        padding: "3px 9px",
        fontSize: 9,
        letterSpacing: 1
      }
    }, "\u81EA\u52D5\u4FEE\u6B63"));
  })(), P.pageType === "cover" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Sec, null, "\u88DD\u98FE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 5
    }
  }, [{
    k: "none",
    l: "無"
  }, {
    k: "line",
    l: "/ 線條"
  }, {
    k: "dot",
    l: "* 圓點"
  }, {
    k: "bracket",
    l: "[ ] 方框"
  }, {
    k: "frame",
    l: "外框"
  }, {
    k: "corners",
    l: "⌜⌟ 四角"
  }, {
    k: "grid",
    l: "+ 格線"
  }, {
    k: "diagonal",
    l: "斜角"
  }].map(d => /*#__PURE__*/React.createElement("button", {
    key: d.k,
    className: `btn${P.decoStyle === d.k ? " active" : ""}`,
    onClick: () => set("decoStyle", d.k),
    style: {
      padding: "8px 4px",
      fontSize: 10,
      fontWeight: 600
    }
  }, d.l))))), tab === "bg" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Sec, null, "\u80CC\u666F\u8272"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 6,
      marginBottom: 20
    }
  }, BG_LIST.map((b, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => set("bgColor", b),
    style: {
      background: b,
      border: P.bgColor === b ? "2px solid #7070a0" : "1px solid #2a2a3a",
      borderRadius: 6,
      height: 44,
      cursor: "pointer",
      transition: "all 0.2s"
    }
  }))), /*#__PURE__*/React.createElement(Sec, null, "\u914D\u8272\u7D44\u5408"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 5,
      marginBottom: 20
    }
  }, COLOR_COMBOS.map((c, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setMulti(c),
    style: {
      height: 36,
      borderRadius: 6,
      cursor: "pointer",
      border: "1px solid #2a2a3a",
      background: c.bgColor,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.2s"
    },
    onMouseEnter: e => e.currentTarget.style.transform = "scale(1.08)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 3,
      left: "50%",
      transform: "translateX(-50%)",
      width: 14,
      height: 4,
      borderRadius: 2,
      background: c.accent
    }
  })))), /*#__PURE__*/React.createElement(Sec, null, "\u81EA\u8A02"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: P.bgColor?.startsWith?.("#") ? P.bgColor : "#000000",
    onChange: e => set("bgColor", e.target.value),
    style: {
      width: 36,
      height: 28,
      border: "1px solid #2a2a3a",
      borderRadius: 4,
      cursor: "pointer",
      background: "transparent",
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: "#5a5a78",
      fontFamily: "'Space Mono',monospace"
    }
  }, "\u7D14\u8272")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: P.bgColor,
    onChange: e => set("bgColor", e.target.value),
    placeholder: "linear-gradient(135deg, #color1, #color2)",
    className: "field-input",
    style: {
      fontSize: 11,
      fontFamily: "'Space Mono',monospace"
    }
  }))))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#16161e",
      border: "1px solid #2a2a3a",
      borderRadius: 8,
      padding: "10px 18px",
      fontSize: 12,
      color: "#d0d0e0",
      fontWeight: 600,
      boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
      zIndex: 200,
      animation: "fi 0.2s ease",
      fontFamily: "'Noto Sans TC',sans-serif"
    }
  }, toast));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));

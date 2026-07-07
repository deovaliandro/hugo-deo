window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  options: {
    renderActions: {
      addMenu: [],
    },
  },
  chtml: {
    scale: 1,
    matchFontHeight: true,
  },
};
const toButton = (button) => {
  const meta = `data-type="button"
  data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div class="button ${button.active ? "active" : ""}"
    ${meta}>
        <span class="material-icons" ${meta}> ${button.icon} </span>
  </div>
    `;
};

export const createToolbar = (state) => {
  console.log("render");
  const buttons = [
    {
      icon: "format_align_left",
      active: state["textAlign"] === "left",
      value: {
        textAlign: state["textAlign"] === "left" ? "initial" : "left",
      },
    },
    {
      icon: "format_align_center",
      active: state["textAlign"] === "center",
      value: {
        textAlign: state["textAlign"] === "center" ? "initial" : "center",
      },
    },
    {
      icon: "format_align_right",
      active: state["textAlign"] === "right",
      value: {
        textAlign: state["textAlign"] === "right" ? "initial" : "right",
      },
    },
    {
      icon: "format_bold",
      active: state["fontWeight"] === "bold",
      value: {
        fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold",
      },
    },
    {
      icon: "format_italic",
      active: state["fontStyle"] === "italic",
      value: {
        fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic",
      },
    },
    {
      icon: "format_underlined",
      active: state["textDecoration"] === "underlined",
      value: {
        textDecoration:
          state["textDecoration"] === "underlined" ? "normal" : "underlined",
      },
    },
  ];

  return buttons.map(toButton).join("");
};

import React from "react";

const Message = ({ bg = "light", color = "black", children }) => (
  <div className={`my1 p2 h5 bg-${bg} ${color} rounded`}>{children}</div>
);

export default Message;

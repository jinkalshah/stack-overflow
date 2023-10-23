import React from "react";

const WidgetTags = () => {
  const tags = [
    "c",
    "c++",
    "Java",
    "Javascript",
    "HTML",
    "CSS",
    "express",
    "Node.js",
    "python",
    "mongodb",
    "react.js",
  ];
  return (
    <div className="widget-tags">
      <h3>Watched tags</h3>
      <div className="widget-tags-div">
        {tags.map((tag) => {
          return <p key={tag}>{tag}</p>;
        })}
      </div>
    </div>
  );
};

export default WidgetTags;

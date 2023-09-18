import React from "react";
// for stylish image collage
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImg";
const MasonryImgGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
      {/* gutter is space/margin between images */}
        {galleryImages.map((item, index) => (
          <img
          className="masonry_img"
            src={item}
            alt=""
            key={index}
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImgGallery;

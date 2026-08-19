import React from 'react'

export default function ProductImages({ product, images, selectedImage, setSelectedImage }) {
  const imageList = Array.isArray(images) ? images : [];

  return (
        <div className="imgs_item">
               <div className="big_img">
                 <img
                   src={selectedImage || imageList[0] || ""}
                   alt={product?.title || "Product image"}
                 />
               </div>
               <div className="sm_img">
                 {imageList.map((img, index) => (
                   <img
                     key={index}
                     src={img}
                     alt={product?.title || "Product image"}
                     onClick={() => setSelectedImage(img)}
                   />
                 ))}
               </div>
             </div>
    )
}

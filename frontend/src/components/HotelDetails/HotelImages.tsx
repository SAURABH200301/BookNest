import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";

export interface ImageListInterface {
  img: string;
  title: string;
}

export default function HotelImages({ images }: { images: string }) {
  const [itemData, setItemData] = useState<ImageListInterface[]>([]);
  useEffect(() => {
    if(!images) return;
    const imagesList = Array.from({ length: 6 }, (_, i) => ({
      img: images,
      title: `Image ${i + 1}`,
    }));
    setItemData(imagesList);
  }, [images]);
  return (
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="woven"
      cols={3}
      gap={8}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.title}>
          <img
            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=161&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

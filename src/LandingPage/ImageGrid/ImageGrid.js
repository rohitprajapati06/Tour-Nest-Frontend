import React, { useEffect, useState } from "react";
import "./ImageGrid.css";

const ImageGrid = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 4000); // Wait 4 seconds before showing the text

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const images = [
    "https://cdn.britannica.com/36/162636-050-932C5D49/Colosseum-Rome-Italy.jpg",
    "https://i.pinimg.com/736x/74/ed/c5/74edc500187a5b0cab2c8332c3236009.jpg",
    "https://cdn.pixabay.com/photo/2018/08/18/22/10/belgium-3615566_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/05/28/10/05/kunsthistorisches-museum-6290417_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/05/20/18/16/istanbul-775926_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/03/28/14/33/rome-4087275_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/03/03/03/17/the-national-palace-museum-4897428_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/08/28/18/20/viewpoint-3638146_960_720.jpg",
    "https://cdn.pixabay.com/photo/2024/09/19/07/46/versailles-9057981_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/05/03/20/01/mumbai-1370023_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/05/04/02/24/bali-7969001_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/09/26/08/57/cruise-3703999_960_720.jpg",
    "https://cdn.pixabay.com/photo/2023/02/13/17/30/composition-7787854_960_720.jpg",
    "https://plus.unsplash.com/premium_photo-1719430569503-338fc89eb21f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWlmZmVsfGVufDB8fDB8fHww",
    "https://cdn.pixabay.com/photo/2022/04/06/20/30/big-ben-7116305_1280.jpg",
    "https://r1.ilikewallpaper.net/iphone-12-pro-max-wallpapers/download-113056/Great-Wall-Of-China-Tourism-Problems-%E2%80%93-pany-and-T.jpg",
    "https://cdn.pixabay.com/photo/2014/05/22/16/06/london-eye-351203_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/02/06/18/43/santorini-4825173_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/08/26/16/15/taj-mahal-5519945_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/07/23/15/33/museum-5431661_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/27/10/19/opera-house-2981044_960_720.jpg",
    "https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg",
    "https://cdn.mos.cms.futurecdn.net/YMa7Wx2FyjQFUjEeqa72Rm-1200-80.jpg",
    "https://cdn.pixabay.com/photo/2020/01/31/21/26/brazil-4809014_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/03/28/12/58/grenade-1285671_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/01/06/13/08/mountain-3064979_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/04/20/51/stonehenge-517151_1280.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg/1200px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941.jpg",
  ];

  return (
    <div>
      {/* Background audio */}
      <audio src="/audio/summer-trip-116233.mp3" autoPlay muted loop></audio>

      {/* Fixed text with conditional class */}
      <div className={`image-grid-fixed-text ${showText ? "image-grid-show" : ""}`}>
        Have you visited this Beautiful Destinations yet?
      </div>

      <div className="image-grid-row">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="image-grid-column" key={index}>
            {images.slice(index * 7, index * 7 + 7).map((image, i) => (
              <img key={i} src={image} alt={`Destination ${i + 1}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import type { Photo } from "@/types/photo.type";

import styles from "../photo-list.module.css";

export function PhotoDetails({ photo }: { photo: Photo }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(false);
  }, [photo]);

  return (
    <div className={styles.listItem}>
      <Image
        aria-label={photo.title}
        src={photo.thumbnailUrl}
        alt={photo.title}
        width={150}
        height={150}
        className={styles.photo}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button
          onClick={() => {
            void axios
              .post<Photo>("/api/favorite", { ...photo, favorite })
              .then((response) => {
                setFavorite(response.data.favorite);
              });
          }}
        >
          {favorite ? "Remove from Favorites" : "Add To Favorites"}
        </button>
      </div>
    </div>
  );
}

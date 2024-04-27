import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import type { Photo } from "@/types/photo.type";

import { PhotoDetails } from "./photo-details.component";

import styles from "../photo-list.module.css";

interface ListProps {
  refresh: number;
  name: string;
}

export function List({ refresh, name }: ListProps) {
  const [loading, setLoading] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading((l) => l + 1);

      try {
        const response = await axios.get<Photo[]>(`/api/photos?name=${name}`);
        setPhotos(response.data);
        setError("");
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data);
        }
      } finally {
        setLoading((l) => l - 1);
      }
    }

    // async function load() {
    //   setLoading((l) => l + 1);

    //   try {
    //     const r = await fetch(`/api/photos?name=${name}`);
    //     const json = await r.json();

    //     if (!r.ok) {
    //       throw new Error(json.message);
    //     }

    //     setPhotos(json);
    //     setError("");
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       setError(error.message);
    //     }
    //   } finally {
    //     setLoading((l) => l - 1);
    //   }
    // }

    void load();
  }, [refresh, name]);

  return (
    <div>
      <div className={styles.absolute}>
        {error ? <div className={styles.error}>{error}</div> : null}
        {loading ? <div className={styles.loading}>Loading...</div> : null}
      </div>

      {photos.map((photo) => (
        <PhotoDetails photo={photo} key={photo.id} />
      ))}
    </div>
  );
}

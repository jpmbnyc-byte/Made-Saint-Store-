"use client";

import { useEffect, useState } from "react";
import {
  loadBag,
  loadCloset,
  writeBag,
  writeCloset,
  type BagData,
  type ClosetData,
  type Store,
} from "@/lib/closet";

function browserStore(): Store {
  return {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key, value) => {
      localStorage.setItem(key, value);
    },
  };
}

function publish() {
  window.dispatchEvent(new Event("ms-store"));
}

export function useCloset() {
  const [data, setData] = useState<ClosetData>({ version: 1, pieces: [], groups: [] });
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const sync = () => setData(loadCloset(browserStore()));
    sync();
    window.addEventListener("ms-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ms-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function commit(next: ClosetData) {
    try {
      writeCloset(browserStore(), next);
      setWarning("");
      publish();
    } catch {
      setData(next);
      setWarning("This browser is not storing the closet. It will stay on this page only, and it will not follow you to another device.");
    }
  }

  return { data, warning, commit };
}

export function useBag() {
  const [data, setData] = useState<BagData>({ version: 1, items: [] });

  useEffect(() => {
    const sync = () => setData(loadBag(browserStore()));
    sync();
    window.addEventListener("ms-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("ms-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function commit(next: BagData) {
    try {
      writeBag(browserStore(), next);
      publish();
    } catch {
      setData(next);
    }
  }

  return { data, commit };
}

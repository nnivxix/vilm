"use client";
import { useEffect } from "react";

interface Head {
  title: string;
  meta?: {
    [key in string]: string;
  };
}

const useHead = ({ title, meta }: Head) => {
  const updateMetaTag = (name: string, content: string) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (element) {
      element.setAttribute("content", content);
    } else {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      element.setAttribute("content", content);
      document.head.appendChild(element);
    }
  };
  useEffect(() => {
    document.title = title;
    if (meta) {
      Object.keys(meta).forEach((name) => {
        updateMetaTag(name, meta[name]);
      });
    }
  }, [title, meta]);
};

export default useHead;

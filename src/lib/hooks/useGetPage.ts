import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export const useGetPage = () => {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState<any>();

  // If there is no page selected from the user menu
  // Get all the pages from localStorage and select the first page_id
  // Otherwise logout current user
  useEffect(() => {
    if (!router.query.page_id) {
      const value = localStorage.getItem("pages");
      const currentPageValue = localStorage.getItem("currentPage");

      if (value) {
        if (!currentPageValue) {
          const parsed = JSON.parse(value || "[]") || [];

          if (parsed.length > 0) {
            setPage(parsed[0].page_id);
          } else {
            logOut();
          }
        } else {
          // On refresh select previously selected page
          setPage(currentPageValue);
        }
      } else {
        logOut();
      }
    }
  }, []);

  useEffect(() => {
    if (router.query.page_id) {
      setPage(router.query.page_id);
    }
  }, [router.query.page_id]);

  const setPage = (pageId: any) => {
    setSelectedPage(pageId);
    localStorage.setItem("currentPage", pageId);
    router.push({query: {page_id: pageId}});
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("pages");

    router.push("/authentication/login");
  };

  return {selectedPage};
};

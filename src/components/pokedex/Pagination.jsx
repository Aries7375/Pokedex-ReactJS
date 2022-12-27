import React, { useEffect, useState } from "react";
import "./styles/pagination.css";

const Pagination = ({ page, maxPage, setPage }) => {
  const pagesPerBlock = 5;
  const currentBlock = Math.ceil(page / pagesPerBlock);
  const maxBlock = Math.ceil(maxPage / pagesPerBlock);
  const arrPages = [];
  const initialPage = (currentBlock - 1) * pagesPerBlock + 1;
  const finalPage =
    maxBlock == currentBlock ? maxPage : currentBlock * pagesPerBlock;
  for (let i = initialPage; i <= finalPage; i++) {
    arrPages.push(i);
  }
  const capturePage = (e) => {
    setPage(e);
  };
  const previousPage = () => {
    if (page - 1 !== 0) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page + 1 <= maxPage) {
      setPage(page + 1);
    }
  };
  return (
    <div className="pagination-cont">
      <ul className="pagination__list">
        <li className="page-active" onClick={previousPage}>
          <i className="fa-solid fa-angles-left"></i>
        </li>
        {arrPages.map((event) => (
          <li
            className={`${page === event && "page-active"}`}
            key={event}
            onClick={() => capturePage(event)}
          >
            {event}
          </li>
        ))}
        <li onClick={nextPage} className="page-active">
          <i className="fa-solid fa-angles-right"></i>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

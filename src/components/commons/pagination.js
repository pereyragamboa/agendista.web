import React from 'react';
import FeatherIcon from './featherIcon';

/**
 * Checks that a value is from the specified type.
 * @param value
 * @param type
 * @param defaultValue
 * @return {undefined}
 */
function validate(value, type, defaultValue = null) {
  return typeof value === type ? value : defaultValue;
}

/**
 * Element identifiers.
 * @type {{FIRST_PAGE: string, PREVIOUS_PAGE: string, CURRENT_PAGE: string, NEXT_PAGE: string, LAST_PAGE: string}}
 */
export const Ids = {
  FIRST_PAGE: "ag-pagination-first-link",
  PREVIOUS_ELLIPSIS: "ag-pagination-prev-ellipsis",
  PREVIOUS_PAGE: "ag-pagination-prev-link",
  PREVIOUS_PAGE_BUTTON: "ag-pagination-prev-button",
  CURRENT_PAGE: "ag-pagination-curr-page",
  NEXT_PAGE: "ag-pagination-next-page",
  NEXT_ELLIPSIS: "ag-pagination-next-ellipsis",
  NEXT_PAGE_BUTTON: "ag-pagination-next-button",
  LAST_PAGE: "ag-pagination-last-page"
};

/**
 * Bulma pagination component.
 *
 * @param props.page Current page.
 * @param props.pageCount Total available pages.
 * @return {*}
 * @constructor
 */
export default (props) => {
  const PAGE_ONE = 1;

  // Validates that props.page is a positive number larger than 1
  let page = Math.round(validate(props.page, 'number', PAGE_ONE));
  if (page < PAGE_ONE) page = PAGE_ONE;
  // Validates that props.pageCount is a positive number larger than props.page
  let pageCount = Math.round(validate(props.pageCount, 'number', page));
  if (pageCount < page) pageCount = page;
  const isFirstPage = (page === PAGE_ONE);
  const isLastPage = (page === pageCount);

  return <nav className="pagination is-centered" role="navigation" aria-label="pagination">
    <div id={Ids.PREVIOUS_PAGE_BUTTON} className="pagination-previous"><FeatherIcon iconName="arrow-left"/>Anterior</div>
    <div id={Ids.NEXT_PAGE_BUTTON} className="pagination-next">Siguiente<FeatherIcon iconName="arrow-right"/></div>
    <ul className="pagination-list">
      {
        page > 2 && <li id={Ids.FIRST_PAGE}>
          <div className="pagination-link" aria-label="Goto page 1">1</div>
        </li>
      }
      {
        page - 1 > 2 && <li id={Ids.PREVIOUS_ELLIPSIS}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      }
      {
        page > 1 && <li id={Ids.PREVIOUS_PAGE}>
          <div className="pagination-link is-hidden-mobile"
               aria-label={`Go to page ${page - 1}`}>{page - 1}</div>
        </li>
      }
      <li id={Ids.CURRENT_PAGE}>
        <div className="pagination-link is-current"
             aria-label={`Page ${page}`} aria-current="page">{page}</div>
      </li>
      {
        page < pageCount && <li id={Ids.NEXT_PAGE}>
          <div className="pagination-link is-hidden-mobile"
               aria-label={`Go to page ${page + 1}`}>{page + 1}</div>
        </li>
      }
      {
        pageCount - page > 2 && <li id={Ids.NEXT_ELLIPSIS}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      }
      {
        pageCount - page > 1 && <li id={Ids.LAST_PAGE}>
          <div className="pagination-link" aria-label="Goto last page">{props.pageCount}</div>
        </li>
      }
    </ul>
  </nav>
};
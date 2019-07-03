import React from 'react';
import FeatherIcon from './featherIcon';

function validate(value, type, defaultValue = undefined) {
  return typeof value === type ? value : defaultValue;
}

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

  return <nav className="pagination is-centered" role="navigation" aria-label="pagination">
    <div className="pagination-previous"><FeatherIcon iconName="arrow-left"/>Anterior</div>
    <div className="pagination-next">Siguiente<FeatherIcon iconName="arrow-right"/></div>
    <ul className="pagination-list">
      <li><div className="pagination-link" aria-label="Goto page 1">1</div></li>
      {
        page <= 2 ? '' : <li><span className="pagination-ellipsis">&hellip;</span></li>
      }
      {
        page <= 3 ? '' :
            <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 5">{page - 1}</div></li>
      }
      <li><div className="pagination-link is-current" aria-label="Page 6" aria-current="page">{page}</div></li>
      {
        pageCount - page > 2 ?
            <li><div className="pagination-link is-hidden-mobile" aria-label="Goto page 7">{page + 1}</div></li> : ''
      }
      {
        pageCount - page > 1 ? <li><span className="pagination-ellipsis">&hellip;</span></li> : ''
      }
      <li><div className="pagination-link" aria-label="Goto page 11">{props.pageCount}</div></li>
    </ul>
  </nav>
};
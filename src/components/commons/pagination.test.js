import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Pagination, { Ids } from './pagination';
import TestContainer from '../testHelpers/testContainer';

const testData = [
    [1, 1, { first: false, prevEllipsis: false, prev: false, next: false, nextEllipsis: false, last: false }],
    [1, 2, { first: false, prevEllipsis: false, prev: false, next: true, nextEllipsis: false, last: false }],
    [1, 3, { first: false, prevEllipsis: false, prev: false, next: true, nextEllipsis: false, last: true }],
    [2, 3, { first: false, prevEllipsis: false, prev: true, next: true, nextEllipsis: false, last: false }],
    [3, 3, { first: true, prevEllipsis: false, prev: true, next: false, nextEllipsis: false, last: false }],
    [1, 20, { first: false, prevEllipsis: false, prev: false, next: true, nextEllipsis: true, last: true }],
    [2, 20, { first: false, prevEllipsis: false, prev: true, next: true, nextEllipsis: true, last: true }],
    [5, 20, { first: true, prevEllipsis: true, prev: true, next: true, nextEllipsis: true, last: true }],
    [15, 20, { first: true, prevEllipsis: true, prev: true, next: true, nextEllipsis: true, last: true }],
    [19, 20, { first: true, prevEllipsis: true, prev: true, next: true, nextEllipsis: false, last: false }],
    [20, 20, { first: true, prevEllipsis: true, prev: true, next: false, nextEllipsis: false, last: false }],
];

describe("<Pagination> tests", () => {
  describe.each(testData)("Page %i of %i", (page, pageCount, results) => {
    const container = new TestContainer();
    beforeAll(() => {
      container.createContainer();
      act(() => {
        render(<Pagination page={page} pageCount={pageCount}/>, container.getContainer());
      });
    });

    afterAll(() => {
      container.disposeContainer();
    });

    test("Shows first page link", () => {
      expect(document.getElementById(Ids.FIRST_PAGE) === null).toBe(!results.first);
    });
    test("Shows ellipsis between first and previous links", () => {
      expect(document.getElementById(Ids.PREVIOUS_ELLIPSIS) === null).toBe(!results.prevEllipsis);
    });
    test("Shows previous page link", () => {
      expect(document.getElementById(Ids.PREVIOUS_PAGE) === null).toBe(!results.prev);
    });
    test("Shows next page link", () => {
      expect(document.getElementById(Ids.NEXT_PAGE) === null).toBe(!results.next);
    });
    test("Shows ellipsis between next and last links", () => {
      expect(document.getElementById(Ids.NEXT_ELLIPSIS) === null).toBe(!results.nextEllipsis);
    });
    test("Shows last page link", () => {
      expect(document.getElementById(Ids.LAST_PAGE) === null).toBe(!results.last);
    });
  });
});
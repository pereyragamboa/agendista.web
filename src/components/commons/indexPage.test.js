import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Index, { Ids as IndexIds } from './indexPage';
import NavbarMenuItem from './navbars/navbarMenuItem';
import TestContainer from '../testHelpers/testContainer';
import { expectIconRender, expectTextInElement } from "../testHelpers/expectFunctions";

const ITEM_IDS = [ "One", "Two" ];
const BRAND_IDS = [ "About", "This", "Site" ];
const TEST_BRAND = "Brand title";
const brandItems = <> {
      BRAND_IDS.map(brand => <NavbarMenuItem key={brand} id={brand} caption={brand}/>)
    } </>;
const endItems = <> {
      ITEM_IDS.map(item => <NavbarMenuItem key={item} id={item} caption={item}/>)
    } </>;
let testContainer = new TestContainer();

describe("<Index/> tests", () => {
  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Simple index components", () => {
    test("shows param brand items", () => {
      act(() => {
        render(<Index featherIcon="feather" brand={TEST_BRAND}>
          <section>Component</section>
        </Index>, testContainer.getContainer())
      });
      expectIconRender();
      expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, TEST_BRAND);
    });

    test("shows only brand title", () => {
      act(() => {
        render(<Index brand={TEST_BRAND}/>, testContainer.getContainer())
      });
      expectIconRender(0);
      expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, TEST_BRAND);
    });

    test("shows only brand icon", () => {
      act(() => {
        render(<Index featherIcon="feather"/>, testContainer.getContainer())
      });
      expectIconRender(1);
      expect(document.getElementById(IndexIds.NAVBAR_BRAND_TITLE)).toBeNull();
    });
  });

  describe("Index with items", () => {
    test("shows only end items", () => {
      act(() => {
        render(<Index endItems={endItems}>
          <section>Index</section>
        </Index>, testContainer.getContainer())
      });
      expectNoDefaultBrand();
      expectEndItems();
    });

    test("shows only brand items", () => {
      act(() => {
        render(<Index brandItems={brandItems}><section>Index</section></Index>, testContainer.getContainer())
      });
      expectNoDefaultBrand();
      expectBrandItems();
    });

    test("shows all items", () => {
      act(() => {
        render(<Index brandItems={brandItems} endItems={endItems}>
          <section>Index</section>
        </Index>, testContainer.getContainer());
      });
      expectNoDefaultBrand();
      expectBrandItems();
      expectEndItems();
    });

    test("shows brand items instead of brand props", () => {
      act(() => {
        render(<Index brand={TEST_BRAND} brandItems={brandItems} endItems={endItems} featherIcon="feather">
          <section>Index</section>
        </Index>, testContainer.getContainer());
      });
      expectNoDefaultBrand();
      expectBrandItems();
    });

    function expectNoDefaultBrand() {
      expect(document.getElementById(IndexIds.NAVBAR_BRAND_ICON)).toBeNull();
      expect(document.getElementById(IndexIds.NAVBAR_BRAND_TITLE)).toBeNull();
    }

    function expectItems(items) {
      for(let item of items) {
        expectTextInElement(item, item);
      }
    }

    function expectBrandItems() { expectItems(BRAND_IDS); }

    function expectEndItems() { expectItems(ITEM_IDS); }
  });
});
import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import getIndex, { Ids as IndexIds } from './getIndex';
import NavbarMenuItem from './navbars/navbarMenuItem';
import TestContainer from '../testHelpers/testContainer';
import { expectIconRender, expectTextInElement } from "../testHelpers/expectFunctions";

const ITEM_IDS = [ "One", "Two" ];
const BRAND_IDS = [ "About", "This", "Site" ];
const TEST_BRAND = "Brand title";
const Navbar = {
  brandItems: <> {
      BRAND_IDS.map(brand => <NavbarMenuItem key={brand} id={brand} caption={brand}/>)
    } </>,
  endItems: <> {
      ITEM_IDS.map(item => <NavbarMenuItem key={item} id={item} caption={item}/>)
    } </>
};
let testContainer = new TestContainer();

describe("getIndex() tests", () => {
  beforeEach(testContainer.createContainer);

  afterEach(testContainer.disposeContainer);

  describe("Simple index components", () => {
    const SimpleIndex = getIndex(<section>Component</section>);

    test("shows param brand items", () => {
      act(() => {
        render(<SimpleIndex featherIcon="feather" brand={TEST_BRAND}/>, testContainer.getContainer())
      });
      expectIconRender();
      expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, TEST_BRAND);
    });

    test("shows only brand title", () => {
      act(() => {
        render(<SimpleIndex brand={TEST_BRAND}/>, testContainer.getContainer())
      });
      expectIconRender(0);
      expectTextInElement(IndexIds.NAVBAR_BRAND_TITLE, TEST_BRAND);
    });

    test("shows only brand icon", () => {
      act(() => {
        render(<SimpleIndex featherIcon="feather"/>, testContainer.getContainer())
      });
      expectIconRender(1);
      expect(document.getElementById(IndexIds.NAVBAR_BRAND_TITLE)).toBeNull();
    });
  });

  describe("Index with items", () => {
    test("shows only end items", () => {
      const Index = getIndex(<section>Index</section>, { endItems: Navbar.endItems });
      act(() => {
        render(<Index/>, testContainer.getContainer())
      });
      expectNoDefaultBrand();
      expectEndItems();
    });

    test("shows only brand items", () => {
      const Index = getIndex(<section>Index</section>, { brandItems: Navbar.brandItems });
      act(() => {
        render(<Index/>, testContainer.getContainer())
      });
      expectNoDefaultBrand();
      expectBrandItems();
    });

    test("shows all items", () => {
      const Index = getIndex(<section>Index</section>, Navbar);
      act(() => {
        render(<Index/>, testContainer.getContainer());
      });
      expectNoDefaultBrand();
      expectBrandItems();
      expectEndItems();
    });

    test("shows brand items instead of brand props", () => {
      const Index = getIndex(<section>Index</section>, Navbar);
      act(() => {
        render(<Index brand={TEST_BRAND} featherIcon="feather"/>, testContainer.getContainer());
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
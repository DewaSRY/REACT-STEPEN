import { render } from "@testing-library/react";
import { NavigationApps } from "./index";
describe("testing sideBar", () => {
  let suit: HTMLElement;
  beforeEach(() => {
    suit = render(
      <NavigationApps
        links={[
          {
            label: "hallo",
            path: "/",
            element: <h1>this is a the element</h1>,
          },
        ]}
      />
    ).container;
  });
  it("see the Side bar on document", () => {
    expect(suit).toMatchInlineSnapshot(`
      <div>
        <div>
          <div
            class="_link-container_5de29b"
          >
            <a
              class="_links_5de29b _link-active_5de29b"
              href="/"
            >
              /
            </a>
          </div>
          <div>
            <h1>
              this is a the element
            </h1>
          </div>
        </div>
      </div>
    `);
  });
});

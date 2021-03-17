import { Book, Close, ForwardArrow, Search } from "../../icons";

import { Component, Element, Listen, Prop, State, h } from "@stencil/core";
import Fuse from "fuse.js";

// import search indexes
import searchData from "../../pages/search_index.json";

type Component = {
  title: string;
  body: string[];
};

const options: Fuse.FuseOptions<Component> = {
  keys: ["title", "body"],
};

const fuse = new Fuse(searchData, options);

@Component({
  tag: "ionic-search",
  styleUrl: "search.css",
  shadow: false,
})
export class IonicSearch {
  @State() active = false;
  @State() query = "";
  @State() highlightIndex: number = null;
  @State() pending = 0;
  @State() results: any[] = null;
  @State() nonDocsResults: any[] = null;
  @State() nonDocsResultsActive = false;
  @State() dragStyles: {};
  @State() searchTimeout: NodeJS.Timeout = null;
  // @State() pane: HTMLDivElement;
  @Prop() mobile: boolean;
  @Element() el;

  dragY: number = null;
  startY: number = null;
  screenHeight: number = null;

  constructor() {
    this.activate = this.activate.bind(this);
    this.close = this.close.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.keyNavigation = this.keyNavigation.bind(this);
    this.resultClick = this.resultClick.bind(this);
  }

  @Listen("keydown", { target: "window" })
  handleKeyDown(ev) {
    if (ev.key === "/" || ev.code === "Slash" || (ev.metaKey && ev.key === "k")) {
      this.activate();
    }
  }

  // componentDidLoad() {
  //   this.pane = this.el.parentElement.querySelector('.mobile-nav__pane');
  // }

  activate() {
    this.active = true;
    this.el.classList.add("active");
    setTimeout(
      () => {
        this.el.querySelector("input").focus();
      },
      220,
      this,
    );
  }

  close() {
    clearTimeout(this.searchTimeout);
    this.active = false;
    this.el.classList.remove("active");
    this.el.querySelector("input").blur();
    setTimeout(
      () => {
        this.el.querySelector("input").value = "";
        this.results = this.nonDocsResults = this.highlightIndex = null;
      },
      220,
      this,
    );
  }

  async onKeyUp(e) {
    if (e.keyCode === 27) {
      this.close();
      return;
    }

    // don't search on arrow keypress
    if ([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
      return;
    }

    this.query = e.target.value;
    this.pending++;

    this.results = fuse.search(this.query);

    this.pending--;
    this.highlightIndex = null;
  }

  touchStart(e) {
    this.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.startY = Math.round(e.touches.item(0).screenY);
  }

  touchMove(e) {
    e.preventDefault();
    this.dragY = Math.max(0, Math.round(((e.touches.item(0).screenY - this.startY) / this.screenHeight) * 100));
    this.dragStyles = {
      transitionDuration: ".1s",
      transform: `translate3d(0, ${this.dragY}%, 0)`,
    };
    // window.requestAnimationFrame(()=> {
    //   const scale = ((3 * this.dragY / 100) + 97) / 100;
    //   this.pane.style.transform = `scale3d(${scale}, ${scale}, 1)`;
    //   this.pane.style['transition-duration'] = '.1s';
    // });
  }

  isFirefox() {
    return navigator.userAgent.indexOf("Firefox") !== -1;
  }

  touchEnd() {
    if (this.dragY > 30) {
      this.close();
    }
    this.dragY = null;
    this.startY = null;
    this.dragStyles = {};
  }

  keyNavigation(ev) {
    if (!this.results) return;

    if (ev.keyCode === 38) {
      ev.preventDefault();
      if (this.highlightIndex === 0) {
        this.el.querySelector("input").focus();
        this.highlightIndex = null;
      } else if (this.highlightIndex !== null && this.highlightIndex > 0) {
        this.highlightIndex--;
      }
    } else if (ev.keyCode === 40) {
      ev.preventDefault();
      if (this.highlightIndex === null) {
        this.highlightIndex = 0;
      } else if (
        this.highlightIndex !== null &&
        this.highlightIndex < this.results.length + this.nonDocsResults.length - 1
      ) {
        this.highlightIndex++;

        if (this.highlightIndex >= this.results.length && !this.nonDocsResultsActive) {
          this.nonDocsResultsActive = true;
        }
      }
    } else if (ev.keyCode === 13) {
      const link = this.el.querySelector("ul a.active");
      if (link) {
        this.resultClick({ url: link.href, id: link.dataset.id });
      }
    }
  }

  async resultClick(result, event?) {
    if (event) {
      event.preventDefault();
    }
    window.location = result.url;
  }

  getDefaultContent() {
    return (
      <div class="Search__Defaults">
        <div class="Search__Defaults__Section">
          <h4>Getting Started</h4>
          <ul>
            <li>
              <a href="/docs/installation/cli">
                <Book />
                <strong>Installation Guide</strong> | Installation
              </a>
            </li>
            <li>
              <a href="/docs/building/running">
                <Book />
                <strong>Running an App</strong> | Building
              </a>
            </li>
            <li>
              <a href="/docs/layout/structure">
                <Book />
                <strong>App Structure</strong> | Layout
              </a>
            </li>
            <li>
              <a href="/docs/theming/basics">
                <Book />
                <strong>Theming Basics</strong> | Theming
              </a>
            </li>
          </ul>
        </div>
        <div class="Search__Defaults__Section">
          <h4>Common topics</h4>
          <ul>
            <li>
              <a href="/docs/building/testing">
                <Book />
                <strong>Testing</strong> | Building
              </a>
            </li>
            <li>
              <a href="/docs/building/cross-platform#storage">
                <Book />
                <strong>Storage</strong> | Building
              </a>
            </li>
            <li>
              <a href="/docs/lifecycle/angular">
                <Book />
                <strong>Life Cycle Events</strong> | Angular
              </a>
            </li>
            <li>
              <a href="/docs/navigation/angular">
                <Book />
                <strong>Navigation</strong> | Angular
              </a>
            </li>
          </ul>
        </div>
        <div class="Search__Defaults__Section">
          <h4>UI Components</h4>
          <ul>
            <li>
              <a href="/api/clio-button">
                <Book />
                <strong>clio-button</strong> | Buttons
              </a>
            </li>
            <li>
              <a href="/api/clio-combo-button">
                <Book />
                <strong>clio-combo-button</strong> | Buttons
              </a>
            </li>
            <li>
              <a href="/api/clio-pill">
                <Book />
                <strong>clio-pill</strong> | Indicators
              </a>
            </li>
            <li>
              <a href="/api/clio-input">
                <Book />
                <strong>clio-input</strong> | Form Elements
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return [
      <div
        class={`search-box${this.active ? " active" : ""}`}
        style={this.dragStyles}
        onTouchMove={e => (this.results && this.results.length > 5 ? null : e.preventDefault())}
        onKeyDown={this.keyNavigation}
      >
        <input type="text" onKeyUp={this.onKeyUp} placeholder="Search Nova.." />

        <Search class={`search-static ${this.active ? " active" : ""}`} />

        {this.mobile && !this.isFirefox() ? (
          <div
            class="mobile-close"
            onClick={this.close}
            onTouchStart={this.touchStart}
            onTouchMove={this.touchMove}
            onTouchEnd={this.touchEnd}
          >
            <Close />
          </div>
        ) : (
          <ion-icon class={`close ${this.active ? " active" : ""}`} name="md-close" onClick={this.close}></ion-icon>
        )}

        <div class={`slot ${this.results === null ? "" : "hidden"}`}>{this.getDefaultContent()}</div>

        {this.results !== null ? (
          <div class="SearchResults">
            <ul>
              {this.results.map((result, i) => (
                <li>
                  <a
                    onClick={ev => this.resultClick(result, ev)}
                    href={result.url}
                    title={result.title}
                    data-id={result.id}
                    class={i === this.highlightIndex ? "active" : ""}
                  >
                    <Book />
                    <strong>{result.title}</strong>
                  </a>
                </li>
              ))}
              {this.results.length === 0 ? (
                <li>
                  <span class="no-results">No results</span>
                </li>
              ) : null}
            </ul>

            <div class={`SearchMore ${this.nonDocsResultsActive ? "active" : ""}`}>
              {this.nonDocsResults && this.nonDocsResults.length !== 0
                ? [
                    <a
                      class="SearchMore__link"
                      onClick={() => (this.nonDocsResultsActive = !this.nonDocsResultsActive)}
                    >
                      {this.nonDocsResults.length} Results outside docs <ForwardArrow />
                    </a>,
                    <ul class="SearchMore__list">
                      {this.nonDocsResults.map((result, i) => (
                        <li>
                          <a
                            onClick={ev => this.resultClick(result, ev)}
                            href={result.path}
                            title={result.title}
                            data-id={result.id}
                            class={i + this.results.length === this.highlightIndex ? "active" : ""}
                          >
                            <strong>{result.title}</strong>
                            <span innerHTML={result.highlight.sections}></span>
                          </a>
                        </li>
                      ))}
                    </ul>,
                  ]
                : null}
            </div>
          </div>
        ) : null}

        {this.pending > 0 ? <span class="searching"></span> : null}
      </div>,

      <div class={`SearchBtn ${this.active ? " active" : ""}`}>
        <Search class="SearchBtn__sm" onClick={this.active ? null : this.activate} />

        <div class="SearchBtn__lg" onClick={this.active ? null : this.activate}>
          <Search class="SearchBtn__lg__icon" />
          <span class="SearchBtn__lg__text">Search docs</span>
          <span class="SearchBtn__lg__key">/</span>
        </div>
      </div>,

      <div class={`backdrop ${this.active ? "active" : null}`} onClick={this.close}></div>,
    ];
  }
}

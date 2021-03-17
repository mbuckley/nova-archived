import { Component, Listen, Prop, State, h } from "@stencil/core";

@Component({
  tag: "docs-demo",
  styleUrl: "demo.css",
})
export class DocsDemo {
  @Prop() url: string;
  @Prop() source: string;
  @State() ionicMode = "md";

  iframe: HTMLIFrameElement;
  iframeLoaded = false;
  messageQueue: CustomEvent[] = [];

  @Listen("demoMessage", { target: "window" })
  async handleMessage(msg: CustomEvent) {
    this.iframeLoaded ? this.postMessage(msg) : this.messageQueue.push(msg);
  }

  postMessage({ detail }: CustomEvent) {
    try {
      this.iframe.contentWindow.postMessage(detail, "*");
    } catch (e) {} // tslint:disable-line
  }

  onIframeLoad = () => {
    this.messageQueue.forEach(this.postMessage.bind(this));
    this.messageQueue = [];
    this.iframeLoaded = true;
  };

  renderSourceLink() {
    return this.source ? (
      <a href={this.source} class="docs-demo-source" target="_blank" title="Demo Source">
        <ion-icon name="open" /> View Source
      </a>
    ) : null;
  }

  render() {
    if (!this.url) {
      return null;
    }

    return [
      <iframe
        loading="lazy"
        importance="low"
        onLoad={this.onIframeLoad}
        src={`${this.url}`}
        ref={node => {
          this.iframe = node as HTMLIFrameElement;
        }}
      />,

      this.renderSourceLink(),
    ];
  }
}

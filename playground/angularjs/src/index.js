import * as angular from "angular";
import "./main.scss";

// import the web components from core
import { applyPolyfills, defineCustomElements } from "@clio/nova-core/loader";

applyPolyfills().then(() => {
  defineCustomElements(window);
});

angular.module("TestApp", []).controller("FancyController", function() {
  this.formData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@clio.com",
    emailType: "business",
    tos: false,
  };
  let log = document.querySelector("#form-data-el");

  this.handleCheckboxChange = (e) => {
    e.preventDefault();

    this.formData.tos = !this.formData.tos;
  }

  this.handleInputChange = (e) => {
    this.formData[e.target.name] = e.target.value;
  }

  this.submitHandler = _ev => {
    log.innerText = JSON.stringify(this.formData, null, 2);
    event.preventDefault();
  };

  this.handlePrimaryActionClick = e => {
    alert("clicked");
  };
  this.handleMenuItemClick = text => {
    alert(text);
  };

  this.menuItems = [
    {
      text: "menu item 1",
      onClick: this.handleMenuItemClick,
    },
    {
      text: "menu item 2",
      onClick: this.handleMenuItemClick,
    },
    {
      text: "menu item 3",
      onClick: this.handleMenuItemClick,
    },
    {
      text: "menu item 4",
      onClick: this.handleMenuItemClick,
    },
  ];
});

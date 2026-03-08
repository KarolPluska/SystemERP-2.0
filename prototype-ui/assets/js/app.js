(function () {
  "use strict";

  var root = document.getElementById("zgs-app");
  if (!root) {
    return;
  }

  var authScene = document.getElementById("zgs-auth-scene");
  var appScene = document.getElementById("zgs-app-scene");
  var breadcrumb = document.getElementById("zgs-shell-breadcrumb");

  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-auth-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-auth-panel]"));
  var views = Array.prototype.slice.call(document.querySelectorAll("[data-view]"));
  var navTargets = Array.prototype.slice.call(document.querySelectorAll("[data-nav-target]"));

  var viewLabels = {
    launcher: "Launcher modulow",
    "offer-panel": "Panel Ofertowy",
    "company-users": "Firma i Uzytkownicy",
    "product-library": "Biblioteka Produktow",
    messenger: "Komunikator",
    notifications: "Powiadomienia"
  };

  function hasView(name) {
    return Object.prototype.hasOwnProperty.call(viewLabels, name);
  }

  function setAuthTab(nextTab) {
    tabs.forEach(function (button) {
      var active = button.getAttribute("data-auth-tab") === nextTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.setAttribute("tabindex", active ? "0" : "-1");
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-auth-panel") === nextTab;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  function setScreen(nextScreen) {
    var authActive = nextScreen === "auth";
    authScene.hidden = !authActive;
    authScene.setAttribute("aria-hidden", authActive ? "false" : "true");

    appScene.hidden = authActive;
    appScene.setAttribute("aria-hidden", authActive ? "true" : "false");
  }

  function setNavActive(target) {
    navTargets.forEach(function (button) {
      var active = button.getAttribute("data-nav-target") === target;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  function setView(nextView) {
    var target = hasView(nextView) ? nextView : "launcher";

    views.forEach(function (view) {
      var active = view.getAttribute("data-view") === target;
      view.classList.toggle("is-active", active);
      view.hidden = !active;
    });

    setNavActive(target);

    if (breadcrumb) {
      breadcrumb.textContent = viewLabels[target] || viewLabels.launcher;
    }
  }

  tabs.forEach(function (button) {
    button.addEventListener("click", function () {
      setAuthTab(button.getAttribute("data-auth-tab"));
    });
  });

  var toShellButtons = Array.prototype.slice.call(document.querySelectorAll("[data-go-shell]"));
  toShellButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setScreen("app");
      setView("launcher");
    });
  });

  var toAuthButtons = Array.prototype.slice.call(document.querySelectorAll("[data-go-auth]"));
  toAuthButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setScreen("auth");
      setView("launcher");
    });
  });

  var moduleButtons = Array.prototype.slice.call(document.querySelectorAll("[data-open-module]"));
  moduleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-open-module");
      setScreen("app");
      setView(target);
    });
  });

  var viewButtons = Array.prototype.slice.call(document.querySelectorAll("[data-open-view]"));
  viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setView(button.getAttribute("data-open-view"));
      setScreen("app");
    });
  });

  var params = new URLSearchParams(window.location.search);
  var tabParam = params.get("auth");
  var screenParam = params.get("screen");
  var viewParam = params.get("view");
  var moduleParam = params.get("module");
  var hashValue = (window.location.hash || "").replace(/^#/, "").trim();

  if (tabParam === "register") {
    setAuthTab("register");
  } else {
    setAuthTab("login");
  }

  if (hashValue === "auth-register") {
    setAuthTab("register");
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hashValue === "auth-login" || hashValue === "auth") {
    setAuthTab("login");
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hashValue === "launcher") {
    setScreen("app");
    setView("launcher");
    return;
  }

  if (hasView(hashValue)) {
    setScreen("app");
    setView(hashValue);
    return;
  }

  if (screenParam === "auth") {
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hasView(screenParam)) {
    setScreen("app");
    setView(screenParam);
    return;
  }

  if (screenParam === "launcher" || screenParam === "app") {
    setScreen("app");
    if (moduleParam && hasView(moduleParam)) {
      setView(moduleParam);
    } else if (viewParam && hasView(viewParam)) {
      setView(viewParam);
    } else {
      setView("launcher");
    }
    return;
  }

  setScreen("auth");
  setView("launcher");
})();
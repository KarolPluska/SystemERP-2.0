(function () {
  "use strict";

  var root = document.getElementById("zgs-app");
  if (!root) {
    return;
  }

  var data = window.ZGS_MOCK_DATA || {};
  var authData = data.auth || {};
  var navData = data.navigation || {};
  var launcherData = data.launcher || {};
  var offerData = data.offerPanel || {};
  var companyData = data.companyUsers || {};
  var libraryData = data.library || {};
  var messengerData = data.messenger || {};
  var notificationsData = data.notifications || {};
  var brandData = data.brand || {};

  var authScene = document.getElementById("zgs-auth-scene");
  var appScene = document.getElementById("zgs-app-scene");
  var breadcrumb = document.getElementById("zgs-shell-breadcrumb");

  var moduleKeyToView = {
    start: "launcher",
    offers: "offer-panel",
    company: "company-users",
    library: "product-library",
    chat: "messenger",
    inbox: "notifications"
  };

  var tabUiMap = {
    login: { tabId: "zgs-tab-login", panelId: "zgs-panel-login" },
    "company-register": { tabId: "zgs-tab-company", panelId: "zgs-panel-company" },
    "join-company": { tabId: "zgs-tab-join", panelId: "zgs-panel-join" }
  };

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function viewForNavKey(key) {
    return moduleKeyToView[key] || key;
  }

  function navLabel(key, fallback) {
    var tabs = Array.isArray(navData.desktopTabs) ? navData.desktopTabs : [];
    for (var i = 0; i < tabs.length; i += 1) {
      if (tabs[i].key === key) {
        return tabs[i].label;
      }
    }
    return fallback || "";
  }

  function inputTypeForField(fieldKey) {
    if (!fieldKey) {
      return "text";
    }
    if (fieldKey.indexOf("email") !== -1) {
      return "email";
    }
    if (fieldKey.indexOf("password") !== -1) {
      return "password";
    }
    if (fieldKey.indexOf("phone") !== -1) {
      return "tel";
    }
    return "text";
  }

  function autocompleteForField(fieldKey) {
    switch (fieldKey) {
      case "email":
        return "email";
      case "password":
        return "current-password";
      case "company_name":
        return "organization";
      case "company_address":
        return "street-address";
      case "contact_name":
        return "name";
      case "phone":
        return "tel";
      case "first_name":
        return "given-name";
      case "last_name":
        return "family-name";
      default:
        return "off";
    }
  }

  function renderAuthForm(tab) {
    var fields = Array.isArray(tab.fields) ? tab.fields : [];
    var fieldHtml = fields
      .map(function (field) {
        var key = field.key || "field";
        var id = "zgs-auth-" + (tab.key || "tab") + "-" + key;
        var type = inputTypeForField(key);
        var inputMode = key === "nip" ? ' inputmode="numeric"' : "";
        return (
          '<label class="zgs-field" for="' + esc(id) + '">' +
            "<span>" + esc(field.label) + "</span>" +
            '<input id="' + esc(id) + '" name="' + esc(key) + '" type="' + esc(type) + '" autocomplete="' + esc(autocompleteForField(key)) + '" placeholder="' + esc(field.placeholder) + '"' + inputMode + ">" +
          "</label>"
        );
      })
      .join("");

    var optionsHtml = "";
    if (Array.isArray(tab.options) && tab.options.length) {
      var remember = tab.options[0];
      var forgot = tab.options[1];
      optionsHtml =
        '<div class="zgs-form-row">' +
          '<label class="zgs-check" for="zgs-login-remember">' +
            '<input id="zgs-login-remember" type="checkbox" name="remember" checked>' +
            "<span>" + esc(remember && remember.label) + "</span>" +
          "</label>" +
          '<a class="zgs-link" href="#" aria-disabled="true">' + esc(forgot && forgot.label) + "</a>" +
        "</div>";
    }

    return (
      '<form class="zgs-form" novalidate>' +
        fieldHtml +
        optionsHtml +
        '<button class="zgs-btn zgs-btn-primary" type="button" data-go-shell="1">' + esc(tab.button) + "</button>" +
      "</form>"
    );
  }

  function renderAuth() {
    var heroTitle = authData.heroTitle || "";
    var heroText = authData.heroText || "";
    var tabs = Array.isArray(authData.tabs) ? authData.tabs : [];

    var authHead = document.querySelector(".zgs-auth-head");
    if (authHead) {
      authHead.innerHTML =
        '<div class="zgs-brand-lockup">' +
          '<span class="zgs-brand-dot" aria-hidden="true"></span>' +
          '<p class="zgs-brand-name">' + esc(brandData.name || "ZEGGER ERP") + "</p>" +
        "</div>" +
        "<h1>" + esc(heroTitle) + "</h1>" +
        '<p class="zgs-auth-subline">' + esc(heroText) + "</p>";
    }

    tabs.forEach(function (tab) {
      var map = tabUiMap[tab.key];
      if (!map) {
        return;
      }

      var button = document.getElementById(map.tabId);
      if (button) {
        button.textContent = tab.label || "";
        button.setAttribute("data-auth-tab", tab.key);
      }

      var panel = document.getElementById(map.panelId);
      if (panel) {
        panel.setAttribute("data-auth-panel", tab.key);
        panel.innerHTML = renderAuthForm(tab);
      }
    });
  }

  function renderShellChrome() {
    var brandName = document.querySelector(".zgs-shell-title");
    var brandSubtitle = document.querySelector(".zgs-shell-subtitle");

    if (brandName) {
      brandName.textContent = brandData.name || "ZEGGER ERP";
    }
    if (brandSubtitle) {
      brandSubtitle.textContent = brandData.subtitle || "";
    }

    var utilityWrap = document.querySelector(".zgs-shell-right");
    if (utilityWrap) {
      var utility = Array.isArray(navData.utility) ? navData.utility : [];
      utilityWrap.innerHTML = utility
        .map(function (item) {
          var view = viewForNavKey(item.key);
          if (item.key === "account") {
            return '<button class="zgs-quick-btn" type="button" aria-disabled="true">' + esc(item.label) + "</button>";
          }
          return '<button class="zgs-quick-btn" type="button" data-open-module="' + esc(view) + '">' + esc(item.label) + "</button>";
        })
        .join("");
    }

    var desktopTabsWrap = document.querySelector(".zgs-shell-nav");
    if (desktopTabsWrap) {
      var desktopTabs = Array.isArray(navData.desktopTabs) ? navData.desktopTabs : [];
      desktopTabsWrap.innerHTML = desktopTabs
        .map(function (item) {
          var view = viewForNavKey(item.key);
          if (view === "launcher") {
            return '<button class="zgs-nav-tab" type="button" data-open-view="launcher" data-nav-target="launcher">' + esc(item.label) + "</button>";
          }
          return '<button class="zgs-nav-tab" type="button" data-open-module="' + esc(view) + '" data-nav-target="' + esc(view) + '">' + esc(item.label) + "</button>";
        })
        .join("");
      desktopTabsWrap.setAttribute("aria-label", "Nawigacja modułów");
    }

    var mobileDock = document.querySelector(".zgs-mobile-dock");
    if (mobileDock) {
      var dockTabs = Array.isArray(navData.mobileDock) ? navData.mobileDock : [];
      mobileDock.innerHTML = dockTabs
        .map(function (item) {
          var view = viewForNavKey(item.key);
          if (view === "launcher") {
            return '<button class="zgs-mobile-dock-btn" type="button" data-open-view="launcher" data-nav-target="launcher">' + esc(item.label) + "</button>";
          }
          return '<button class="zgs-mobile-dock-btn" type="button" data-open-module="' + esc(view) + '" data-nav-target="' + esc(view) + '">' + esc(item.label) + "</button>";
        })
        .join("");
    }
  }

  function renderLauncher() {
    var view = document.getElementById("zgs-view-launcher");
    if (!view) {
      return;
    }

    var chips = Array.isArray(launcherData.chips) ? launcherData.chips : [];
    var modules = Array.isArray(launcherData.primaryModules) ? launcherData.primaryModules : [];
    var priorities = Array.isArray(launcherData.priorities) ? launcherData.priorities : [];
    var inboxCard = launcherData.inboxCard || {};

    view.innerHTML =
      '<header class="zgs-launcher-head">' +
        '<p class="zgs-kicker">Start</p>' +
        "<h2>" + esc(launcherData.title) + "</h2>" +
        "<p>" + esc(launcherData.text) + "</p>" +
        '<div class="zgs-launcher-pills">' +
          chips
            .map(function (chip, index) {
              return '<span class="zgs-chip' + (index === 0 ? " is-active" : "") + '">' + esc(chip) + "</span>";
            })
            .join("") +
        "</div>" +
      "</header>" +
      '<div class="zgs-launcher-workbench">' +
        '<section class="zgs-launcher-stream" aria-label="Główne moduły robocze">' +
          modules
            .map(function (module) {
              var target = viewForNavKey(module.key);
              return (
                '<article class="zgs-launch-row">' +
                  '<div class="zgs-launch-row-main">' +
                    '<p class="zgs-module-badge">' + esc(module.category) + "</p>" +
                    "<h3>" + esc(module.title) + "</h3>" +
                    "<p>" + esc(module.text) + "</p>" +
                    '<div class="zgs-launch-tags">' +
                      (Array.isArray(module.tags) ? module.tags : [])
                        .map(function (tag) {
                          return "<span>" + esc(tag) + "</span>";
                        })
                        .join("") +
                    "</div>" +
                  "</div>" +
                  '<div class="zgs-launch-row-action">' +
                    '<button class="zgs-module-btn" type="button" data-open-module="' + esc(target) + '">' + esc(module.cta) + "</button>" +
                  "</div>" +
                "</article>"
              );
            })
            .join("") +
        "</section>" +
        '<aside class="zgs-launcher-side" aria-label="Kontekst dnia">' +
          '<article class="zgs-surface zgs-launcher-panel">' +
            "<h3>Priorytety dzisiaj</h3>" +
            '<div class="zgs-inbox-list">' +
              priorities
                .map(function (item, index) {
                  return '<div class="zgs-inbox-item' + (index === 0 ? " is-unread" : "") + '"><strong>' + esc(item.title) + "</strong><span>" + esc(item.text) + "</span></div>";
                })
                .join("") +
            "</div>" +
          "</article>" +
          '<article class="zgs-module-card is-secondary">' +
            '<h3>' + esc(inboxCard.title) + "</h3>" +
            "<p>" + esc(inboxCard.text) + "</p>" +
            '<button class="zgs-module-btn" type="button" data-open-module="notifications">' + esc(inboxCard.cta) + "</button>" +
          "</article>" +
        "</aside>" +
      "</div>";
  }

  function renderOfferPanel() {
    var view = document.getElementById("zgs-view-offer-panel");
    if (!view) {
      return;
    }

    var zones = Array.isArray(offerData.zones) ? offerData.zones : [];
    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        "<div><p class=\"zgs-kicker\">" + esc(offerData.subtitle) + "</p><h2>" + esc(offerData.title) + "</h2></div>" +
      "</header>" +
      '<div class="zgs-offer-layout">' +
        '<article class="zgs-surface">' +
          "<h3>" + esc(offerData.subtitle) + "</h3>" +
          "<p>" + esc(offerData.hostNote) + "</p>" +
        "</article>" +
        '<article class="zgs-surface zgs-offer-canvas">' +
          '<div class="zgs-offer-canvas-grid">' +
            (zones[0] ? '<div class="zgs-block zgs-block-main"><h4>' + esc(zones[0].title) + "</h4><p>" + esc(zones[0].text) + "</p></div>" : "") +
            (zones[1] ? '<div class="zgs-block zgs-block-side"><h4>' + esc(zones[1].title) + "</h4><p>" + esc(zones[1].text) + "</p></div>" : "") +
            (zones[2] ? '<div class="zgs-block zgs-block-wide"><h4>' + esc(zones[2].title) + "</h4><p>" + esc(zones[2].text) + "</p></div>" : "") +
          "</div>" +
        "</article>" +
      "</div>";
  }

  function renderCompanyUsers() {
    var view = document.getElementById("zgs-view-company-users");
    if (!view) {
      return;
    }

    var stats = Array.isArray(companyData.stats) ? companyData.stats : [];
    var teamColumns = (companyData.teamTable && companyData.teamTable.columns) || [];
    var teamRows = (companyData.teamTable && companyData.teamTable.rows) || [];
    var queueItems = (companyData.actionQueue && companyData.actionQueue.items) || [];
    var joinItems = (companyData.joinRequests && companyData.joinRequests.items) || [];

    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        '<div><p class="zgs-kicker">Organizacja</p><h2>' + esc(navLabel("company", "Firma i Użytkownicy")) + '</h2></div>' +
      "</header>" +
      '<div class="zgs-kpi-strip">' +
        stats.map(function (stat) {
          return '<article class="zgs-kpi-card"><strong>' + esc(stat.value) + "</strong><span>" + esc(stat.label) + "</span></article>";
        }).join("") +
      "</div>" +
      '<div class="zgs-company-grid">' +
        '<article class="zgs-surface">' +
          "<h3>" + esc(companyData.companyCard && companyData.companyCard.title) + "</h3>" +
          '<ul class="zgs-list">' +
            ((companyData.companyCard && companyData.companyCard.rows) || []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
          "</ul>" +
          '<div class="zgs-action-list">' +
            ((companyData.companyCard && companyData.companyCard.actions) || []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface">' +
          "<h3>" + esc(companyData.relationsCard && companyData.relationsCard.title) + "</h3>" +
          '<ul class="zgs-list">' +
            ((companyData.relationsCard && companyData.relationsCard.rows) || []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
          "</ul>" +
          '<div class="zgs-action-list">' +
            ((companyData.relationsCard && companyData.relationsCard.actions) || []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-span-2">' +
          "<h3>" + esc(companyData.teamTable && companyData.teamTable.title) + "</h3>" +
          '<div class="zgs-table-wrap"><table class="zgs-table" aria-label="Lista użytkowników"><thead><tr>' +
            teamColumns.map(function (col) { return "<th>" + esc(col) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
            teamRows.map(function (row) { return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>"; }).join("") +
          "</tbody></table></div>" +
        "</article>" +
        '<article class="zgs-surface"><h3>' + esc(companyData.actionQueue && companyData.actionQueue.title) + '</h3><ul class="zgs-list">' +
          queueItems.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") +
        "</ul></article>" +
        '<article class="zgs-surface"><h3>' + esc(companyData.joinRequests && companyData.joinRequests.title) + '</h3><ul class="zgs-list">' +
          joinItems.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") +
        "</ul></article>" +
      "</div>";
  }

  function renderLibrary() {
    var view = document.getElementById("zgs-view-product-library");
    if (!view) {
      return;
    }

    var stats = Array.isArray(libraryData.stats) ? libraryData.stats : [];
    var pipeline = libraryData.pipeline || {};
    var workspace = libraryData.workspace || {};

    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        '<div><p class="zgs-kicker">Dane</p><h2>' + esc(navLabel("library", "Biblioteka Produktów")) + '</h2></div>' +
      "</header>" +
      '<div class="zgs-kpi-strip">' +
        stats.map(function (stat) {
          return '<article class="zgs-kpi-card"><strong>' + esc(stat.value) + "</strong><span>" + esc(stat.label) + "</span></article>";
        }).join("") +
      "</div>" +
      '<div class="zgs-library-grid">' +
        '<article class="zgs-surface"><h3>' + esc(libraryData.sourceCard && libraryData.sourceCard.title) + '</h3><ul class="zgs-list">' +
          ((libraryData.sourceCard && libraryData.sourceCard.rows) || []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
        '</ul><div class="zgs-action-list">' +
          ((libraryData.sourceCard && libraryData.sourceCard.actions) || []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
        "</div></article>" +
        '<article class="zgs-surface"><h3>' + esc(libraryData.localCard && libraryData.localCard.title) + '</h3><ul class="zgs-list">' +
          ((libraryData.localCard && libraryData.localCard.rows) || []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
        '</ul><div class="zgs-action-list">' +
          ((libraryData.localCard && libraryData.localCard.actions) || []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
        "</div></article>" +
        '<article class="zgs-surface zgs-span-2"><h3>' + esc(pipeline.title) + '</h3><div class="zgs-chip-list">' +
          (Array.isArray(pipeline.steps) ? pipeline.steps : []).map(function (step, index) {
            return '<span class="zgs-chip' + (index === 0 ? " is-active" : "") + '">' + esc(step) + "</span>";
          }).join("") +
        "</div><p>" + esc(pipeline.text) + "</p></article>" +
        '<article class="zgs-surface zgs-span-2"><h3>' + esc(workspace.title) + '</h3><div class="zgs-table-wrap"><table class="zgs-table" aria-label="Scalona lista produktów"><thead><tr>' +
          (Array.isArray(workspace.columns) ? workspace.columns : []).map(function (col) { return "<th>" + esc(col) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
          (Array.isArray(workspace.rows) ? workspace.rows : []).map(function (row) { return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>"; }).join("") +
        "</tbody></table></div></article>" +
      "</div>";
  }

  function renderMessenger() {
    var view = document.getElementById("zgs-view-messenger");
    if (!view) {
      return;
    }

    var activeThread = messengerData.activeThread || {};
    var contextPanel = messengerData.contextPanel || {};

    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        '<div><p class="zgs-kicker">Komunikacja</p><h2>' + esc(messengerData.title) + "</h2></div>" +
      "</header>" +
      '<div class="zgs-chat-grid">' +
        '<article class="zgs-surface zgs-chat-pane-list"><h3>Rozmowy</h3><ul class="zgs-chat-list">' +
          (Array.isArray(messengerData.threadList) ? messengerData.threadList : []).map(function (thread) {
            return '<li class="' + (thread.active ? "is-active" : "") + '"><strong>' + esc(thread.title) + "</strong><span>" + esc(thread.text) + "</span></li>";
          }).join("") +
        "</ul></article>" +
        '<article class="zgs-surface zgs-chat-pane-thread">' +
          '<div class="zgs-chat-header"><h3>' + esc(activeThread.title) + '</h3><span class="zgs-chip">' + esc(activeThread.badge) + "</span></div>" +
          '<div class="zgs-chat-thread">' +
            (Array.isArray(activeThread.messages) ? activeThread.messages : []).map(function (msg) {
              var systemClass = msg.indexOf("System:") === 0 ? " is-system" : "";
              var parts = msg.split(":");
              var author = parts.shift();
              var text = parts.join(":").trim();
              return '<p class="zgs-bubble' + systemClass + '"><strong>' + esc(author) + ":</strong> " + esc(text) + "</p>";
            }).join("") +
          "</div>" +
          '<div class="zgs-chat-compose"><span>' + esc(activeThread.composerPlaceholder) + '</span><div class="zgs-action-list">' +
            (Array.isArray(activeThread.composerActions) ? activeThread.composerActions : []).map(function (a, index) {
              return '<button class="zgs-action-btn' + (index === 1 ? " is-primary" : "") + '" type="button">' + esc(a) + "</button>";
            }).join("") +
          "</div></div>" +
          '<div class="zgs-chat-followup"><h4>' + esc(activeThread.decisionsTitle) + '</h4><ul class="zgs-list">' +
            (Array.isArray(activeThread.decisions) ? activeThread.decisions : []).map(function (decision) { return "<li>" + esc(decision) + "</li>"; }).join("") +
          "</ul></div>" +
        "</article>" +
        '<article class="zgs-surface zgs-chat-pane-context"><h3>' + esc(contextPanel.title) + '</h3><ul class="zgs-list">' +
          (Array.isArray(contextPanel.rows) ? contextPanel.rows : []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
        '</ul><div class="zgs-inbox-list">' +
          (Array.isArray(contextPanel.tasks) ? contextPanel.tasks : []).map(function (task) { return '<div class="zgs-inbox-item"><strong>Task</strong><span>' + esc(task) + "</span></div>"; }).join("") +
        "</div></article>" +
      "</div>";
  }

  function renderNotifications() {
    var view = document.getElementById("zgs-view-notifications");
    if (!view) {
      return;
    }

    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        '<div><p class="zgs-kicker">Inbox</p><h2>' + esc(notificationsData.title) + "</h2></div>" +
      "</header>" +
      '<div class="zgs-notification-grid">' +
        '<article class="zgs-surface zgs-notification-filters">' +
          '<h3>Filtry i statusy</h3>' +
          '<div class="zgs-chip-list">' +
            (Array.isArray(notificationsData.filters) ? notificationsData.filters : []).map(function (f, index) {
              return '<span class="zgs-chip' + (index === 0 ? " is-active" : "") + '">' + esc(f) + "</span>";
            }).join("") +
          "</div>" +
          '<div class="zgs-inbox-list">' +
            (Array.isArray(notificationsData.summaries) ? notificationsData.summaries : []).map(function (item) {
              return "<div class=\"zgs-inbox-item\"><strong>" + esc(item.title) + "</strong><span>" + esc(item.text) + "</span></div>";
            }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-notification-timeline"><h3>Timeline zdarzeń</h3>' +
          (Array.isArray(notificationsData.timeline) ? notificationsData.timeline : []).map(function (group, groupIndex) {
            return '<div class="zgs-notification-day"><h4>' + esc(group.group) + '</h4><div class="zgs-inbox-list">' +
              (Array.isArray(group.items) ? group.items : []).map(function (item, itemIndex) {
                var unreadClass = groupIndex === 0 && itemIndex === 0 ? " is-unread" : "";
                return '<div class="zgs-inbox-item' + unreadClass + '"><strong>' + esc(item.title) + "</strong><span>" + esc(item.text) + "</span></div>";
              }).join("") +
            "</div></div>";
          }).join("") +
        "</article>" +
      "</div>";
  }

  function hydrateFromData() {
    renderAuth();
    renderShellChrome();
    renderLauncher();
    renderOfferPanel();
    renderCompanyUsers();
    renderLibrary();
    renderMessenger();
    renderNotifications();
  }

  hydrateFromData();

  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-auth-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll("[data-auth-panel]"));
  var views = Array.prototype.slice.call(document.querySelectorAll("[data-view]"));
  var navTargets = Array.prototype.slice.call(document.querySelectorAll("[data-nav-target]"));

  var viewLabels = {
    launcher: launcherData.title || "Launcher",
    "offer-panel": (offerData.title || "Panel Ofertowy"),
    "company-users": navLabel("company", "Firma i Użytkownicy"),
    "product-library": navLabel("library", "Biblioteka Produktów"),
    messenger: messengerData.title || "Komunikator",
    notifications: notificationsData.title || "Powiadomienia"
  };

  function hasView(name) {
    return Object.prototype.hasOwnProperty.call(viewLabels, name);
  }

  function hasAuthTab(name) {
    return tabs.some(function (button) {
      return button.getAttribute("data-auth-tab") === name;
    });
  }

  function setAuthTab(nextTab) {
    var fallback = (Array.isArray(authData.tabs) && authData.tabs[0] && authData.tabs[0].key) || "login";
    var target = hasAuthTab(nextTab) ? nextTab : fallback;

    tabs.forEach(function (button) {
      var active = button.getAttribute("data-auth-tab") === target;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.setAttribute("tabindex", active ? "0" : "-1");
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-auth-panel") === target;
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
      breadcrumb.textContent = viewLabels[target];
    }
  }

  tabs.forEach(function (button) {
    button.addEventListener("click", function () {
      setAuthTab(button.getAttribute("data-auth-tab"));
    });
  });

  function bindAppActions() {
    var toShellButtons = Array.prototype.slice.call(document.querySelectorAll("[data-go-shell]"));
    toShellButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setScreen("app");
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
        var target = button.getAttribute("data-open-view");
        setScreen("app");
        setView(target);
      });
    });
  }

  bindAppActions();

  var params = new URLSearchParams(window.location.search);
  var tabParam = params.get("auth");
  var screenParam = params.get("screen");
  var viewParam = params.get("view");
  var moduleParam = params.get("module");
  var hashValue = (window.location.hash || "").replace(/^#/, "").trim();

  if (hashValue === "auth-login" || hashValue === "auth") {
    setAuthTab("login");
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hashValue === "auth-company") {
    setAuthTab("company-register");
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hashValue === "auth-join") {
    setAuthTab("join-company");
    setScreen("auth");
    setView("launcher");
    return;
  }

  if (hashValue === "launcher") {
    setAuthTab((Array.isArray(authData.tabs) && authData.tabs[0] && authData.tabs[0].key) || "login");
    setScreen("app");
    setView("launcher");
    return;
  }

  if (hasView(hashValue)) {
    setAuthTab((Array.isArray(authData.tabs) && authData.tabs[0] && authData.tabs[0].key) || "login");
    setScreen("app");
    setView(hashValue);
    return;
  }

  setAuthTab(tabParam || ((Array.isArray(authData.tabs) && authData.tabs[0] && authData.tabs[0].key) || "login"));

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
      return;
    }

    if (viewParam && hasView(viewParam)) {
      setView(viewParam);
      return;
    }

    setView("launcher");
    return;
  }

  setScreen("auth");
  setView("launcher");
})();

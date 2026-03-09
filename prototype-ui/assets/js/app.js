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

  function statusToneClass(status) {
    var value = String(status || "").toLowerCase();
    if (value.indexOf("pil") !== -1) {
      return "is-urgent";
    }
    if (value.indexOf("now") !== -1) {
      return "is-new";
    }
    if (value.indexOf("oczek") !== -1) {
      return "is-pending";
    }
    return "is-neutral";
  }

  function renderStatusBadge(status) {
    if (!status) {
      return "";
    }
    return '<span class="zgs-status ' + statusToneClass(status) + '">' + esc(status) + "</span>";
  }

  function renderTimeBadge(time) {
    if (!time) {
      return "";
    }
    return '<span class="zgs-time">' + esc(time) + "</span>";
  }

  function companyToneClass(value) {
    var normalized = String(value || "").toLowerCase();
    if (normalized.indexOf("pil") !== -1 || normalized.indexOf("danger") !== -1) {
      return "is-urgent";
    }
    if (normalized.indexOf("now") !== -1 || normalized.indexOf("new") !== -1) {
      return "is-new";
    }
    if (normalized.indexOf("oczek") !== -1 || normalized.indexOf("pending") !== -1) {
      return "is-pending";
    }
    if (normalized.indexOf("akty") !== -1 || normalized.indexOf("active") !== -1) {
      return "is-active";
    }
    if (normalized.indexOf("primary") !== -1 || normalized.indexOf("zatwier") !== -1 || normalized.indexOf("approve") !== -1) {
      return "is-primary";
    }
    return "is-neutral";
  }

  function renderCompanyPill(label, tone) {
    if (!label) {
      return "";
    }
    return '<span class="zgs-company-pill ' + companyToneClass(tone || label) + '">' + esc(label) + "</span>";
  }

  function renderCompanyActionButton(action) {
    var label = typeof action === "string" ? action : action && action.label;
    if (!label) {
      return "";
    }

    var tone = typeof action === "string" ? "neutral" : (action.tone || "neutral");
    return '<button class="zgs-table-action-btn ' + companyToneClass(tone) + '" type="button">' + esc(label) + "</button>";
  }

  function chunkItems(list, size) {
    var source = Array.isArray(list) ? list : [];
    var step = Math.max(1, size || 1);
    var chunks = [];
    for (var i = 0; i < source.length; i += step) {
      chunks.push(source.slice(i, i + step));
    }
    return chunks;
  }

  function initPrioritySlider(scope) {
    var host = scope || document;
    var section = host.querySelector(".zgs-start-priority");
    if (!section) {
      return;
    }

    var slider = section.querySelector("[data-priority-slider]");
    if (!slider) {
      return;
    }

    var track = slider.querySelector("[data-priority-track]");
    var slides = Array.prototype.slice.call(slider.querySelectorAll("[data-priority-slide]"));
    var prev = section.querySelector('[data-priority-nav="prev"]');
    var next = section.querySelector('[data-priority-nav="next"]');
    var dots = Array.prototype.slice.call(section.querySelectorAll("[data-priority-dot]"));
    if (!track || !slides.length) {
      return;
    }

    var current = 0;
    var max = slides.length - 1;

    function update() {
      track.style.transform = "translateX(-" + (current * 100) + "%)";
      if (prev) {
        prev.disabled = current <= 0;
      }
      if (next) {
        next.disabled = current >= max;
      }
      dots.forEach(function (dot, index) {
        var active = index === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    if (prev) {
      prev.addEventListener("click", function () {
        current = Math.max(0, current - 1);
        update();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        current = Math.min(max, current + 1);
        update();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var index = parseInt(dot.getAttribute("data-priority-dot"), 10);
        if (!isNaN(index)) {
          current = Math.min(max, Math.max(0, index));
          update();
        }
      });
    });

    update();
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

    var priorityBlocks = Array.isArray(launcherData.priorityBlocks) ? launcherData.priorityBlocks : [];
    var prioritySlides = chunkItems(priorityBlocks, 3);
    var continueItems = Array.isArray(launcherData.continueItems) ? launcherData.continueItems : [];
    var quickActions = Array.isArray(launcherData.quickActions) ? launcherData.quickActions : [];
    var inboxEvents = Array.isArray(launcherData.inboxEvents) ? launcherData.inboxEvents : [];
    var primaryActions = quickActions.filter(function (action) {
      return action.priority === "primary";
    });
    var secondaryActions = quickActions.filter(function (action) {
      return action.priority !== "primary";
    });

    view.innerHTML =
      '<header class="zgs-launcher-head zgs-start-head">' +
        '<p class="zgs-kicker">' + esc(launcherData.subtitle || "Dzisiaj") + "</p>" +
        "<h2>" + esc(launcherData.title) + "</h2>" +
        "<p>" + esc(launcherData.text) + "</p>" +
      "</header>" +
      '<div class="zgs-start-layout">' +
        '<section class="zgs-start-main" aria-label="Priorytety i kontynuacja">' +
          '<article class="zgs-surface zgs-start-priority">' +
            '<div class="zgs-start-priority-top">' +
              "<h3>Priorytety dnia</h3>" +
              '<div class="zgs-start-priority-controls" aria-label="Nawigacja priorytetów">' +
                '<div class="zgs-start-priority-dots" role="tablist" aria-label="Paginacja priorytetów">' +
                  prioritySlides
                    .map(function (_slide, index) {
                      return '<button class="zgs-start-priority-dot" type="button" data-priority-dot="' + index + '" aria-label="Slajd ' + (index + 1) + '"></button>';
                    })
                    .join("") +
                "</div>" +
                '<button class="zgs-start-priority-nav-btn" type="button" data-priority-nav="prev" aria-label="Poprzedni slajd">‹</button>' +
                '<button class="zgs-start-priority-nav-btn" type="button" data-priority-nav="next" aria-label="Następny slajd">›</button>' +
              "</div>" +
            "</div>" +
            '<div class="zgs-start-priority-slider" data-priority-slider>' +
              '<div class="zgs-start-priority-track" data-priority-track>' +
                prioritySlides
                  .map(function (slide, slideIndex) {
                    return (
                      '<section class="zgs-start-priority-slide" data-priority-slide="' + slideIndex + '">' +
                        '<div class="zgs-start-priority-grid">' +
                          slide.map(function (block) {
                            var target = viewForNavKey(block.key);
                            var records = (Array.isArray(block.items) ? block.items : []).slice(0, 2);
                            var ctaAttr = target === "launcher"
                              ? ' data-open-view="launcher"'
                              : ' data-open-module="' + esc(target) + '"';

                            return (
                              '<article class="zgs-start-priority-card">' +
                                '<div class="zgs-start-priority-head">' +
                                  '<p class="zgs-start-priority-title">' + esc(block.title) + "</p>" +
                                  '<span class="zgs-start-count">' + esc(block.count) + "</span>" +
                                "</div>" +
                                '<ul class="zgs-list zgs-start-priority-list">' +
                                  records.map(function (record) {
                                    var recordText = typeof record === "string" ? record : record.text;
                                    var recordStatus = typeof record === "string" ? "" : record.status;
                                    var recordTime = typeof record === "string" ? "" : record.time;
                                    return (
                                      "<li>" +
                                        '<span class="zgs-start-item-text">' + esc(recordText) + "</span>" +
                                        '<span class="zgs-start-item-meta">' +
                                          renderStatusBadge(recordStatus) +
                                          renderTimeBadge(recordTime) +
                                        "</span>" +
                                      "</li>"
                                    );
                                  }).join("") +
                                "</ul>" +
                                '<button class="zgs-action-btn zgs-start-priority-cta" type="button"' + ctaAttr + ">" + esc(block.cta) + "</button>" +
                              "</article>"
                            );
                          }).join("") +
                        "</div>" +
                      "</section>"
                    );
                  })
                  .join("") +
              "</div>" +
            "</div>" +
          "</article>" +
          '<article class="zgs-surface zgs-start-resume">' +
            "<h3>Kontynuuj pracę</h3>" +
            '<ul class="zgs-start-resume-list">' +
              continueItems
                .map(function (item) {
                  var target = viewForNavKey(item.key || "launcher");
                  var itemAttr = target === "launcher"
                    ? ' data-open-view="launcher"'
                    : ' data-open-module="' + esc(target) + '"';
                  return (
                    "<li>" +
                      '<button class="zgs-start-recent-item" type="button"' + itemAttr + ">" +
                        '<span class="zgs-start-recent-main"><strong>' + esc(item.label) + "</strong><span>" + esc(item.value) + "</span></span>" +
                        '<span class="zgs-start-recent-meta">' +
                          renderStatusBadge(item.status) +
                          renderTimeBadge(item.time) +
                          '<span class="zgs-start-recent-arrow" aria-hidden="true">→</span>' +
                        "</span>" +
                      "</button>" +
                    "</li>"
                  );
                })
                .join("") +
            "</ul>" +
          "</article>" +
        "</section>" +
        '<aside class="zgs-start-side" aria-label="Akcje i zdarzenia">' +
          '<article class="zgs-surface zgs-start-actions">' +
            "<h3>Szybkie akcje</h3>" +
            '<div class="zgs-start-action-primary">' +
              primaryActions
                .map(function (action) {
                  var target = viewForNavKey(action.key);
                  var actionAttr = target === "launcher"
                    ? ' data-open-view="launcher"'
                    : ' data-open-module="' + esc(target) + '"';
                  return '<button class="zgs-action-btn zgs-start-action-btn is-primary-action" type="button"' + actionAttr + ">" + esc(action.label) + "</button>";
                })
                .join("") +
            "</div>" +
            '<div class="zgs-start-action-secondary">' +
              '<p class="zgs-start-action-label">Pomocnicze</p>' +
            '<div class="zgs-start-action-grid">' +
              secondaryActions
                .map(function (action) {
                  var target = viewForNavKey(action.key);
                  var actionAttr = target === "launcher"
                    ? ' data-open-view="launcher"'
                    : ' data-open-module="' + esc(target) + '"';
                  return '<button class="zgs-action-btn zgs-start-action-btn is-secondary-action" type="button"' + actionAttr + ">" + esc(action.label) + "</button>";
                })
                .join("") +
            "</div></div>" +
          "</article>" +
          '<article class="zgs-surface zgs-start-inbox">' +
            "<h3>Inbox dnia</h3>" +
            '<ol class="zgs-start-timeline">' +
              inboxEvents
                .map(function (item, index) {
                  return (
                    '<li class="zgs-start-timeline-item' + (index === 0 ? " is-unread" : "") + '">' +
                      '<span class="zgs-start-timeline-dot" aria-hidden="true"></span>' +
                      '<div class="zgs-start-timeline-content">' +
                        '<div class="zgs-start-timeline-head">' +
                          "<strong>" + esc(item.title) + "</strong>" +
                          '<span class="zgs-start-item-meta">' +
                            renderStatusBadge(item.status) +
                            renderTimeBadge(item.time) +
                          "</span>" +
                        "</div>" +
                        "<p>" + esc(item.text) + "</p>" +
                      "</div>" +
                    "</li>"
                  );
                })
                .join("") +
            "</ol>" +
          "</article>" +
        "</aside>" +
      "</div>";

    initPrioritySlider(view);
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
    var relationItems = (companyData.relationsCard && companyData.relationsCard.workflow) || [];
    var teamColumns = (companyData.teamTable && companyData.teamTable.columns) || [];
    var teamRows = (companyData.teamTable && companyData.teamTable.rows) || [];
    var queueItems = (companyData.actionQueue && companyData.actionQueue.items) || [];
    var joinItems = (companyData.joinRequests && companyData.joinRequests.items) || [];

    view.innerHTML =
      '<header class="zgs-module-head">' +
        '<button class="zgs-back-btn" type="button" data-open-view="launcher">Wróć do launchera</button>' +
        '<div><p class="zgs-kicker">Organizacja</p><h2>' + esc(navLabel("company", "Firma i Użytkownicy")) + '</h2></div>' +
      "</header>" +
      '<div class="zgs-kpi-strip zgs-company-kpi-strip">' +
        stats.map(function (stat) {
          var statusLabel = stat.statusLabel || stat.status;
          var hint = stat.hint
            ? (
              '<p class="zgs-kpi-hint">' +
                renderCompanyPill(statusLabel, stat.statusTone || stat.status) +
                "<span>" + esc(stat.hint) + "</span>" +
              "</p>"
            )
            : "";
          return '<article class="zgs-kpi-card"><strong>' + esc(stat.value) + "</strong><span>" + esc(stat.label) + "</span>" + hint + "</article>";
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
        '<article class="zgs-surface zgs-company-relations-card">' +
          "<h3>" + esc(companyData.relationsCard && companyData.relationsCard.title) + "</h3>" +
          (relationItems.length
            ? (
              '<ul class="zgs-company-relations-list">' +
                relationItems.map(function (item) {
                  return (
                    '<li class="zgs-company-relations-item">' +
                      '<div class="zgs-company-relations-head">' +
                        "<strong>" + esc(item.label) + "</strong>" +
                        renderCompanyPill(item.statusLabel || item.status, item.statusTone || item.status) +
                      "</div>" +
                      '<p class="zgs-company-relations-value">' + esc(item.value) + "</p>" +
                      (item.detail ? '<p class="zgs-company-relations-detail">' + esc(item.detail) + "</p>" : "") +
                    "</li>"
                  );
                }).join("") +
              "</ul>"
            )
            : (
              '<ul class="zgs-list">' +
                ((companyData.relationsCard && companyData.relationsCard.rows) || []).map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
              "</ul>"
            )) +
          '<div class="zgs-action-list">' +
            ((companyData.relationsCard && companyData.relationsCard.actions) || []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-span-2 zgs-company-team-card">' +
          "<h3>" + esc(companyData.teamTable && companyData.teamTable.title) + "</h3>" +
          '<div class="zgs-table-wrap"><table class="zgs-table" aria-label="Lista użytkowników"><thead><tr>' +
            teamColumns.map(function (col) { return "<th>" + esc(col) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
            teamRows.map(function (row) {
              if (Array.isArray(row)) {
                return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>";
              }

              var actions = Array.isArray(row.actions) ? row.actions : [];
              return (
                "<tr>" +
                  "<td>" + esc(row.name) + "</td>" +
                  "<td>" + esc(row.role) + "</td>" +
                  "<td>" + renderCompanyPill(row.status, row.statusTone || row.status) + "</td>" +
                  "<td>" + esc(row.scope) + "</td>" +
                  '<td><span class="zgs-company-last-activity">' + esc(row.lastActivity) + "</span></td>" +
                  '<td><div class="zgs-table-actions">' + actions.map(renderCompanyActionButton).join("") + "</div></td>" +
                "</tr>"
              );
            }).join("") +
          "</tbody></table></div>" +
        "</article>" +
        '<article class="zgs-surface zgs-company-work-card"><h3>' + esc(companyData.actionQueue && companyData.actionQueue.title) + '</h3><ul class="zgs-company-worklist">' +
          queueItems.map(function (item) {
            if (typeof item === "string") {
              return '<li class="zgs-company-workitem"><p>' + esc(item) + "</p></li>";
            }

            return (
              '<li class="zgs-company-workitem">' +
                '<div class="zgs-company-workhead">' +
                  "<strong>" + esc(item.title) + "</strong>" +
                  '<span class="zgs-company-workmeta">' +
                    renderCompanyPill(item.statusLabel || item.status, item.statusTone || item.status) +
                    renderTimeBadge(item.time) +
                  "</span>" +
                "</div>" +
                (item.meta ? '<p class="zgs-company-worksub">' + esc(item.meta) + "</p>" : "") +
                (item.text ? "<p>" + esc(item.text) + "</p>" : "") +
                (item.cta ? '<button class="zgs-action-btn zgs-company-workcta" type="button">' + esc(item.cta) + "</button>" : "") +
              "</li>"
            );
          }).join("") +
        "</ul></article>" +
        '<article class="zgs-surface zgs-company-work-card"><h3>' + esc(companyData.joinRequests && companyData.joinRequests.title) + '</h3><ul class="zgs-company-worklist">' +
          joinItems.map(function (item) {
            if (typeof item === "string") {
              return '<li class="zgs-company-workitem"><p>' + esc(item) + "</p></li>";
            }

            return (
              '<li class="zgs-company-workitem">' +
                '<div class="zgs-company-workhead">' +
                  "<strong>" + esc(item.title) + "</strong>" +
                  '<span class="zgs-company-workmeta">' +
                    renderCompanyPill(item.statusLabel || item.status, item.statusTone || item.status) +
                    renderTimeBadge(item.time) +
                  "</span>" +
                "</div>" +
                (item.meta ? '<p class="zgs-company-worksub">' + esc(item.meta) + "</p>" : "") +
                (item.text ? "<p>" + esc(item.text) + "</p>" : "") +
                (item.cta ? '<button class="zgs-action-btn zgs-company-workcta" type="button">' + esc(item.cta) + "</button>" : "") +
              "</li>"
            );
          }).join("") +
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

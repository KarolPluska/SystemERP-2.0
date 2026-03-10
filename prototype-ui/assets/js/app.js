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
  var refreshShellScrollIndicator = function () {};

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
    var companyCard = companyData.companyCard || {};
    var relationsCard = companyData.relationsCard || {};
    var teamColumns = (companyData.teamTable && companyData.teamTable.columns) || [];
    var teamRows = (companyData.teamTable && companyData.teamTable.rows) || [];
    var queueItems = (companyData.actionQueue && companyData.actionQueue.items) || [];
    var joinItems = (companyData.joinRequests && companyData.joinRequests.items) || [];
    var companyRows = Array.isArray(companyCard.rows) ? companyCard.rows : [];
    var companyAdminDetails = Array.isArray(companyCard.adminDetails) ? companyCard.adminDetails : [];
    var companyLocations = Array.isArray(companyCard.locations) ? companyCard.locations : [];
    var relationRows = Array.isArray(relationsCard.rows) ? relationsCard.rows : [];
    var relatedCompanies = Array.isArray(relationsCard.linkedCompanies) ? relationsCard.linkedCompanies : [];
    var relationRecords = Array.isArray(relationsCard.relationRecords) ? relationsCard.relationRecords : [];

    function companyStatusToneClass(status) {
      var value = String(status || "").toLowerCase();
      if (value.indexOf("pil") !== -1) {
        return "is-urgent";
      }
      if (value.indexOf("review") !== -1 || value.indexOf("rev") !== -1 || value.indexOf("dzi") !== -1) {
        return "is-pending";
      }
      if (value.indexOf("now") !== -1) {
        return "is-new";
      }
      if (value.indexOf("oczek") !== -1 || value.indexOf("weryf") !== -1) {
        return "is-pending";
      }
      if (value.indexOf("akt") !== -1) {
        return "is-active";
      }
      if (value.indexOf("zawiesz") !== -1) {
        return "is-muted";
      }
      return "is-neutral";
    }

    function renderCompanyBadge(status) {
      if (!status) {
        return "";
      }
      return '<span class="zgs-company-badge ' + companyStatusToneClass(status) + '">' + esc(status) + "</span>";
    }

    function companyStatusFilterKey(status) {
      var value = String(status || "").toLowerCase();
      if (value.indexOf("zawiesz") !== -1) {
        return "suspended";
      }
      if (value.indexOf("oczek") !== -1 || value.indexOf("weryf") !== -1 || value.indexOf("now") !== -1) {
        return "pending";
      }
      if (value.indexOf("akt") !== -1) {
        return "active";
      }
      return "other";
    }

    function requiresDecision(status) {
      return companyStatusFilterKey(status) === "pending";
    }

    function renderInlineActions(actions) {
      var list = Array.isArray(actions) ? actions : [];
      return (
        '<div class="zgs-company-inline-actions">' +
          list.map(function (action) {
            return '<button class="zgs-company-inline-action" type="button">' + esc(action) + "</button>";
          }).join("") +
        "</div>"
      );
    }

    function renderTeamActions(actions) {
      var list = Array.isArray(actions) ? actions : [];
      return (
        '<div class="zgs-company-table-actions">' +
          list.map(function (action) {
            return '<button class="zgs-company-table-action" type="button">' + esc(action) + "</button>";
          }).join("") +
        "</div>"
      );
    }

    function renderDecisionActions(actions) {
      var list = Array.isArray(actions) ? actions : [];
      return (
        '<div class="zgs-company-decision-actions">' +
          list.map(function (action) {
            var value = String(action || "").toLowerCase();
            var actionClass = "is-view";
            if (value.indexOf("akcept") !== -1) {
              actionClass = "is-accept";
            } else if (value.indexOf("odrzu") !== -1) {
              actionClass = "is-reject";
            }
            return '<button class="zgs-company-decision-action ' + actionClass + '" type="button">' + esc(action) + "</button>";
          }).join("") +
        "</div>"
      );
    }

    function requestTypeClass(type) {
      var value = String(type || "").toLowerCase();
      if (value.indexOf("relac") !== -1 || value.indexOf("b2b") !== -1) {
        return "is-b2b";
      }
      if (value.indexOf("firm") !== -1) {
        return "is-company";
      }
      return "is-user";
    }

    function queuePriorityClass(task) {
      var value = String((task && (task.badge || task.status)) || "").toLowerCase();
      if (value.indexOf("pil") !== -1) {
        return "is-urgent";
      }
      if (value.indexOf("review") !== -1 || value.indexOf("rev") !== -1) {
        return "is-review";
      }
      if (value.indexOf("dzi") !== -1 || value.indexOf("today") !== -1) {
        return "is-today";
      }
      return "";
    }

    function parseTeamRow(row) {
      var parsed = Array.isArray(row)
        ? {
            name: row[0],
            role: row[1],
            status: row[2],
            scope: row[3],
            location: row[4],
            lastActivity: row[5],
            actions: row[6] ? String(row[6]).split("/").map(function (part) { return part.trim(); }) : []
          }
        : (row || {});

      parsed.statusKey = companyStatusFilterKey(parsed.status);
      parsed.locationKey = String(parsed.location || "").trim().toLowerCase();
      parsed.keywords = String((parsed.name || "") + " " + (parsed.role || "") + " " + (parsed.scope || "") + " " + (parsed.location || "")).toLowerCase();
      return parsed;
    }

    var normalizedTeamRows = teamRows.map(parseTeamRow);
    var teamLocations = [];
    normalizedTeamRows.forEach(function (row) {
      var location = String(row.location || "").trim();
      if (location && teamLocations.indexOf(location) === -1) {
        teamLocations.push(location);
      }
    });
    var waitingUsersCount = normalizedTeamRows.filter(function (row) { return row.statusKey === "pending"; }).length;
    var waitingJoinCount = joinItems.filter(function (item) {
      return requiresDecision(item && item.status);
    }).length;
    var waitingRelationCount = relationRecords.filter(function (record) {
      return requiresDecision(record && record.status);
    }).length;
    var actionTotal = waitingUsersCount + waitingJoinCount + waitingRelationCount + queueItems.length;
    var locationPreviewCount = 2;
    var hasHiddenLocations = companyLocations.length > locationPreviewCount;

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
        '<article class="zgs-surface zgs-company-card">' +
          "<h3>" + esc(companyCard.title) + "</h3>" +
          '<ul class="zgs-list zgs-company-summary-list">' +
            companyRows.map(function (row) { return "<li>" + esc(row) + "</li>"; }).join("") +
          "</ul>" +
          (companyAdminDetails.length
            ? '<ul class="zgs-company-admin-list">' +
                companyAdminDetails.map(function (detail) {
                  return "<li><span>" + esc(detail.label) + "</span><strong>" + esc(detail.value) + "</strong></li>";
                }).join("") +
              "</ul>"
            : "") +
          '<section class="zgs-company-locations">' +
            '<p class="zgs-company-subtitle">Adresy / lokalizacje <span class="zgs-company-subcount">- ' + esc(String(companyLocations.length)) + "</span></p>" +
            '<ul class="zgs-company-location-list">' +
              companyLocations.map(function (location, locationIndex) {
                var locationActions = Array.isArray(location.actions) ? location.actions : [];
                var collapsedLocation = hasHiddenLocations && locationIndex >= locationPreviewCount;
                return (
                  '<li class="zgs-company-location-item' + (collapsedLocation ? " is-collapsed" : "") + '"' + (collapsedLocation ? " hidden" : "") + ' data-company-location-item="1">' +
                    '<div class="zgs-company-location-head">' +
                      '<span class="zgs-company-location-meta">' +
                        '<span class="zgs-company-location-type">' + esc(location.type) + "</span>" +
                        (location.isPrimary ? '<span class="zgs-company-location-primary">Główny</span>' : "") +
                      "</span>" +
                      '<span class="zgs-company-location-note">' + esc(location.note) + "</span>" +
                    "</div>" +
                    '<p class="zgs-company-location-address">' + esc(location.address) + "</p>" +
                    (locationActions.length
                      ? '<div class="zgs-company-location-actions">' +
                          locationActions.map(function (action) {
                            var isPrimaryAction = action === "Ustaw jako główny" && location.isPrimary;
                            return '<button class="zgs-company-location-action" type="button"' + (isPrimaryAction ? ' disabled aria-disabled="true"' : "") + ">" + esc(action) + "</button>";
                          }).join("") +
                        "</div>"
                      : "") +
                  "</li>"
                );
              }).join("") +
            "</ul>" +
            (hasHiddenLocations
              ? '<button class="zgs-company-location-more" type="button" data-company-location-toggle data-total-count="' + esc(String(companyLocations.length)) + '">Pokaż wszystkie (' + esc(String(companyLocations.length)) + ")</button>"
              : "") +
          "</section>" +
          '<div class="zgs-action-list">' +
            (Array.isArray(companyCard.actions) ? companyCard.actions : []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-company-relations">' +
          "<h3>" + esc(relationsCard.title) + "</h3>" +
          '<ul class="zgs-list zgs-company-relation-list">' +
            (relationsCard.relationModel ? '<li><span>Model relacji</span><strong>' + esc(relationsCard.relationModel) + "</strong></li>" : "") +
            (relationsCard.currentRole ? '<li><span>Rola aktualna</span><strong>' + esc(relationsCard.currentRole) + "</strong></li>" : "") +
            (relationsCard.relationStatus ? '<li><span>Status relacji</span><strong>' + esc(relationsCard.relationStatus) + "</strong></li>" : "") +
            relationRows.map(function (row) {
              return "<li><strong>" + esc(row) + "</strong></li>";
            }).join("") +
            (relatedCompanies.length
              ? '<li><span>Powiązane firmy</span><div class="zgs-company-chip-list">' +
                relatedCompanies.map(function (company) {
                  return '<span class="zgs-company-chip">' + esc(company) + "</span>";
                }).join("") +
                "</div></li>"
              : "") +
          "</ul>" +
          (relationRecords.length
            ? '<ul class="zgs-company-relation-records">' +
                relationRecords.map(function (record) {
                  return (
                    '<li class="zgs-company-relation-record">' +
                      '<div class="zgs-company-relation-main">' +
                        '<strong>' + esc(record.company) + "</strong>" +
                        '<span>' + esc(record.type) + "</span>" +
                        (record.owner ? '<span class="zgs-company-relation-context">Opiekun: ' + esc(record.owner) + "</span>" : "") +
                      "</div>" +
                      '<div class="zgs-company-relation-side">' +
                        (record.status ? '<span class="zgs-company-relation-status">' + esc(record.status) + "</span>" : "") +
                        '<button class="zgs-company-relation-action" type="button">' + esc(record.action || "Zobacz") + "</button>" +
                      "</div>" +
                    "</li>"
                  );
                }).join("") +
              "</ul>"
            : "") +
          '<div class="zgs-action-list">' +
            (Array.isArray(relationsCard.actions) ? relationsCard.actions : []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article id="zgs-company-team-block" class="zgs-surface zgs-span-2 zgs-company-team">' +
          '<div class="zgs-company-team-head">' +
            "<h3>" + esc(companyData.teamTable && companyData.teamTable.title) + "</h3>" +
          "</div>" +
          '<div class="zgs-company-team-toolbar">' +
            '<label class="zgs-company-search-wrap" for="zgs-company-user-search">' +
              '<span class="zgs-company-search-label">Szukaj użytkowników</span>' +
              '<input id="zgs-company-user-search" class="zgs-company-search-input" type="search" placeholder="Imię, nazwisko, rola, zakres lub lokalizacja" data-company-user-search>' +
            "</label>" +
            '<div class="zgs-company-filter-bar" aria-label="Filtr statusu">' +
              '<button class="zgs-company-filter-btn is-active" type="button" data-company-status-filter="all" aria-pressed="true">Wszyscy</button>' +
              '<button class="zgs-company-filter-btn" type="button" data-company-status-filter="active" aria-pressed="false">Aktywni</button>' +
              '<button class="zgs-company-filter-btn" type="button" data-company-status-filter="pending" aria-pressed="false">Oczekujący</button>' +
              '<button class="zgs-company-filter-btn" type="button" data-company-status-filter="suspended" aria-pressed="false">Zawieszeni</button>' +
            "</div>" +
            '<label class="zgs-company-location-wrap" for="zgs-company-location-filter">' +
              '<span class="zgs-company-search-label">Lokalizacja</span>' +
              '<select id="zgs-company-location-filter" class="zgs-company-location-select" data-company-location-filter>' +
                '<option value="all">Wszystkie lokalizacje</option>' +
                teamLocations.map(function (location) {
                  return '<option value="' + esc(String(location).toLowerCase()) + '">' + esc(location) + "</option>";
                }).join("") +
              "</select>" +
            "</label>" +
            '<button class="zgs-action-btn is-primary zgs-company-add-user-btn" type="button">Dodaj użytkownika</button>' +
          "</div>" +
          '<div class="zgs-company-action-hint">' +
            '<div class="zgs-company-action-hint-main">' +
              '<p class="zgs-company-action-hint-title">Wymaga działania administratora: ' + esc(String(actionTotal)) + "</p>" +
              '<div class="zgs-company-action-hint-metrics">' +
                '<span>Użytkownicy do decyzji: ' + esc(String(waitingUsersCount)) + "</span>" +
                '<span>Wnioski o dołączenie: ' + esc(String(waitingJoinCount)) + "</span>" +
                '<span>Relacje do review: ' + esc(String(waitingRelationCount)) + "</span>" +
              "</div>" +
            "</div>" +
            '<button class="zgs-company-action-link" type="button" data-company-jump="decisions">Zobacz decyzje</button>' +
          "</div>" +
          '<div class="zgs-table-wrap zgs-company-table-wrap"><table class="zgs-table" aria-label="Lista użytkowników"><thead><tr>' +
            teamColumns.map(function (col) { return "<th>" + esc(col) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
            normalizedTeamRows.map(function (parsed) {
              return (
                '<tr data-company-user-row="1" data-company-status="' + esc(parsed.statusKey) + '" data-company-location="' + esc(parsed.locationKey) + '" data-company-keywords="' + esc(parsed.keywords) + '">' +
                  "<td>" + esc(parsed.name) + "</td>" +
                  "<td>" + esc(parsed.role) + "</td>" +
                  "<td>" + renderCompanyBadge(parsed.status) + "</td>" +
                  "<td>" + esc(parsed.scope) + "</td>" +
                  "<td>" + esc(parsed.location) + "</td>" +
                  "<td>" + esc(parsed.lastActivity) + "</td>" +
                  "<td>" + renderTeamActions(parsed.actions) + "</td>" +
                "</tr>"
              );
            }).join("") +
            '<tr class="zgs-company-empty-row" data-company-empty-row hidden><td colspan="' + esc(String(teamColumns.length || 7)) + '">Brak użytkowników dla wybranego filtra.</td></tr>' +
          "</tbody></table></div>" +
        "</article>" +
        '<article id="zgs-company-queue-block" class="zgs-surface zgs-company-queue"><div class="zgs-company-section-head"><h3>' + esc(companyData.actionQueue && companyData.actionQueue.title) + '</h3><span class="zgs-company-section-meta">' + esc(String(queueItems.length)) + ' otwarte</span></div><ul class="zgs-company-task-list">' +
          queueItems.map(function (item) {
            var task = typeof item === "string"
              ? { title: item, text: "", status: "" }
              : item;
            return (
              '<li class="zgs-company-task-item ' + queuePriorityClass(task) + '">' +
                '<div class="zgs-company-task-main">' +
                  '<strong>' + esc(task.title) + "</strong>" +
                  (task.text ? "<p>" + esc(task.text) + "</p>" : "") +
                "</div>" +
                '<div class="zgs-company-task-meta">' +
                  renderCompanyBadge(task.badge || task.status) +
                  (task.action ? '<button class="zgs-company-inline-action zgs-company-task-action" type="button">' + esc(task.action) + "</button>" : "") +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul></article>" +
        '<article id="zgs-company-join-block" class="zgs-surface zgs-company-join"><div class="zgs-company-section-head"><h3>' + esc(companyData.joinRequests && companyData.joinRequests.title) + '</h3><span class="zgs-company-section-meta">' + esc(String(joinItems.length)) + ' decyzje</span></div><ul class="zgs-company-join-list">' +
          joinItems.map(function (item) {
            var request = typeof item === "string"
              ? { subject: item, text: "", status: "", actions: [] }
              : item;
            return (
              '<li class="zgs-company-join-item">' +
                '<div class="zgs-company-join-main">' +
                  '<strong>' + esc(request.subject) + "</strong>" +
                  (request.text ? "<p>" + esc(request.text) + "</p>" : "") +
                  (request.type ? '<span class="zgs-company-request-type ' + requestTypeClass(request.type) + '">' + esc(request.type) + "</span>" : "") +
                "</div>" +
                '<div class="zgs-company-join-meta">' +
                  renderCompanyBadge(request.status) +
                  renderDecisionActions(request.actions) +
                "</div>" +
              "</li>"
            );
          }).join("") +
        "</ul></article>" +
      "</div>";

    initCompanyUsersTools(view);

    var searchParams = new URLSearchParams(window.location.search);
    var companyFocus = searchParams.get("companyFocus");
    if (companyFocus === "operations" || companyFocus === "balanced" || companyFocus === "bottom" || companyFocus === "end") {
      var shellContent = document.querySelector(".zgs-shell-content");
      var teamBlock = document.getElementById("zgs-company-team-block");
      if (shellContent && teamBlock) {
        if (companyFocus === "end") {
          requestAnimationFrame(function () {
            shellContent.scrollTop = shellContent.scrollHeight;
          });
          return;
        }
        var focusOffset = 140;
        if (companyFocus === "balanced") {
          focusOffset = 280;
        } else if (companyFocus === "bottom") {
          focusOffset = -220;
        }
        requestAnimationFrame(function () {
          shellContent.scrollTop = Math.max(0, teamBlock.offsetTop - focusOffset);
        });
      }
    }

  }

  function initCompanyUsersTools(scope) {
    var host = scope || document;
    var teamSection = host.querySelector(".zgs-company-team");
    var locationToggle = host.querySelector("[data-company-location-toggle]");
    var collapsedLocations = Array.prototype.slice.call(host.querySelectorAll(".zgs-company-location-item.is-collapsed"));
    if (!teamSection) {
      return;
    }

    var searchInput = teamSection.querySelector("[data-company-user-search]");
    var filterButtons = Array.prototype.slice.call(teamSection.querySelectorAll("[data-company-status-filter]"));
    var locationSelect = teamSection.querySelector("[data-company-location-filter]");
    var decisionJump = teamSection.querySelector('[data-company-jump="decisions"]');
    var rows = Array.prototype.slice.call(teamSection.querySelectorAll("[data-company-user-row]"));
    var emptyRow = teamSection.querySelector("[data-company-empty-row]");
    var joinBlock = host.querySelector("#zgs-company-join-block");
    if (!rows.length) {
      return;
    }

    var activeFilter = "all";
    var activeLocation = "all";

    function applyFilters() {
      var query = String((searchInput && searchInput.value) || "").trim().toLowerCase();
      var visible = 0;

      rows.forEach(function (row) {
        var status = row.getAttribute("data-company-status") || "other";
        var location = row.getAttribute("data-company-location") || "";
        var keywords = String(row.getAttribute("data-company-keywords") || "").toLowerCase();
        var statusMatch = activeFilter === "all" || status === activeFilter;
        var locationMatch = activeLocation === "all" || location === activeLocation;
        var queryMatch = !query || keywords.indexOf(query) !== -1;
        var show = statusMatch && locationMatch && queryMatch;

        row.style.display = show ? "" : "none";
        if (show) {
          visible += 1;
        }
      });

      if (emptyRow) {
        emptyRow.hidden = visible !== 0;
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = button.getAttribute("data-company-status-filter") || "all";
        filterButtons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", active ? "true" : "false");
        });
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    if (locationSelect) {
      locationSelect.addEventListener("change", function () {
        activeLocation = locationSelect.value || "all";
        applyFilters();
      });
    }

    if (decisionJump && joinBlock) {
      decisionJump.addEventListener("click", function () {
        joinBlock.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (locationToggle && collapsedLocations.length) {
      var expandedLocations = false;
      var totalLocations = parseInt(locationToggle.getAttribute("data-total-count"), 10) || collapsedLocations.length;
      locationToggle.addEventListener("click", function () {
        expandedLocations = !expandedLocations;
        collapsedLocations.forEach(function (item) {
          item.hidden = !expandedLocations;
        });
        locationToggle.textContent = expandedLocations ? "Pokaż mniej" : "Pokaż wszystkie (" + totalLocations + ")";
      });
    }

    applyFilters();
  }

  function renderLibrary() {
    var view = document.getElementById("zgs-view-product-library");
    if (!view) {
      return;
    }

    var stats = Array.isArray(libraryData.stats) ? libraryData.stats : [];
    var sourceCard = libraryData.sourceCard || {};
    var localCard = libraryData.localCard || {};
    var pipeline = libraryData.pipeline || {};
    var issues = libraryData.issues || {};
    var workspace = libraryData.workspace || {};

    function libraryStatusKey(status) {
      var value = String(status || "").toLowerCase();
      if (value.indexOf("konfl") !== -1) {
        return "conflict";
      }
      if (value.indexOf("publ") !== -1) {
        return "publish";
      }
      if (value.indexOf("arch") !== -1) {
        return "archived";
      }
      if (value.indexOf("akt") !== -1 || value.indexOf("połącz") !== -1) {
        return "active";
      }
      if (value.indexOf("review") !== -1) {
        return "review";
      }
      return "neutral";
    }

    function renderLibraryBadge(status) {
      if (!status) {
        return "";
      }
      return '<span class="zgs-library-badge is-' + esc(libraryStatusKey(status)) + '">' + esc(status) + "</span>";
    }

    function libraryAlignmentKey(value) {
      var status = String(value || "").toLowerCase();
      if (status.indexOf("over") !== -1) {
        return "override";
      }
      if (status.indexOf("róż") !== -1 || status.indexOf("rozn") !== -1 || status.indexOf("diff") !== -1) {
        return "diff";
      }
      return "aligned";
    }

    function renderLibraryAlignment(value) {
      if (!value) {
        return "";
      }
      return '<span class="zgs-library-alignment is-' + esc(libraryAlignmentKey(value)) + '">' + esc(value) + "</span>";
    }

    function renderLibraryActions(actions) {
      var list = Array.isArray(actions) ? actions : [];
      return (
        '<div class="zgs-library-row-actions">' +
          list.map(function (action, index) {
            return '<button class="zgs-library-row-action' + (index === 1 ? " is-primary" : "") + '" type="button">' + esc(action) + "</button>";
          }).join("") +
        "</div>"
      );
    }

    var normalizedRows = (Array.isArray(workspace.rows) ? workspace.rows : []).map(function (row) {
      var parsed = Array.isArray(row)
        ? {
            sku: row[0],
            name: row[1],
            category: row[2],
            priceNet: row[3],
            source: row[4],
            status: row[5],
            alignment: row[6],
            lastChange: row[7],
            actions: row[8] ? String(row[8]).split("/").map(function (part) { return part.trim(); }) : []
          }
        : (row || {});

      parsed.statusKey = libraryStatusKey(parsed.status);
      parsed.sourceKey = String(parsed.source || "").toLowerCase();
      parsed.categoryKey = String(parsed.category || "").toLowerCase();
      parsed.keywords = String((parsed.sku || "") + " " + (parsed.name || "") + " " + (parsed.category || "")).toLowerCase();
      return parsed;
    });

    var categories = [];
    normalizedRows.forEach(function (row) {
      var category = String(row.category || "").trim();
      if (category && categories.indexOf(category) === -1) {
        categories.push(category);
      }
    });

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
        '<article class="zgs-surface zgs-library-source">' +
          '<div class="zgs-library-card-head"><h3>' + esc(sourceCard.title) + '</h3>' + renderLibraryBadge(sourceCard.connectionStatus) + "</div>" +
          '<ul class="zgs-library-meta-list">' +
            '<li><span>Arkusz</span><strong>' + esc(sourceCard.sheetName) + "</strong></li>" +
            '<li><span>Liczba rekordów</span><strong>' + esc(sourceCard.recordCount) + "</strong></li>" +
            '<li><span>Ostatni sync</span><strong>' + esc(sourceCard.lastSync) + "</strong></li>" +
            '<li><span>Zmiany vs local</span><strong>' + esc(sourceCard.deltaVsLocal) + "</strong></li>" +
          "</ul>" +
          '<div class="zgs-action-list">' +
            (Array.isArray(sourceCard.actions) ? sourceCard.actions : []).map(function (action, index) {
              return '<button class="zgs-action-btn' + (index === 1 ? " is-primary" : "") + '" type="button">' + esc(action) + "</button>";
            }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-library-local">' +
          "<h3>" + esc(localCard.title) + "</h3>" +
          '<div class="zgs-library-metrics-grid">' +
            (Array.isArray(localCard.metrics) ? localCard.metrics : []).map(function (metric) {
              return '<div class="zgs-library-metric"><span>' + esc(metric.label) + "</span><strong>" + esc(metric.value) + "</strong></div>";
            }).join("") +
          "</div>" +
          '<div class="zgs-action-list">' +
            (Array.isArray(localCard.actions) ? localCard.actions : []).map(function (a) { return '<button class="zgs-action-btn" type="button">' + esc(a) + "</button>"; }).join("") +
          "</div>" +
        "</article>" +
        '<article class="zgs-surface zgs-library-pipeline">' +
          '<div class="zgs-library-card-head"><h3>' + esc(pipeline.title) + '</h3></div>' +
          '<div class="zgs-library-pipeline-steps">' +
            (Array.isArray(pipeline.steps) ? pipeline.steps : []).map(function (step) {
              return '<button class="zgs-library-stage' + (step.active ? " is-active" : "") + '" type="button" data-library-stage="' + esc(step.key) + '">' +
                "<span>" + esc(step.label) + "</span><strong>" + esc(String(step.count)) + "</strong></button>";
            }).join("") +
          "</div>" +
          '<p class="zgs-library-pipeline-label">Podsumowanie operacyjne</p>' +
          '<div class="zgs-library-pipeline-summary">' +
            (Array.isArray(pipeline.summary) ? pipeline.summary : []).map(function (item) {
              return '<div class="zgs-library-pipeline-stat"><span>' + esc(item.label) + "</span><strong>" + esc(item.value) + "</strong></div>";
            }).join("") +
          "</div>" +
          '<p class="zgs-library-pipeline-label">Wymaga decyzji</p>' +
          '<ul class="zgs-library-pipeline-info">' +
            (Array.isArray(pipeline.info) ? pipeline.info : []).map(function (line) {
              return "<li>" + esc(line) + "</li>";
            }).join("") +
          "</ul>" +
          '<button class="zgs-action-btn zgs-library-pipeline-cta" type="button" data-library-jump-issues="1">' + esc(pipeline.action || "Zobacz konflikty") + "</button>" +
        "</article>" +
        '<article id="zgs-library-issues-block" class="zgs-surface zgs-library-issues">' +
          '<div class="zgs-library-card-head"><h3>' + esc(issues.title) + "</h3>" + renderLibraryBadge(String((issues.items || []).length) + " decyzje") + "</div>" +
          '<ul class="zgs-library-issue-list">' +
            (Array.isArray(issues.items) ? issues.items : []).map(function (item, itemIndex) {
              return '<li class="zgs-library-issue-item' + (itemIndex === 0 ? " is-priority" : "") + '">' +
                '<div class="zgs-library-issue-main"><strong>' + esc(item.title) + "</strong><p>" + esc(item.text) + "</p></div>" +
                '<div class="zgs-library-issue-meta">' + renderLibraryBadge(item.status) + '<button class="zgs-library-row-action is-primary" type="button">' + esc(item.action) + "</button></div>" +
              "</li>";
            }).join("") +
          "</ul>" +
        "</article>" +
        '<article id="zgs-library-workspace-block" class="zgs-surface zgs-span-2 zgs-library-workspace">' +
          '<div class="zgs-library-workspace-head"><h3>' + esc(workspace.title) + "</h3></div>" +
          '<div class="zgs-library-toolbar">' +
            '<label class="zgs-library-search-wrap" for="zgs-library-search">' +
              '<span>Szukaj SKU / nazwa / kategoria</span>' +
              '<input id="zgs-library-search" class="zgs-library-search-input" type="search" placeholder="np. OGR-3D lub Ogrodzenia" data-library-search>' +
            "</label>" +
            '<label class="zgs-library-select-wrap zgs-library-status-wrap" for="zgs-library-status-filter">' +
              '<span>Status</span>' +
              '<select id="zgs-library-status-filter" class="zgs-library-select" data-library-status-filter><option value="all">Wszystkie</option><option value="active">Aktywne</option><option value="publish">Do publikacji</option><option value="conflict">Konflikty</option><option value="archived">Archiwalne</option></select>' +
            "</label>" +
            '<label class="zgs-library-select-wrap" for="zgs-library-source-filter"><span>Źródło</span><select id="zgs-library-source-filter" class="zgs-library-select" data-library-source-filter><option value="all">Wszystkie</option><option value="google">Google</option><option value="local">Local</option></select></label>' +
            '<label class="zgs-library-select-wrap" for="zgs-library-category-filter"><span>Kategoria</span><select id="zgs-library-category-filter" class="zgs-library-select" data-library-category-filter><option value="all">Wszystkie</option>' +
              categories.map(function (category) { return '<option value="' + esc(String(category).toLowerCase()) + '">' + esc(category) + "</option>"; }).join("") +
            "</select></label>" +
            '<div class="zgs-library-toolbar-actions">' +
              '<button class="zgs-action-btn is-primary zgs-library-add-btn" type="button">Dodaj produkt</button>' +
              '<button class="zgs-action-btn zgs-library-import-btn" type="button">Import CSV/XLSX</button>' +
            "</div>" +
          "</div>" +
          '<div class="zgs-library-bulk-row is-separated"><span>' + esc(workspace.bulkActionsLabel || "Akcje masowe:") + "</span>" +
            (Array.isArray(workspace.bulkActions) ? workspace.bulkActions : []).map(function (action) {
              return '<button class="zgs-library-row-action" type="button">' + esc(action) + "</button>";
            }).join("") +
          "</div>" +
          '<div class="zgs-table-wrap zgs-library-table-wrap"><table class="zgs-table zgs-library-table" aria-label="Scalona lista produktów"><thead><tr>' +
            '<th class="zgs-library-col-check"><input type="checkbox" aria-label="Zaznacz wszystkie" disabled></th>' +
            "<th>SKU</th><th>Nazwa</th><th>Kategoria</th><th>Cena netto</th><th>Źródło</th><th>Status</th><th>Ostatnia zmiana</th><th>Akcje</th>" +
          "</tr></thead><tbody>" +
            normalizedRows.map(function (row) {
              return (
                '<tr data-library-row="1" data-library-status="' + esc(row.statusKey) + '" data-library-source="' + esc(row.sourceKey) + '" data-library-category="' + esc(row.categoryKey) + '" data-library-keywords="' + esc(row.keywords) + '">' +
                  '<td class="zgs-library-col-check"><input type="checkbox" aria-label="Zaznacz rekord" disabled></td>' +
                  "<td>" + esc(row.sku) + "</td>" +
                  "<td>" + esc(row.name) + "</td>" +
                  "<td>" + esc(row.category) + "</td>" +
                  "<td>" + esc(row.priceNet) + "</td>" +
                  '<td><div class="zgs-library-source-cell"><span>' + esc(row.source) + "</span>" + renderLibraryAlignment(row.alignment) + "</div></td>" +
                  "<td>" + renderLibraryBadge(row.status) + "</td>" +
                  "<td>" + esc(row.lastChange) + "</td>" +
                  "<td>" + renderLibraryActions(row.actions) + "</td>" +
                "</tr>"
              );
            }).join("") +
            '<tr class="zgs-library-empty-row" data-library-empty-row hidden><td colspan="10">Brak rekordów dla wybranych filtrów.</td></tr>' +
          "</tbody></table></div>" +
        "</article>" +
      "</div>";

    initLibraryTools(view);

    var searchParams = new URLSearchParams(window.location.search);
    var libraryFocus = searchParams.get("libraryFocus");
    var shellContent = document.querySelector(".zgs-shell-content");
    var workspaceBlock = document.getElementById("zgs-library-workspace-block");
    if (!shellContent) {
      return;
    }

    if (libraryFocus === "workspace" && workspaceBlock) {
      requestAnimationFrame(function () {
        shellContent.scrollTop = Math.max(0, workspaceBlock.offsetTop - 150);
      });
      return;
    }

    if (libraryFocus === "middle") {
      requestAnimationFrame(function () {
        shellContent.scrollTop = Math.max(0, Math.round((shellContent.scrollHeight - shellContent.clientHeight) * 0.5));
      });
      return;
    }

    if (libraryFocus === "bottom") {
      requestAnimationFrame(function () {
        shellContent.scrollTop = shellContent.scrollHeight;
      });
    }
  }

  function initLibraryTools(scope) {
    var host = scope || document;
    var workspace = host.querySelector(".zgs-library-workspace");
    if (!workspace) {
      return;
    }

    var searchInput = workspace.querySelector("[data-library-search]");
    var statusSelect = workspace.querySelector("[data-library-status-filter]");
    var sourceSelect = workspace.querySelector("[data-library-source-filter]");
    var categorySelect = workspace.querySelector("[data-library-category-filter]");
    var rows = Array.prototype.slice.call(workspace.querySelectorAll("[data-library-row]"));
    var emptyRow = workspace.querySelector("[data-library-empty-row]");
    var stageButtons = Array.prototype.slice.call(host.querySelectorAll("[data-library-stage]"));
    var jumpIssues = host.querySelector("[data-library-jump-issues]");
    var issuesBlock = host.querySelector("#zgs-library-issues-block");
    if (!rows.length) {
      return;
    }

    var activeStatus = "all";

    function setStatusFilter(nextStatus) {
      activeStatus = nextStatus || "all";
      if (statusSelect && statusSelect.value !== activeStatus) {
        statusSelect.value = activeStatus;
      }
    }

    function applyFilters() {
      var query = String((searchInput && searchInput.value) || "").trim().toLowerCase();
      var source = String((sourceSelect && sourceSelect.value) || "all");
      var category = String((categorySelect && categorySelect.value) || "all");
      var visible = 0;

      rows.forEach(function (row) {
        var status = row.getAttribute("data-library-status") || "neutral";
        var rowSource = row.getAttribute("data-library-source") || "";
        var rowCategory = row.getAttribute("data-library-category") || "";
        var keywords = String(row.getAttribute("data-library-keywords") || "").toLowerCase();
        var statusMatch = activeStatus === "all" || status === activeStatus;
        var sourceMatch = source === "all" || rowSource === source;
        var categoryMatch = category === "all" || rowCategory === category;
        var queryMatch = !query || keywords.indexOf(query) !== -1;
        var show = statusMatch && sourceMatch && categoryMatch && queryMatch;

        row.style.display = show ? "" : "none";
        if (show) {
          visible += 1;
        }
      });

      if (emptyRow) {
        emptyRow.hidden = visible !== 0;
      }
    }

    setStatusFilter("all");

    stageButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        stageButtons.forEach(function (stage) {
          stage.classList.toggle("is-active", stage === button);
        });
        var stageKey = button.getAttribute("data-library-stage");
        if (stageKey === "validation") {
          setStatusFilter("conflict");
        } else if (stageKey === "publish") {
          setStatusFilter("publish");
        } else {
          setStatusFilter("all");
        }
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    if (statusSelect) {
      statusSelect.addEventListener("change", function () {
        setStatusFilter(statusSelect.value);
        applyFilters();
      });
    }

    if (sourceSelect) {
      sourceSelect.addEventListener("change", applyFilters);
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", applyFilters);
    }

    if (jumpIssues && issuesBlock) {
      jumpIssues.addEventListener("click", function () {
        issuesBlock.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    applyFilters();
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

  function initShellScrollIndicator() {
    var shellWindow = document.querySelector(".zgs-shell-window");
    var shellContent = document.querySelector(".zgs-shell-content");
    if (!shellWindow || !shellContent) {
      return;
    }

    var indicator = document.createElement("div");
    indicator.className = "zgs-scroll-indicator";
    indicator.setAttribute("aria-hidden", "true");
    indicator.innerHTML = '<span class="zgs-scroll-indicator-thumb"></span>';
    shellWindow.appendChild(indicator);

    var thumb = indicator.querySelector(".zgs-scroll-indicator-thumb");
    if (!thumb) {
      return;
    }

    function updateGeometry() {
      var shellRect = shellWindow.getBoundingClientRect();
      var contentRect = shellContent.getBoundingClientRect();
      var top = Math.max(0, Math.round(contentRect.top - shellRect.top) + 8);
      var height = Math.max(40, Math.round(contentRect.height) - 16);
      indicator.style.top = top + "px";
      indicator.style.height = height + "px";
    }

    function updateState() {
      var scrollHeight = shellContent.scrollHeight;
      var clientHeight = shellContent.clientHeight;
      var hasOverflow = scrollHeight > clientHeight + 4;
      indicator.classList.toggle("is-visible", hasOverflow);

      if (!hasOverflow) {
        thumb.style.transform = "translateY(0px)";
        thumb.style.height = "0px";
        return;
      }

      var trackHeight = Math.max(0, indicator.clientHeight);
      var thumbHeight = Math.max(30, Math.round((clientHeight / scrollHeight) * trackHeight));
      var maxScroll = Math.max(1, scrollHeight - clientHeight);
      var maxThumbTravel = Math.max(0, trackHeight - thumbHeight);
      var ratio = Math.min(1, shellContent.scrollTop / maxScroll);
      thumb.style.height = thumbHeight + "px";
      thumb.style.transform = "translateY(" + Math.round(maxThumbTravel * ratio) + "px)";
    }

    function updateAll() {
      updateGeometry();
      updateState();
    }

    refreshShellScrollIndicator = updateAll;

    shellContent.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateAll);

    if (window.ResizeObserver) {
      var resizeObserver = new ResizeObserver(updateAll);
      resizeObserver.observe(shellWindow);
      resizeObserver.observe(shellContent);
    }

    updateAll();
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
    var shellContent = document.querySelector(".zgs-shell-content");

    views.forEach(function (view) {
      var active = view.getAttribute("data-view") === target;
      view.classList.toggle("is-active", active);
      view.hidden = !active;
    });

    setNavActive(target);

    if (breadcrumb) {
      breadcrumb.textContent = viewLabels[target];
    }

    refreshShellScrollIndicator();

    if (target === "launcher" && shellContent && params && params.get("startFocus")) {
      var startFocus = params.get("startFocus");
      requestAnimationFrame(function () {
        if (startFocus === "middle") {
          shellContent.scrollTop = Math.max(0, Math.round((shellContent.scrollHeight - shellContent.clientHeight) * 0.5));
        } else if (startFocus === "bottom") {
          shellContent.scrollTop = shellContent.scrollHeight;
        } else {
          shellContent.scrollTop = 0;
        }
        refreshShellScrollIndicator();
      });
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
  initShellScrollIndicator();

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

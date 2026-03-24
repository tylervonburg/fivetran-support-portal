const appState = {
  state: "conversation_start",
  supportDomain: null,
  productArea: null,
  issueType: null,
  customerGoal: null,
  collected: {},
  troubleshootingSteps: [],
  evidence: [],
  missingInformation: [],
  escalationReason: null,
  ticketCreated: false,
  messages: []
};

const mockTickets = {
  "FTSUP-18427": {
    id: "FTSUP-18427",
    title: "NetSuite connector showing reconnect required",
    statusLabel: "Open",
    statusClass: "ticket-chip ticket-chip--open",
    meta: "Product support · Standard Fivetran issue · Connector issue",
    summary: "Latest update: Support confirmed the connection began failing at 8:03 AM ET and asked the customer to validate the current source authorization.",
    timeline: [
      {
        title: "Today · 8:42 AM ET",
        body: "Support reviewed the connector status and confirmed the current failure pattern is consistent with a reconnect-required state."
      },
      {
        title: "Today · 8:49 AM ET",
        body: "Customer shared the connection name, destination, and the exact reconnect warning shown in the dashboard."
      },
      {
        title: "Today · 9:01 AM ET",
        body: "Support asked the customer to validate the active source credentials and report whether a reconnect clears the warning."
      }
    ],
    thread: [
      {
        role: "support",
        author: "Fivetran Support",
        timestamp: "Today · 8:42 AM ET",
        body: "Thanks for reaching out. I reviewed the connector status and confirmed the current pattern is consistent with a reconnect-required state."
      },
      {
        role: "customer",
        author: "You",
        timestamp: "Today · 8:46 AM ET",
        body: "Thanks. The connector was healthy yesterday and started failing this morning."
      },
      {
        role: "support",
        author: "Fivetran Support",
        timestamp: "Today · 9:01 AM ET",
        body: "Please validate the current source authorization in setup and let us know whether reconnecting clears the warning."
      }
    ]
  },
  "FTSUP-18391": {
    id: "FTSUP-18391",
    title: "Activation sync completing with 0 records sent",
    statusLabel: "Pending",
    statusClass: "ticket-chip ticket-chip--pending",
    meta: "Product support · Activations issue",
    summary: "Latest update: Customer provided permission for support to trigger the affected sync and attached screenshots showing field-mapping mismatches.",
    timeline: [
      {
        title: "Today · 10:14 AM ET",
        body: "Customer shared the affected Activation Sync link and screenshots showing 0 records sent despite a completed run."
      },
      {
        title: "Today · 10:27 AM ET",
        body: "Support confirmed it has permission to trigger the sync if needed for troubleshooting."
      },
      {
        title: "Today · 10:38 AM ET",
        body: "Support is waiting on customer confirmation of the expected audience criteria before proceeding with the next sync-level check."
      }
    ],
    thread: [
      {
        role: "support",
        author: "Fivetran Support",
        timestamp: "Today · 10:14 AM ET",
        body: "Thanks for sharing the Activation Sync link and screenshots. I can see the completed run with 0 records sent."
      },
      {
        role: "customer",
        author: "You",
        timestamp: "Today · 10:19 AM ET",
        body: "That matches what we see. The audience should have included several hundred users."
      },
      {
        role: "support",
        author: "Fivetran Support",
        timestamp: "Today · 10:27 AM ET",
        body: "Thanks for confirming and for granting permission to trigger the sync if needed. Please confirm the expected audience criteria before we proceed."
      }
    ]
  },
  "FTSUP-18264": {
    id: "FTSUP-18264",
    title: "Invoice clarification request for February usage",
    statusLabel: "On hold",
    statusClass: "ticket-chip ticket-chip--hold",
    meta: "Billing support · Invoice query",
    summary: "Latest update: Support requested confirmation of the billing period and the specific line items the customer wants reviewed.",
    timeline: [
      {
        title: "Yesterday · 2:12 PM ET",
        body: "Customer asked for clarification on February invoice charges and whether transformation-related usage was included."
      },
      {
        title: "Yesterday · 2:26 PM ET",
        body: "Billing support requested the exact invoice number and the line items the customer wants reviewed."
      },
      {
        title: "Yesterday · 4:05 PM ET",
        body: "Case moved to on hold pending customer confirmation of the invoice reference."
      }
    ],
    thread: [
      {
        role: "customer",
        author: "You",
        timestamp: "Yesterday · 2:12 PM ET",
        body: "I need clarification on our February invoice, especially whether transformation-related usage is included."
      },
      {
        role: "support",
        author: "Fivetran Billing Support",
        timestamp: "Yesterday · 2:26 PM ET",
        body: "Happy to help. Please share the invoice number and the specific line items you would like us to review."
      }
    ]
  },
  "FTSUP-18102": {
    id: "FTSUP-18102",
    title: "Snowflake destination load delay resolved",
    statusLabel: "Closed",
    statusClass: "ticket-chip ticket-chip--closed",
    meta: "Product support · Destination issue",
    summary: "Latest update: Support confirmed the delayed load completed successfully and the customer verified the destination is current.",
    timeline: [
      {
        title: "3 days ago · 9:05 AM ET",
        body: "Customer reported that destination loads were completing later than expected."
      },
      {
        title: "3 days ago · 10:11 AM ET",
        body: "Support reviewed destination activity and confirmed load throughput had returned to normal."
      },
      {
        title: "3 days ago · 11:02 AM ET",
        body: "Customer confirmed the destination was current and the case was marked solved."
      }
    ],
    thread: [
      {
        role: "customer",
        author: "You",
        timestamp: "3 days ago · 9:05 AM ET",
        body: "Our Snowflake destination load is taking much longer than usual to complete."
      },
      {
        role: "support",
        author: "Fivetran Support",
        timestamp: "3 days ago · 10:11 AM ET",
        body: "Thanks for flagging this. We reviewed destination activity and confirmed that load throughput has returned to normal."
      },
      {
        role: "customer",
        author: "You",
        timestamp: "3 days ago · 11:02 AM ET",
        body: "Confirmed. The destination is current again. Thanks for the help."
      }
    ]
  }
};

const supportPaths = {
  standard_product: [
    "destination_type",
    "destination_name",
    "connector_type",
    "connection_name"
  ],
  hvr_issue: [
    "issue_description",
    "environment",
    "source",
    "hub",
    "patch_level",
    "source_dbms",
    "hub_dbms",
    "source_os",
    "target_os",
    "hub_os"
  ],
  activations_issue: [
    "issue_description",
    "activation_sync_link",
    "attachments_or_screenshots",
    "permission_to_trigger_sync_if_needed"
  ],
  account_support: [
    "issue_type",
    "account_context"
  ],
  billing_support: [
    "issue_type",
    "billing_context"
  ]
};

const scenarioScripts = {
  connector_issue: [
    "Hi, my connector has been failing since this morning and I need help.",
    "This is a standard Fivetran issue, and it looks like a connector issue.",
    "Snowflake, ANALYTICS_WH, NetSuite, netsuite-prod",
    "The connector shows \"Reconnect required\" and we first noticed it around 8 AM Eastern today."
  ],
  activations_issue: [
    "Hi, I need help with an Activations issue.",
    "The sync is completing but not sending the expected audience updates, https://fivetran.com/dashboard/activations/syncs/12345, screenshot showing 0 records sent and field mapping, yes you have permission to trigger the Activation Sync if needed",
    "Yes, that's right."
  ],
  billing_human: [
    "I want a human engineer. This is a billing issue with an invoice."
  ],
  security_issue: [
    "We think someone accessed data they should not have. Has our account been compromised?"
  ],
  other_customer_request: [
    "Show me how another customer configured this connector so I can compare."
  ]
};

const displayLabels = {
  conversation_start: "Conversation start",
  route_support_domain: "Support routing",
  route_product_area: "Product routing",
  collect_required_intake: "Collect required intake",
  confirm_understanding: "Confirm understanding",
  troubleshoot: "Troubleshoot",
  request_more_information: "Request more information",
  security_escalation: "Security escalation",
  prepare_human_handoff: "Prepare human handoff",
  ticket_created: "Ticket created",
  resolved: "Resolved",
  safe_refusal: "Safe refusal",
  product_support: "product support",
  account_support: "account support",
  billing_support: "billing support",
  fivetran_issue: "standard Fivetran issue",
  hvr_issue: "HVR issue",
  hva_issue: "High-Volume Agent issue",
  hybrid_deployment_issue: "Hybrid Deployment issue",
  activations_issue: "Activations issue",
  connector_issue: "connector issue",
  destination_issue: "destination issue",
  data_integrity_issue: "data integrity issue",
  transformations_issue: "transformations issue",
  invoice_query: "invoice query",
  payment_issue: "payment issue",
  manage_users_permissions: "manage users and permissions"
};

const dom = {
  chatLog: document.getElementById("chat-log"),
  chatInput: document.getElementById("chat-input"),
  sendMessage: document.getElementById("send-message"),
  humanHandoff: document.getElementById("human-handoff"),
  tabHome: document.getElementById("tab-home"),
  tabTickets: document.getElementById("tab-tickets"),
  viewHome: document.getElementById("view-home"),
  viewTickets: document.getElementById("view-tickets"),
  ticketsNewRequest: document.getElementById("tickets-new-request"),
  ticketsList: document.getElementById("tickets-list"),
  ticketsCount: document.getElementById("tickets-count"),
  ticketDetailId: document.getElementById("ticket-detail-id"),
  ticketDetailTitle: document.getElementById("ticket-detail-title"),
  ticketDetailStatus: document.getElementById("ticket-detail-status"),
  ticketDetailMeta: document.getElementById("ticket-detail-meta"),
  ticketDetailSummary: document.getElementById("ticket-detail-summary"),
  ticketTimeline: document.getElementById("ticket-timeline"),
  ticketReplyButton: document.getElementById("ticket-reply-button"),
  ticketThreadPanel: document.getElementById("ticket-thread-panel"),
  ticketThreadLog: document.getElementById("ticket-thread-log"),
  ticketThreadInput: document.getElementById("ticket-thread-input"),
  ticketThreadSend: document.getElementById("ticket-thread-send"),
  heroState: document.getElementById("hero-state"),
  heroTicketStatus: document.getElementById("hero-ticket-status"),
  stateValue: document.getElementById("state-value"),
  stateKey: document.getElementById("state-key"),
  domainValue: document.getElementById("domain-value"),
  domainKey: document.getElementById("domain-key"),
  productValue: document.getElementById("product-value"),
  productKey: document.getElementById("product-key"),
  issueTypeValue: document.getElementById("issue-type-value"),
  issueTypeKey: document.getElementById("issue-type-key"),
  intakeChecklist: document.getElementById("intake-checklist"),
  ticketPreview: document.getElementById("ticket-preview")
};

let selectedTicketId = "FTSUP-18427";
let activeTicketFilter = "all";

function addMessage(role, text, meta = "") {
  appState.messages.push({ role, text, meta });
  renderMessages();
}

function renderMessages() {
  dom.chatLog.innerHTML = "";

  for (const message of appState.messages) {
    const wrapper = document.createElement("article");
    wrapper.className = `message message--${message.role}`;

    const avatar = document.createElement("div");
    avatar.className = "message__avatar";
    avatar.textContent = message.role === "agent" ? "AI" : "You";

    const bubble = document.createElement("div");
    bubble.className = "message__bubble";

    const meta = document.createElement("div");
    meta.className = "message__meta";
    meta.textContent = message.role === "agent" ? "Fivetran L1 Support Agent" : "Customer";

    const text = document.createElement("div");
    text.className = "message__text";
    text.innerHTML = formatMessage(message.text);

    bubble.appendChild(meta);
    bubble.appendChild(text);
    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    dom.chatLog.appendChild(wrapper);
  }

  dom.chatLog.scrollTop = dom.chatLog.scrollHeight;
}

function formatMessage(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n- (.*?)(?=\n|$)/g, "<ul><li>$1</li></ul>")
    .replace(/<\/ul><ul>/g, "")
    .replace(/\n/g, "<br>");
}

function setState(nextState) {
  appState.state = nextState;
  renderRuntime();
}

function renderRuntime() {
  dom.heroState.textContent = appState.state;
  dom.stateValue.textContent = prettyLabel(appState.state) || "Conversation start";
  dom.stateKey.textContent = appState.state;
  dom.domainValue.textContent = prettyLabel(appState.supportDomain) || "Not selected";
  dom.domainKey.textContent = appState.supportDomain || "none";
  dom.productValue.textContent = prettyLabel(appState.productArea) || "Not selected";
  dom.productKey.textContent = appState.productArea || "none";
  dom.issueTypeValue.textContent = prettyLabel(appState.issueType) || "Not selected";
  dom.issueTypeKey.textContent = appState.issueType || "none";
  dom.heroTicketStatus.textContent = appState.ticketCreated ? "Ticket prepared" : "No ticket created";
  renderChecklist();
  renderTicketPreview();
}

function prettyLabel(value) {
  return value ? (displayLabels[value] || String(value).replace(/_/g, " ")) : "";
}

function setActiveView(view) {
  const showHome = view === "home";
  dom.viewHome.classList.toggle("is-hidden", !showHome);
  dom.viewTickets.classList.toggle("is-hidden", showHome);
  dom.tabHome.classList.toggle("tab--active", showHome);
  dom.tabTickets.classList.toggle("tab--active", !showHome);
}

function applyTicketFilter(filter) {
  activeTicketFilter = filter;
  let visibleCount = 0;

  dom.ticketsList.querySelectorAll(".ticket-card").forEach((card) => {
    const matches = filter === "all" || card.dataset.ticketFilter === filter;
    card.classList.toggle("is-hidden", !matches);
    if (matches) visibleCount += 1;
  });

  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("filter-chip--active", chip.dataset.filter === filter);
  });

  dom.ticketsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "ticket" : "tickets"}`;

  const selectedCard = dom.ticketsList.querySelector(`.ticket-card[data-ticket-id="${selectedTicketId}"]`);
  if (selectedCard && selectedCard.classList.contains("is-hidden")) {
    const firstVisible = dom.ticketsList.querySelector(".ticket-card:not(.is-hidden)");
    if (firstVisible) {
      renderTicketDetail(firstVisible.dataset.ticketId);
    }
  }
}

function renderTicketDetail(ticketId) {
  const ticket = mockTickets[ticketId];
  if (!ticket) return;
  selectedTicketId = ticketId;

  dom.ticketDetailId.textContent = ticket.id;
  dom.ticketDetailTitle.textContent = ticket.title;
  dom.ticketDetailStatus.className = ticket.statusClass;
  dom.ticketDetailStatus.textContent = ticket.statusLabel;
  dom.ticketDetailMeta.textContent = ticket.meta;
  dom.ticketDetailSummary.textContent = ticket.summary;
  dom.ticketTimeline.innerHTML = "";

  ticket.timeline.forEach((entry) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const body = document.createElement("span");
    title.textContent = entry.title;
    body.textContent = entry.body;
    item.appendChild(title);
    item.appendChild(body);
    dom.ticketTimeline.appendChild(item);
  });

  dom.ticketsList.querySelectorAll(".ticket-card").forEach((card) => {
    card.classList.toggle("ticket-card--active", card.dataset.ticketId === ticketId);
  });

  renderTicketThread(ticketId);
}

function renderTicketThread(ticketId) {
  const ticket = mockTickets[ticketId];
  if (!ticket) return;

  dom.ticketThreadLog.innerHTML = "";
  ticket.thread.forEach((entry) => {
    const item = document.createElement("article");
    item.className = `thread-message thread-message--${entry.role}`;

    const meta = document.createElement("div");
    meta.className = "thread-message__meta";

    const author = document.createElement("strong");
    author.textContent = entry.author;

    const timestamp = document.createElement("span");
    timestamp.textContent = entry.timestamp;

    const body = document.createElement("div");
    body.className = "thread-message__body";
    body.textContent = entry.body;

    meta.appendChild(author);
    meta.appendChild(timestamp);
    item.appendChild(meta);
    item.appendChild(body);
    dom.ticketThreadLog.appendChild(item);
  });

  dom.ticketThreadLog.scrollTop = dom.ticketThreadLog.scrollHeight;
}

function openTicketThread() {
  dom.ticketThreadPanel.classList.remove("is-hidden");
  dom.ticketThreadInput.focus();
}

function sendTicketReply() {
  const value = dom.ticketThreadInput.value.trim();
  if (!value || !mockTickets[selectedTicketId]) return;

  mockTickets[selectedTicketId].thread.push({
    role: "customer",
    author: "You",
    timestamp: "Just now",
    body: value
  });

  mockTickets[selectedTicketId].timeline.unshift({
    title: "Just now",
    body: `Customer reply added: ${value}`
  });

  dom.ticketThreadInput.value = "";
  renderTicketDetail(selectedTicketId);
}

function currentRequiredFields() {
  if (appState.supportDomain === "product_support") {
    if (appState.productArea === "hvr_issue") {
      return supportPaths.hvr_issue;
    }
    if (appState.productArea === "activations_issue") {
      return supportPaths.activations_issue;
    }
    if (appState.productArea) {
      return supportPaths.standard_product;
    }
    return [];
  }
  if (appState.supportDomain === "account_support") {
    return supportPaths.account_support;
  }
  if (appState.supportDomain === "billing_support") {
    return supportPaths.billing_support;
  }
  return [];
}

function renderChecklist() {
  const fields = currentRequiredFields();
  dom.intakeChecklist.innerHTML = "";

  if (!fields.length) {
    const li = document.createElement("li");
    li.textContent = "No intake path selected yet.";
    li.dataset.complete = "false";
    dom.intakeChecklist.appendChild(li);
    return;
  }

  fields.forEach((field) => {
    const li = document.createElement("li");
    li.textContent = String(field).replace(/_/g, " ");
    li.dataset.complete = String(Boolean(appState.collected[field]));
    dom.intakeChecklist.appendChild(li);
  });
}

function renderTicketPreview() {
  if (!appState.ticketCreated && !appState.escalationReason) {
    dom.ticketPreview.textContent = "No escalation prepared yet.";
    return;
  }

  const payload = buildEscalationPayload();
  dom.ticketPreview.textContent = formatEscalationPreview(payload);
}

function formatEscalationPreview(payload) {
  const intakeLines = Object.entries(payload.collected_intake_fields || {})
    .map(([key, value]) => `- ${String(key).replace(/_/g, " ")}: ${value}`)
    .join("\n");

  const evidenceLines = (payload.evidence || [])
    .map((item) => `- ${item}`)
    .join("\n");

  const recommendationLines = (payload.initial_recommendations_provided_by_l1_support_ai_agent || [])
    .map((item) => `- ${item}`)
    .join("\n");

  const nextStepLines = (payload.suggested_next_steps_for_human_cse || [])
    .map((item) => `- ${item}`)
    .join("\n");

  const missingLines = (payload.missing_information || [])
    .map((item) => `- ${item}`)
    .join("\n");

  const issueSummary = [
    payload.issue_summary,
    intakeLines ? "\nCollected Intake Fields\n" + intakeLines : "",
    evidenceLines ? "\nEvidence\n" + evidenceLines : "",
    payload.escalation_reason ? `\nEscalation Reason\n- ${String(payload.escalation_reason).replace(/_/g, " ")}` : "",
    missingLines ? "\nImportant Missing Information\n" + missingLines : ""
  ].filter(Boolean).join("\n");

  return [
    "Issue Summary",
    issueSummary,
    "",
    "Initial Recommendations Provided by L1 Support AI Agent",
    recommendationLines || "- No troubleshooting steps were attempted before escalation.",
    "",
    "Suggested Next Steps for Human CSE",
    nextStepLines || "- Review the collected customer context and continue investigation."
  ].join("\n");
}

function buildEscalationPayload() {
  return {
    support_domain: appState.supportDomain || "unknown",
    product_area: appState.productArea || "unknown",
    issue_type: appState.issueType || "unknown",
    customer_goal: appState.customerGoal || "Get support for the reported issue",
    issue_summary: summarizeIssue(),
    initial_recommendations_provided_by_l1_support_ai_agent: appState.troubleshootingSteps.length
      ? appState.troubleshootingSteps
      : ["No troubleshooting steps were attempted before escalation."],
    suggested_next_steps_for_human_cse: suggestedNextSteps(),
    collected_intake_fields: appState.collected,
    evidence: appState.evidence,
    troubleshooting_steps_attempted: appState.troubleshootingSteps,
    missing_information: appState.missingInformation,
    escalation_reason: appState.escalationReason || "customer_requested_human"
  };
}

function summarizeIssue() {
  const pieces = [];
  if (appState.customerGoal) pieces.push(appState.customerGoal);
  if (appState.supportDomain) pieces.push(`Support domain: ${appState.supportDomain}.`);
  if (appState.productArea) pieces.push(`Product area: ${appState.productArea}.`);
  if (appState.issueType) pieces.push(`Issue type: ${appState.issueType}.`);
  if (appState.collected.connection_name) pieces.push(`Connection: ${appState.collected.connection_name}.`);
  if (appState.collected.destination_name) pieces.push(`Destination: ${appState.collected.destination_name}.`);
  if (appState.collected.issue_description) pieces.push(`Description: ${appState.collected.issue_description}.`);
  return pieces.join(" ").trim() || "Customer reported an issue and requested support.";
}

function suggestedNextSteps() {
  if (appState.escalationReason === "security_sensitive") {
    return [
      "Review the reported security-sensitive behavior using the provided timestamps and evidence.",
      "Engage the approved security response workflow.",
      "Continue customer communication with security-aware language."
    ];
  }
  return [
    "Review the collected intake context and reported evidence.",
    "Avoid repeating already attempted L1 troubleshooting steps unless validation is needed.",
    "Continue investigation from the most likely affected product area."
  ];
}

function parseCommaFields(input, fields) {
  const values = input.split(",").map((item) => item.trim()).filter(Boolean);
  if (values.length >= fields.length) {
    fields.forEach((field, index) => {
      appState.collected[field] = values[index];
    });
    return true;
  }
  return false;
}

function detectSecurityIssue(text) {
  return /\b(compromised|breach|security|unauthorized|accessed data|exposed data)\b/i.test(text);
}

function detectOtherCustomerRequest(text) {
  return /\b(other customer|another customer|internal notes|internal logs|similar customers|impacted customers)\b/i.test(text);
}

function detectHumanRequest(text) {
  return /\b(human|ticket|person|engineer)\b/i.test(text) && /\b(open|want|need|prefer|speak|create)\b/i.test(text);
}

function supportDomainFromText(text) {
  if (/billing|invoice|payment|mar|sla/i.test(text)) return "billing_support";
  if (/permission|users|notification|account setup|banner/i.test(text)) return "account_support";
  if (/connector|destination|sync|activation|hvr|hybrid|high-volume|fivetran/i.test(text)) return "product_support";
  return null;
}

function productAreaFromText(text) {
  if (/activations?|census/i.test(text)) return "activations_issue";
  if (/\bhvr\b/i.test(text)) return "hvr_issue";
  if (/high-volume|hva/i.test(text)) return "hva_issue";
  if (/hybrid/i.test(text)) return "hybrid_deployment_issue";
  if (/\bfivetran\b|standard fivetran|standard issue/i.test(text)) return "fivetran_issue";
  return null;
}

function issueTypeFromText(text) {
  if (/connector/i.test(text)) return "connector_issue";
  if (/destination/i.test(text)) return "destination_issue";
  if (/integrity|missing records|duplicate|incorrect data/i.test(text)) return "data_integrity_issue";
  if (/transform|dbt/i.test(text)) return "transformations_issue";
  if (/invoice/i.test(text)) return "invoice_query";
  if (/payment/i.test(text)) return "payment_issue";
  if (/permission|user/i.test(text)) return "manage_users_permissions";
  return null;
}

function startPrototype() {
  addMessage(
    "agent",
    "Hi, I'm Fivetran's support AI agent. I can help troubleshoot this with you, and if you'd prefer, I can open a support ticket for a human engineer at any time. Could you describe the issue you're running into?"
  );
  renderRuntime();
}

function triggerHumanHandoff(reason = "customer_requested_human") {
  appState.escalationReason = reason;
  setState("prepare_human_handoff");
  addMessage(
    "agent",
    "I’m going to prepare a support ticket for a human Customer Support Engineer so you do not need to restate everything. I’ll include the details we’ve already gathered and the steps we’ve already tried."
  );
  appState.ticketCreated = true;
  setState("ticket_created");
  addMessage(
    "agent",
    "Your support ticket is ready in this prototype view, and the escalation preview is shown on the right."
  );
  renderRuntime();
}

function triggerSecurityEscalation(text) {
  appState.evidence.push(text);
  appState.escalationReason = "security_sensitive";
  setState("security_escalation");
  addMessage(
    "agent",
    "Thank you for raising this right away. I understand the urgency, and I’m treating this as a priority. I’m escalating this to the appropriate team for investigation now.\n\nTo help with that handoff, could you share what you observed, when you first noticed it, and any relevant timestamps, logs, or screenshots? While the investigation is underway, I want to avoid speculating before the right team reviews the details."
  );
  appState.ticketCreated = true;
  renderRuntime();
}

function triggerSafeRefusal() {
  setState("safe_refusal");
  addMessage(
    "agent",
    "I can only discuss information related to your own account and authorized support context. If you share what you’re seeing in your environment, I can help investigate that with you or open a ticket for a human engineer."
  );
  renderRuntime();
}

function handleMessage(rawText) {
  const text = rawText.trim();
  if (!text) return;

  addMessage("customer", text);

  if (detectSecurityIssue(text)) {
    appState.customerGoal = text;
    return triggerSecurityEscalation(text);
  }

  if (detectOtherCustomerRequest(text)) {
    return triggerSafeRefusal();
  }

  if (detectHumanRequest(text)) {
    if (!appState.supportDomain) {
      appState.supportDomain = supportDomainFromText(text) || appState.supportDomain;
      appState.issueType = issueTypeFromText(text) || appState.issueType;
    }
    return triggerHumanHandoff("customer_requested_human");
  }

  switch (appState.state) {
    case "conversation_start": {
      appState.customerGoal = text;
      appState.supportDomain = supportDomainFromText(text);
      appState.productArea = productAreaFromText(text) || appState.productArea;
      appState.issueType = issueTypeFromText(text);

      if (appState.supportDomain === "product_support" && appState.productArea) {
        setState("collect_required_intake");
        if (appState.productArea === "hvr_issue") {
          addMessage(
            "agent",
            "Thanks. I’m treating this as an HVR support request. Before I troubleshoot, please share the issue description, environment, source, hub, patch level, source DBMS, hub DBMS, source OS, target OS, and hub OS."
          );
        } else if (appState.productArea === "activations_issue") {
          addMessage(
            "agent",
            "Thanks. I’m treating this as an Activations support request. Before I troubleshoot, please share a short description of the issue, a link to the affected Activation Sync if you have it, any relevant screenshots, and whether you give Fivetran permission to trigger the Activation Sync for troubleshooting if needed."
          );
        } else {
          addMessage(
            "agent",
            "Thanks. I’m treating this as a standard Fivetran product-support issue. Before I troubleshoot, I need four details so I can look at the right context: Destination Type, Destination Name, Connector Type, and Connection Name."
          );
        }
        renderRuntime();
        return;
      }

      setState("route_support_domain");
      if (appState.supportDomain) {
        addMessage(
          "agent",
          appState.supportDomain === "product_support"
            ? "Thanks. Which product area is this for: a Fivetran issue, HVR, High-Volume Agent, Hybrid Deployment, or Activations?"
            : appState.supportDomain === "billing_support"
              ? "Thanks. Which billing topic best matches this: MAR dispute, SLA dispute, payment issue, transformation pricing, invoice query, or other?"
              : "Thanks. Which account support topic best matches this: manage users and permissions, notifications, account setup, dashboard banner error, or other?"
        );
        if (appState.supportDomain === "product_support") {
          setState("route_product_area");
        } else {
          setState("collect_required_intake");
        }
        renderRuntime();
        return;
      }
      addMessage(
        "agent",
        "To get us moving in the right direction, which type of support do you need: product, account, or billing?"
      );
      return;
    }

    case "route_support_domain": {
      const domain = supportDomainFromText(text);
      if (!domain) {
        addMessage("agent", "I can help with product support, account support, or billing. Which one fits this issue best?");
        return;
      }
      appState.supportDomain = domain;
      if (domain === "product_support") {
        setState("route_product_area");
        addMessage(
          "agent",
          "Thanks. Which product area is this for: a Fivetran issue, HVR, High-Volume Agent, Hybrid Deployment, or Activations?"
        );
      } else {
        setState("collect_required_intake");
        if (domain === "billing_support") {
          addMessage(
            "agent",
            "Thanks. Which billing topic best matches this: MAR dispute, SLA dispute, payment issue, transformation pricing, invoice query, or other?"
          );
        } else {
          addMessage(
            "agent",
            "Thanks. Which account support topic best matches this: manage users and permissions, notifications, account setup, dashboard banner error, or other?"
          );
        }
      }
      renderRuntime();
      return;
    }

    case "route_product_area": {
      const area = productAreaFromText(text);
      appState.issueType = issueTypeFromText(text) || appState.issueType;
      if (!area) {
        addMessage(
          "agent",
          "I can route this as a Fivetran issue, HVR, High-Volume Agent, Hybrid Deployment, or Activations issue. Which one fits best?"
        );
        return;
      }
      appState.productArea = area;
      setState("collect_required_intake");

      if (area === "hvr_issue") {
        addMessage(
          "agent",
          "Before I troubleshoot, please share the issue description, environment, source, hub, patch level, source DBMS, hub DBMS, source OS, target OS, and hub OS."
        );
      } else if (area === "activations_issue") {
        addMessage(
          "agent",
          "Before I troubleshoot, please share a short description of the issue, a link to the affected Activation Sync if you have it, any relevant screenshots, and whether you give Fivetran permission to trigger the Activation Sync for troubleshooting if needed."
        );
      } else {
        addMessage(
          "agent",
          "Before I troubleshoot, I need four details so I can look at the right context: Destination Type, Destination Name, Connector Type, and Connection Name."
        );
      }
      renderRuntime();
      return;
    }

    case "collect_required_intake": {
      if (appState.supportDomain === "billing_support") {
        if (!appState.collected.issue_type) {
          appState.collected.issue_type = issueTypeFromText(text) || text;
          appState.issueType = appState.collected.issue_type;
          addMessage(
            "agent",
            "Understood. Please share the account involved, the invoice or billing period in question, and what you'd like clarified or corrected."
          );
          renderRuntime();
          return;
        }
        appState.collected.billing_context = text;
        setState("confirm_understanding");
        addMessage(
          "agent",
          `Here’s my understanding so far: this is a billing request about ${appState.collected.issue_type}, and the issue context is "${text}". I can start with a quick clarification path, or I can prepare a human handoff now.`
        );
        renderRuntime();
        return;
      }

      if (appState.supportDomain === "account_support") {
        if (!appState.collected.issue_type) {
          appState.collected.issue_type = issueTypeFromText(text) || text;
          appState.issueType = appState.collected.issue_type;
          addMessage(
            "agent",
            "Thanks. Please share the affected user or account area, what you're trying to do, and any error or unexpected behavior you're seeing."
          );
          renderRuntime();
          return;
        }
        appState.collected.account_context = text;
        setState("confirm_understanding");
        addMessage(
          "agent",
          `Here’s my understanding so far: this is an account-support request about ${appState.collected.issue_type}, and the current context is "${text}". I’m going to start with the most likely next step unless you’d prefer a human ticket now.`
        );
        renderRuntime();
        return;
      }

      if (appState.productArea === "hvr_issue") {
        const required = supportPaths.hvr_issue;
        if (parseCommaFields(text, required)) {
          setState("confirm_understanding");
          addMessage(
            "agent",
            "Here’s my understanding so far: this is an HVR issue and I now have the core environment details. I’m ready to begin with the most likely next troubleshooting step."
          );
        } else {
          addMessage(
            "agent",
            "For this prototype, please provide those HVR details as a comma-separated list in the same order so I can complete intake."
          );
        }
        renderRuntime();
        return;
      }

      if (appState.productArea === "activations_issue") {
        const required = supportPaths.activations_issue;
        if (parseCommaFields(text, required)) {
          setState("confirm_understanding");
          addMessage(
            "agent",
            "Here’s my understanding so far: this is an Activations issue and I have the issue description, sync reference, evidence, and troubleshooting permission status. I’m ready to start with the most likely next step."
          );
        } else {
          addMessage(
            "agent",
            "For this prototype, please provide those Activations details as a comma-separated list: issue description, sync link, screenshots/evidence, permission to trigger sync."
          );
        }
        renderRuntime();
        return;
      }

      const required = supportPaths.standard_product;
      if (parseCommaFields(text, required)) {
        setState("confirm_understanding");
        addMessage(
          "agent",
          `Here’s my understanding so far: this is a ${prettyLabel(appState.productArea) || "product"} affecting the ${appState.collected.connection_name} connection syncing into ${appState.collected.destination_name}. Could you share the exact error or warning you're seeing, and when you first noticed it?`
        );
      } else if (appState.collected.connection_name && !appState.collected.error_text) {
        appState.collected.error_text = text;
        appState.evidence.push(text);
        setState("confirm_understanding");
        addMessage(
          "agent",
          `Here’s my understanding so far: this is a ${appState.issueType || "product"} affecting ${appState.collected.connection_name}, and the reported error is "${text}". I’m going to start with the most likely next step.`
        );
      } else {
        addMessage(
          "agent",
          "Please share those four standard product details as a comma-separated list: Destination Type, Destination Name, Connector Type, Connection Name."
        );
      }
      renderRuntime();
      return;
    }

    case "confirm_understanding": {
      setState("troubleshoot");
      appState.troubleshootingSteps.push("Confirmed issue summary with the customer before troubleshooting.");
      if (appState.supportDomain === "billing_support") {
        appState.troubleshootingSteps.push("Offered billing clarification path before escalation.");
        addMessage(
          "agent",
          "Thanks. The fastest next step is usually to review the billing period and invoice details against the requested clarification. If you'd rather skip that and work with a human engineer, I can prepare the handoff now."
        );
      } else if (appState.productArea === "activations_issue") {
        appState.troubleshootingSteps.push("Requested Activation-specific context and permission before troubleshooting.");
        addMessage(
          "agent",
          "Please start by confirming whether the affected Activation Sync shows a specific error state in its latest run details. If it does, share that error text and I’ll narrow the next step from there."
        );
      } else {
        appState.troubleshootingSteps.push("Recommended checking the most likely authorization or configuration path first.");
        addMessage(
          "agent",
          "A good first step is to check whether the connector or destination credentials still show as valid in setup. If you see a reconnect prompt, reconnect once and let me know whether the status changes or the next sync starts successfully."
        );
      }
      renderRuntime();
      return;
    }

    case "troubleshoot": {
      if (/\b(fixed|resolved|working now|that worked)\b/i.test(text)) {
        setState("resolved");
        addMessage(
          "agent",
          "Great. It sounds like you're unblocked. I’ll close this prototype flow as resolved in chat. If anything else comes up, you can start another conversation or open a support ticket."
        );
        renderRuntime();
        return;
      }
      appState.evidence.push(text);
      appState.troubleshootingSteps.push(`Customer reported outcome: ${text}`);
      appState.missingInformation = [];
      addMessage(
        "agent",
        "Thanks. Based on that result, I have enough context to continue, but this is a good example of where the AI should avoid over-committing. If you'd like, I can keep asking for one more detail, or I can prepare the handoff for a human CSE now."
      );
      renderRuntime();
      return;
    }

    case "safe_refusal": {
      addMessage(
        "agent",
        "If you want to continue, please describe the issue in your own environment or choose the support-ticket path and I’ll prepare the handoff."
      );
      renderRuntime();
      return;
    }

    default:
      addMessage("agent", "This prototype has reached a terminal state. Use a scenario button or refresh to start over.");
  }
}

function playScenario(script) {
  let delay = 180;
  script.forEach((line) => {
    window.setTimeout(() => handleMessage(line), delay);
    delay += 240;
  });
}

function resetConversation(script = []) {
  appState.state = "conversation_start";
  appState.supportDomain = null;
  appState.productArea = null;
  appState.issueType = null;
  appState.customerGoal = null;
  appState.collected = {};
  appState.troubleshootingSteps = [];
  appState.evidence = [];
  appState.missingInformation = [];
  appState.escalationReason = null;
  appState.ticketCreated = false;
  appState.messages = [];

  renderRuntime();
  startPrototype();

  if (script.length) {
    playScenario(script);
  }
}

dom.sendMessage.addEventListener("click", () => {
  const value = dom.chatInput.value;
  dom.chatInput.value = "";
  handleMessage(value);
});

dom.chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    dom.sendMessage.click();
  }
});

dom.humanHandoff.addEventListener("click", () => {
  triggerHumanHandoff("customer_requested_human");
});

dom.tabHome.addEventListener("click", () => {
  setActiveView("home");
});

dom.tabTickets.addEventListener("click", () => {
  setActiveView("tickets");
});

dom.ticketsNewRequest.addEventListener("click", () => {
  setActiveView("home");
});

dom.ticketReplyButton.addEventListener("click", () => {
  openTicketThread();
});

dom.ticketThreadSend.addEventListener("click", () => {
  sendTicketReply();
});

dom.ticketThreadInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendTicketReply();
  }
});

dom.ticketsList.querySelectorAll(".ticket-card").forEach((card) => {
  card.addEventListener("click", () => {
    renderTicketDetail(card.dataset.ticketId);
  });
});

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    applyTicketFilter(chip.dataset.filter);
  });
});

document.querySelectorAll(".scenario").forEach((button) => {
  button.addEventListener("click", () => {
    resetConversation(scenarioScripts[button.dataset.scenario] || []);
  });
});

resetConversation();
setActiveView("home");
renderTicketDetail("FTSUP-18427");
applyTicketFilter("all");

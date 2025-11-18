document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const dateChip = document.getElementById("date-chip");
  const alertMessage = document.getElementById("alert-message");
  const menuLinks = document.querySelectorAll(".menu-link");
  const contentSections = document.querySelectorAll(".content-section");

  // Dashboard
  const cpuValue = document.getElementById("cpu-value"),
    memValue = document.getElementById("mem-value"),
    diskValue = document.getElementById("disk-value");
  const cpuCircle = document.getElementById("cpu-circle"),
    memCircle = document.getElementById("mem-circle"),
    diskCircle = document.getElementById("disk-circle");
  const cpuCard = document.getElementById("cpu-card"),
    memCard = document.getElementById("mem-card"),
    diskCard = document.getElementById("disk-card");
  const cpuProcesses = document.getElementById("cpu-processes"),
    memProcesses = document.getElementById("mem-processes"),
    diskProcesses = document.getElementById("disk-processes");
  const cpuProcessBody = document.getElementById("cpu-process-body"),
    memProcessBody = document.getElementById("mem-process-body"),
    diskProcessBody = document.getElementById("disk-process-body");

  // Network
  const bytesSentEl = document.getElementById("bytes-sent"),
    bytesRecvEl = document.getElementById("bytes-recv");
  const packetsSentEl = document.getElementById("packets-sent"),
    packetsRecvEl = document.getElementById("packets-recv");
  const connectionsBody = document.getElementById("connections-body");

  // System & Users
  const temperaturesContainer = document.getElementById(
    "temperatures-container"
  );
  const usersBody = document.getElementById("users-body");

  //SVG Circle Calculations
  const radius = cpuCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  [cpuCircle, memCircle, diskCircle].forEach((c) => {
    c.style.strokeDasharray = `${circumference} ${circumference}`;
    c.style.strokeDashoffset = circumference;
  });

  //Helper Functions
  const bytesToReadable = (b) => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 ** 2) return `${(b / 1024).toFixed(2)} KB`;
    if (b < 1024 ** 3) return `${(b / 1024 ** 2).toFixed(2)} MB`;
    return `${(b / 1024 ** 3).toFixed(2)} GB`;
  };

  const setProgress = (el, percent) => {
    el.style.strokeDashoffset = circumference - (percent / 100) * circumference;
  };

  //Navigation
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1) + "-section";
      contentSections.forEach((section) => section.classList.add("hidden"));
      document.getElementById(targetId).classList.remove("hidden");
      menuLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  //Theme Management
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.checked = theme === "dark";
  };
  themeToggle.addEventListener("change", (e) =>
    applyTheme(e.target.checked ? "dark" : "light")
  );
  applyTheme(localStorage.getItem("theme") || "light");

  //UI Update Functions
  const updateDate = () =>
    (dateChip.textContent = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }));

  const populateProcessTable = (tbody, processes, key, formatter) => {
    tbody.innerHTML = "";
    if (!processes || processes.length === 0) return;
    processes.forEach((p) => {
      const row = tbody.insertRow();
      row.innerHTML = `<td>${p.pid}</td><td>${p.name}</td><td>${formatter(
        p[key]
      )}</td>`;
    });
  };

  const updateTemperatures = (temps) => {
    temperaturesContainer.innerHTML = "";
    if (
      !temps ||
      Object.keys(temps).length === 0 ||
      temps.status === "not supported"
    ) {
      temperaturesContainer.innerHTML =
        "<p>Temperature sensors not supported or found on this system.</p>";
      return;
    }
    for (const [name, entries] of Object.entries(temps)) {
      entries.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "temp-item";
        item.innerHTML = `<span>${
          entry.label || name
        }</span><span class="temp-value">${entry.current.toFixed(1)}°C</span>`;
        temperaturesContainer.appendChild(item);
      });
    }
  };

  const updateUsers = (users) => {
    usersBody.innerHTML = "";
    if (!users || users.length === 0) {
      const row = usersBody.insertRow();
      row.insertCell().textContent = "No active users found.";
      row.cells[0].colSpan = 4;
      return;
    }
    users.forEach((user) => {
      const row = usersBody.insertRow();
      row.innerHTML = `<td>${user.name}</td><td>${
        user.terminal || "N/A"
      }</td><td>${user.host || "localhost"}</td><td>${new Date(
        user.started
      ).toLocaleString()}</td>`;
    });
  };

  const updateConnections = (connections) => {
    connectionsBody.innerHTML = "";
    if (!connections || connections.length === 0) {
      const row = connectionsBody.insertRow();
      row.insertCell().textContent = "No active connections found.";
      row.cells[0].colSpan = 4;
      return;
    }
    connections.forEach((conn) => {
      const row = connectionsBody.insertRow();
      row.innerHTML = `<td>${conn.process_name || "N/A"}</td><td>${
        conn.local_addr
      }</td><td>${conn.remote_addr}</td><td>${conn.status}</td>`;
    });
  };

  const updateUI = (data) => {
    // Dashboard Gauges
    cpuValue.textContent = `${data.cpu_percent.toFixed(1)}%`;
    memValue.textContent = `${data.memory_percent.toFixed(1)}%`;
    diskValue.textContent = `${data.disk_percent.toFixed(1)}%`;
    setProgress(cpuCircle, data.cpu_percent);
    setProgress(memCircle, data.memory_percent);
    setProgress(diskCircle, data.disk_percent);

    // Process Lists
    populateProcessTable(
      cpuProcessBody,
      data.top_cpu_processes,
      "cpu_percent",
      (val) => `${val.toFixed(2)}%`
    );
    populateProcessTable(
      memProcessBody,
      data.top_mem_processes,
      "memory_percent",
      (val) => `${val.toFixed(2)}%`
    );
    populateProcessTable(
      diskProcessBody,
      data.top_disk_processes,
      "io_total",
      bytesToReadable
    );

    // Network Stats
    const net = data.network_stats;
    bytesSentEl.textContent = bytesToReadable(net.bytes_sent);
    bytesRecvEl.textContent = bytesToReadable(net.bytes_recv);
    packetsSentEl.textContent = net.packets_sent.toLocaleString();
    packetsRecvEl.textContent = net.packets_recv.toLocaleString();

    // New sections
    updateTemperatures(data.temperatures);
    updateUsers(data.active_users);
    updateConnections(data.network_connections);

    // Alert
    const highUsage = data.cpu_percent > 80 || data.memory_percent > 80;
    alertMessage.classList.toggle("hidden", !highUsage);
    alertMessage.textContent = highUsage
      ? "High CPU or Memory usage detected!"
      : "";
  };

  //Data Fetching
  async function fetchData() {
    try {
      const response = await fetch("/api/v1/stats");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      updateUI(data);
    } catch (error) {
      console.error("Failed to fetch system stats:", error);
      alertMessage.textContent =
        "Error: Could not connect to the monitoring backend.";
      alertMessage.classList.remove("hidden");
    }
  }

  //Event Listeners for Process Toggling
  const setupCardToggle = (card, processList) => {
    card.addEventListener("click", () => {
      const isHidden = processList.classList.contains("hidden");
      [cpuProcesses, memProcesses, diskProcesses].forEach((l) =>
        l.classList.add("hidden")
      );
      [cpuCard, memCard, diskCard].forEach((c) => c.classList.remove("active"));
      if (isHidden) {
        processList.classList.remove("hidden");
        card.classList.add("active");
      }
    });
  };
  setupCardToggle(cpuCard, cpuProcesses);
  setupCardToggle(memCard, memProcesses);
  setupCardToggle(diskCard, diskProcesses);

  //Initial Load and Intervals
  updateDate();
  fetchData();
  setInterval(fetchData, 3000);
});
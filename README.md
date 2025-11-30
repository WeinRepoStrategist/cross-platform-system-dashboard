# 💻 Cross-Platform Cloud Server Monitoring System

### ✨ Project Overview

The **Cross-Platform Cloud Server Monitoring System** is a real-time, web-based application developed for comprehensive performance oversight of remote cloud servers. It successfully establishes an intuitive, accessible, and robust solution for proactive diagnostics and remote cloud server management.

This project addresses the core problem of lacking a simple, cross-platform, web-based dashboard that can be deployed directly onto a cloud server to provide remote, graphical performance visualization.

### 🚀 Key Features

* **Real-Time Graphical Visualization:** Displays CPU Utilization, Memory Usage, and Disk I/O using dynamic **SVG Progress Gauges**.
* **Detailed Process Monitoring:** Lists the **Top 5 consuming processes** based on CPU, Memory, or Disk I/O, which is critical for identifying runaway processes.
* **Remote Accessibility:** Deployed on an **AWS EC2 Ubuntu instance** and accessible remotely via a browser using the EC2 public IP.
* **Lightweight Design:** Architected around a single, lightweight **RESTful API endpoint** (`/api/v1/stats`). Client-side JavaScript handles all rendering, **offloading rendering tasks** from the remote server.
* **Data Acquisition:** Leverages the **psutil** library to reliably extract metrics from the Linux kernel.
* **Asynchronous Updates:** The frontend uses **AJAX calls** to fetch data every **three seconds** to prevent UI freezing and ensure responsiveness.

### 🛠️ Technology Stack (Software Specification)

The application adheres to the **Model-View-Controller (MVC)** pattern.

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend Framework** | **Python (Flask)** | Manages the controller logic and serves the RESTful API. |
| **Data Acquisition** | **psutil** | Queries the underlying **Linux Kernel** (Ubuntu) for system statistics. |
| **Frontend** | **HTML5, CSS3, JavaScript** | Serves as the view, handling dynamic rendering and AJAX calls. |
| **Cloud Environment** | **AWS EC2 (Ubuntu Server)** | Deployment environment (t2.micro or similar). |
| **Data Transfer** | **JSON / AJAX** | Used for structured, non-blocking asynchronous data transfer. |

### ⚙️ System Architecture

The architecture explicitly includes the Cloud Server layer:

1.  The **Client Browser** sends an **AJAX Request** over the Internet to the EC2 Public IP.
2.  The request is handled by the **Flask Server** on the Ubuntu OS.
3.  Flask calls **psutil** to query the Linux kernel, and returns the data as **JSON**.

### ⬇️ Installation and Usage

The system was successfully deployed on an **AWS EC2 Ubuntu 20.04 LTS instance**.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/WeinRepoStrategist/cross-platform-system-dashboard
    ```
2.  **Ensure Prerequisites are Installed (on EC2):**
    ```bash
    pip install flask psutil 
    ```
3.  **Ensure Networking is Configured:**
    * The AWS **Security Group** must be correctly configured to allow inbound traffic on the Flask application's port (e.g., **TCP 5000**).
4.  **Run the Flask application:**
    ```bash
    python app.py
    ```
5.  **Access the Dashboard:** Open your web browser and navigate to the following URL:
    ```
    http://<EC2-Public-IP>:5000/
    ```

### ⏭️ Future Work (Recommendations)

To extend the utility and robustness of the system, the following future work is recommended:

* **Historical Data Logging:** Implement a lightweight database (e.g., SQLite) to log metrics over time for trend analysis and historical charts.
* **Advanced User Controls:** Introduce authenticated endpoints to allow authorized users to perform basic process management, such as sending signals to **kill or suspend a specific process (PID)**.
* **Configurable Alerting:** Enhance the alerting mechanism to allow users to set custom thresholds and integrate external notification services (e.g., email).
* **Automated Deployment:** Develop a script or use **Docker** to automate the deployment process onto new EC2 instances.

---
**GitHub Repository Link:** https://github.com/WeinRepoStrategist/cross-platform-system-dashboard 
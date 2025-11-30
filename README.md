# 💻 Cross-Platform Cloud Server Monitoring System

### ✨ Overview

(start_span)The Cross-Platform Cloud Server Monitoring System is a **real-time, web-based application** developed for comprehensive performance oversight of remote cloud servers[span_1](end_span).
(start_span)It is deployed on an **AWS EC2 instance** running **Ubuntu**(end_span).
(start_span)This project addresses the problem of needing a simple, consolidated, web-based dashboard that provides real-time, cross-platform performance visualization and is accessible from any device on the network(end_span)(end_span).

### 🚀 Key Features

* **(start_span)(start_span)Real-Time Graphical Visualization:** Displays CPU Utilization, Memory Usage, and Disk I/O using dynamic **SVG Progress Gauges**(end_span)(end_span).
* **(start_span)Detailed Process Monitoring:** The system explicitly lists the **Top 5 consuming processes** by CPU, Memory, and Disk I/O(end_span).(start_span)This is critical for quickly identifying runaway processes(end_span).
* **(start_span)Remote Accessibility:** Deployed directly onto an **AWS EC2 Ubuntu instance**(end_span)(start_span)and accessible remotely via a browser using the EC2 public IP(end_span).
* **(start_span)(start_span)(start_span)Asynchronous Updates:** The frontend uses **AJAX calls** to asynchronously fetch data every **three seconds**[span_11](end_span)(end_span)(end_span).
* **(start_span)Lightweight Design:** Architected around a single, lightweight **RESTful API endpoint** (`/api/v1/stats`)(end_span). (start_span)The client-side JavaScript handles all rendering (SVG calculations), **offloading rendering tasks** from the remote server(end_span).
* **(start_span)Cross-Platform Portability:** Confirmed the power of Python and **psutil** to deliver performance data reliably from a Linux server(end_span).

### 🛠️ Technology Stack (Software Specification)

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | **Python (Flask)** | (start_span)[span_18](start_span)(start_span)The micro-framework that manages the controller logic and provides the API endpoint(end_span)(end_span)(end_span). |
| **Data Acquisition** | **psutil** | (start_span)(start_span)(start_span)Python library that queries the Linux kernel for system statistics(end_span)(end_span)(end_span). |
| **Frontend** | **HTML5, CSS3, JavaScript** | (start_span)(start_span)Serves as the view, handling dynamic rendering and AJAX calls[span_23](end_span)(end_span). |
| **Cloud Environment** | **AWS EC2 (Ubuntu Server)** | (start_span)(start_span)The deployment environment(end_span)(end_span). |
| **Communication** | **AJAX / JSON** | (start_span)(start_span)Used for non-blocking, asynchronous data transfer(end_span)(end_span). |

### ⚙️ System Architecture

(start_span)The application adheres to the **Model-View-Controller (MVC)** architectural pattern(end_span).

* (start_span)The client browser sends an **AJAX Request** over the Internet to the EC2 Public IP/DNS[span_30](end_span).
* (start_span)The request is handled by the **Flask Server** on the Ubuntu OS(end_span).
* (start_span)Flask calls **psutil** to query the Linux kernel, and returns the data as **JSON**(end_span).



### ⬇️ Installation and Usage

(start_span)The project successfully deployed on the **AWS EC2 Ubuntu 20.04 LTS instance**(end_span).

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/WeinRepoStrategist/cross-platform-system-dashboard](https://github.com/WeinRepoStrategist/cross-platform-system-dashboard)
    ```
2.  **Ensure Networking is Configured:**
    * (start_span)(start_span)The EC2 **Security Group** must be correctly configured to allow inbound traffic on the Flask application's port (e.g., **TCP 5000**)(end_span)(end_span).
3.  **Run the Flask application (on the EC2 instance):**
    ```bash
    # Example command to run the Python server
    python app.py
    ```
4.  **Access the Dashboard:** Open your web browser and navigate to the following URL:
    ```
    http://<EC2-Public-IP>:5000/
    ```

### ⏭️ Future Work (Recommendations)

(start_span)To extend the utility and robustness of the system, the following future work is recommended(end_span):

* **(start_span)Historical Data Logging:** Implement a lightweight database (e.g., SQLite) to log metrics over time for historical charts and trend analysis(end_span).
* **(start_span)Advanced User Controls:** Introduce authenticated endpoints to allow authorized users to perform basic process management, such as sending signals to **kill or suspend a specific process (PID)** directly from the dashboard(end_span).
* **(start_span)Configurable Alerting:** Enhance the alerting mechanism to allow users to set custom thresholds and integrate external notification services (e.g., email)(end_span).
* **(start_span)Automated Deployment:** Develop a script or use **Docker** to automate the deployment process onto new EC2 instances(end_span).

---
**GitHub Repository Link:** https://github.com/WeinRepoStrategist/cross-platform-system-dashboard 
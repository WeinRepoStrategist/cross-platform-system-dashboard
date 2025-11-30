# 💻 Cross-Platform Cloud Server Monitoring System

## A Real-Time Performance Visualization Dashboard for Cloud Servers

[span_0](start_span)A Major Project Report submitted in partial fulfillment of the requirements for the degree of Bachelor of Computer Applications (Specialization in Cloud Computing)[span_0](end_span).

---

### ✨ Overview

[span_1](start_span)The Cross-Platform Cloud Server Monitoring System is a **real-time, web-based application** developed for comprehensive performance oversight of remote cloud servers[span_1](end_span). [span_2](start_span)It is deployed on an **AWS EC2 instance** running **Ubuntu**[span_2](end_span).

[span_3](start_span)[span_4](start_span)This project addresses the problem of needing a simple, consolidated, web-based dashboard that provides real-time, cross-platform performance visualization and is accessible from any device on the network[span_3](end_span)[span_4](end_span).

### 🚀 Key Features

* **[span_5](start_span)[span_6](start_span)Real-Time Graphical Visualization:** Displays CPU Utilization, Memory Usage, and Disk I/O using dynamic **SVG Progress Gauges**[span_5](end_span)[span_6](end_span).
* **[span_7](start_span)Detailed Process Monitoring:** The system explicitly lists the **Top 5 consuming processes** by CPU, Memory, and Disk I/O[span_7](end_span). [span_8](start_span)This is critical for quickly identifying runaway processes[span_8](end_span).
* **[span_9](start_span)Remote Accessibility:** Deployed directly onto an **AWS EC2 Ubuntu instance**[span_9](end_span) [span_10](start_span)and accessible remotely via a browser using the EC2 public IP[span_10](end_span).
* **[span_11](start_span)[span_12](start_span)[span_13](start_span)Asynchronous Updates:** The frontend uses **AJAX calls** to asynchronously fetch data every **three seconds**[span_11](end_span)[span_12](end_span)[span_13](end_span).
* **[span_14](start_span)Lightweight Design:** Architected around a single, lightweight **RESTful API endpoint** (`/api/v1/stats`)[span_14](end_span). [span_15](start_span)The client-side JavaScript handles all rendering (SVG calculations), **offloading rendering tasks** from the remote server[span_15](end_span).
* **[span_16](start_span)Cross-Platform Portability:** Confirmed the power of Python and **psutil** to deliver performance data reliably from a Linux server[span_16](end_span).

### 🛠️ Technology Stack (Software Specification)

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | **Python (Flask)** | [span_17](start_span)[span_18](start_span)[span_19](start_span)The micro-framework that manages the controller logic and provides the API endpoint[span_17](end_span)[span_18](end_span)[span_19](end_span). |
| **Data Acquisition** | **psutil** | [span_20](start_span)[span_21](start_span)[span_22](start_span)Python library that queries the Linux kernel for system statistics[span_20](end_span)[span_21](end_span)[span_22](end_span). |
| **Frontend** | **HTML5, CSS3, JavaScript** | [span_23](start_span)[span_24](start_span)Serves as the view, handling dynamic rendering and AJAX calls[span_23](end_span)[span_24](end_span). |
| **Cloud Environment** | **AWS EC2 (Ubuntu Server)** | [span_25](start_span)[span_26](start_span)The deployment environment[span_25](end_span)[span_26](end_span). |
| **Communication** | **AJAX / JSON** | [span_27](start_span)[span_28](start_span)Used for non-blocking, asynchronous data transfer[span_27](end_span)[span_28](end_span). |

### ⚙️ System Architecture

[span_29](start_span)The application adheres to the **Model-View-Controller (MVC)** architectural pattern[span_29](end_span).

* [span_30](start_span)The client browser sends an **AJAX Request** over the Internet to the EC2 Public IP/DNS[span_30](end_span).
* [span_31](start_span)The request is handled by the **Flask Server** on the Ubuntu OS[span_31](end_span).
* [span_32](start_span)Flask calls **psutil** to query the Linux kernel, and returns the data as **JSON**[span_32](end_span).



### ⬇️ Installation and Usage

[span_33](start_span)The project successfully deployed on the **AWS EC2 Ubuntu 20.04 LTS instance**[span_33](end_span).

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/WeinRepoStrategist/cross-platform-system-dashboard](https://github.com/WeinRepoStrategist/cross-platform-system-dashboard)
    ```
2.  **Ensure Networking is Configured:**
    * [span_34](start_span)[span_35](start_span)The EC2 **Security Group** must be correctly configured to allow inbound traffic on the Flask application's port (e.g., **TCP 5000**)[span_34](end_span)[span_35](end_span).
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

[span_36](start_span)To extend the utility and robustness of the system, the following future work is recommended[span_36](end_span):

* **[span_37](start_span)Historical Data Logging:** Implement a lightweight database (e.g., SQLite) to log metrics over time for historical charts and trend analysis[span_37](end_span).
* **[span_38](start_span)Advanced User Controls:** Introduce authenticated endpoints to allow authorized users to perform basic process management, such as sending signals to **kill or suspend a specific process (PID)** directly from the dashboard[span_38](end_span).
* **[span_39](start_span)Configurable Alerting:** Enhance the alerting mechanism to allow users to set custom thresholds and integrate external notification services (e.g., email)[span_39](end_span).
* **[span_40](start_span)Automated Deployment:** Develop a script or use **Docker** to automate the deployment process onto new EC2 instances[span_40](end_span).

---
**GitHub Repository Link:** https://github.com/WeinRepoStrategist/cross-platform-system-dashboard 
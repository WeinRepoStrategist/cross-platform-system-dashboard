CROSS-PLATFORM CLOUD SERVER MONITORING SYSTEM
Overview
[cite_start]This application is a Cross-Platform Cloud Server Monitoring System [cite_start]designed for real-time performance visualization and oversight of remote cloud servers. [cite_start]It is a web-based application [cite_start]that runs directly on a cloud instance, providing a simple, accessible dashboard for system administrators.  
[cite_start]It leverages the Python Flask micro-framework and the psutil library to acquire real-time system metrics from the Ubuntu OS Kernel. [cite_start]The frontend uses HTML5, CSS3, and JavaScript with AJAX calls for dynamic, graphical visualization using SVG progress gauges.  
Features
[cite_start]The system provides a unified, visually intuitive dashboard and offers the following monitoring capabilities:  
[cite_start]Real-time Metrics: Displays CPU utilization, Memory usage, and Disk I/O using dynamic SVG Progress Gauges.  
[cite_start]Detailed Process Isolation: Explicitly lists the Top 5 consuming processes by CPU, Memory, and Disk I/O.  
[cite_start]Network Statistics: Shows total bytes/packets sent and received, along with a list of active TCP/IP connections.  
[cite_start]System and User Information: Displays current hardware temperature readings and a table of currently logged-in users.  
[cite_start]Cross-Platform Accessibility: Accessible via a standard web browser on any device.  
[cite_start]Theming: Allows users to Switch Dark/Light Theme and remembers the selection using Local Storage.  
[cite_start]Alerting: Displays a prominent red alert message when usage exceeds 80% for CPU or Memory.  
Implementation Details
[cite_start]The system follows the Model-View-Controller (MVC) architectural pattern:  
Controller (Flask): Manages API endpoints.
[cite_start]Model (psutil): Handles data acquisition from the Linux kernel.  
[cite_start]View (HTML/JS/CSS): Serves the dashboard for visualization.  
Installation
[cite_start]The application is deployed on an AWS EC2 Instance running Ubuntu Server.

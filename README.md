
CROSS-PLATFORM CLOUD SERVER MONITORING SYSTEM
=======================================================

Overview
=========

This application is a Cross-Platform Cloud Server Monitoring System designed for real-time performance visualization and oversight of remote cloud servers.

It is a web-based application that runs directly on a cloud instance, providing a simple, accessible dashboard for system administrators.

It leverages the Python Flask micro-framework and the psutil library to acquire real-time system metrics from the Ubuntu OS Kernel.

The frontend uses HTML5, CSS3, and JavaScript with AJAX calls for dynamic, graphical visualization using SVG progress gauges.

Features
========

*     The system provides a unified, visually intuitive dashboard and offers the following monitoring capabilities:  
*     **Real-time Metrics:** Displays CPU utilization, Memory usage, and Disk I/O using dynamic SVG Progress Gauges.  
*     **Detailed Process Isolation:** Explicitly lists the Top 5 consuming processes by CPU, Memory, and Disk I/O.  
*     **Network Statistics:** Shows total bytes/packets sent and received, along with a list of active TCP/IP connections.  
*     **System and User Information:** Displays current hardware temperature readings and a table of currently logged-in users.  
*     **Cross-Platform Accessibility:** Accessible via a standard web browser on any device.  
*     **Theming:** Allows users to Switch Dark/Light Theme and remembers the selection using Local Storage.  
*     **Alerting:** Displays a prominent red alert message when usage exceeds 80% for CPU or Memory.  

Implementation Details
=====================

*     The system follows the Model-View-Controller (MVC) architectural pattern:  
*     **Controller (Flask):** Manages API endpoints.
Model (psutil): Handles data acquisition from the Linux kernel.  
*     **View (HTML/JS/CSS):** Serves the dashboard for visualization.

Installation
===========

The application is deployed on an AWS EC2 Instance running Ubuntu Server.
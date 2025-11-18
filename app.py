import psutil
import datetime
from flask import Flask, render_template, jsonify

app = Flask(__name__)

def bytes_to_readable(b):
    """Converts bytes to a readable format."""
    if b < 1024: return f"{b} B"
    if b < 1024**2: return f"{(b/1024):.2f} KB"
    if b < 1024**3: return f"{(b/1024**2):.2f} MB"
    return f"{(b/1024**3):.2f} GB"

def get_top_processes(sort_by='cpu_percent'):
    """Gets top 5 processes sorted by CPU or Memory."""
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'io_counters']):
        try:
            p_info = proc.info
            p_info['io_total'] = (p_info.get('io_counters').read_bytes + p_info.get('io_counters').write_bytes) if p_info.get('io_counters') else 0
            processes.append(p_info)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess, AttributeError):
            pass
    return sorted(processes, key=lambda p: p.get(sort_by, 0), reverse=True)[:5]

def get_network_stats():
    """Gets total network I/O."""
    net_io = psutil.net_io_counters()
    return {
        'bytes_sent': net_io.bytes_sent, 'bytes_recv': net_io.bytes_recv,
        'packets_sent': net_io.packets_sent, 'packets_recv': net_io.packets_recv
    }

def get_system_temperatures():
    """Gets hardware temperature readings."""
    temps = {}
    try:
        if hasattr(psutil, "sensors_temperatures"):
            for name, entries in psutil.sensors_temperatures().items():
                temps[name] = [{"label": entry.label or name, "current": entry.current} for entry in entries]
        else:
            return {"status": "not supported"}
    except Exception:
        return {"error": "could not read temperatures"}
    return temps

def get_active_users():
    """Gets a list of currently logged-in users."""
    try:
        return [{"name": user.name, "terminal": user.terminal, "host": user.host,
                 "started": datetime.datetime.fromtimestamp(user.started).isoformat()}
                for user in psutil.users()]
    except Exception:
        return []

def get_network_connections():
    """Gets a list of active network connections."""
    connections = []
    try:
        for conn in psutil.net_connections(kind='inet')[:15]:
            conn_data = {"local_addr": f"{conn.laddr.ip}:{conn.laddr.port}", "status": conn.status}
            conn_data["remote_addr"] = f"{conn.raddr.ip}:{conn.raddr.port}" if conn.raddr else "N/A"
            if conn.pid:
                try: conn_data["process_name"] = psutil.Process(conn.pid).name()
                except (psutil.NoSuchProcess, psutil.AccessDenied): conn_data["process_name"] = "N/A"
            connections.append(conn_data)
    except Exception:
        return []
    return connections

@app.route("/")
def index():
    """Renders the main dashboard page."""
    return render_template("index.html")

@app.route("/api/v1/stats")
def api_stats():
    """Provides all system stats as a JSON object."""
    stats = {
        'cpu_percent': psutil.cpu_percent(interval=1),
        'memory_percent': psutil.virtual_memory().percent,
        'disk_percent': psutil.disk_usage('/').percent,
        'top_cpu_processes': get_top_processes(sort_by='cpu_percent'),
        'top_mem_processes': get_top_processes(sort_by='memory_percent'),
        'top_disk_processes': get_top_processes(sort_by='io_total'),
        'network_stats': get_network_stats(),
        'temperatures': get_system_temperatures(),
        'active_users': get_active_users(),
        'network_connections': get_network_connections(),
    }
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
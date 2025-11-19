import time
import math

# Duration for one cycle (e.g., 100 milliseconds)
CYCLE_DURATION_MS = 100

# Target utilization: 60% of ONE Core
TARGET_PERCENT = 0.60

# Calculate busy time and sleep time
BUSY_TIME = CYCLE_DURATION_MS * TARGET_PERCENT / 1000
SLEEP_TIME = CYCLE_DURATION_MS * (1 - TARGET_PERCENT) / 1000

print(f"Starting CPU load targeting ~{int(TARGET_PERCENT*100)}% of one core.")
print(f"Busy time per cycle: {BUSY_TIME:.4f}s | Sleep time per cycle: {SLEEP_TIME:.4f}s")

# Run the load indefinitely until manually stopped (Ctrl+C)
try:
    while True:
        # 1. Busy Phase (60ms of work)
        start_time = time.time()
        while time.time() - start_time < BUSY_TIME:
            # Complex calculation to keep the CPU busy
            _ = math.sqrt(math.pow(math.pi, 5) * math.log(time.time() * 100000))
        
        # 2. Sleep Phase (40ms of rest)
        time.sleep(SLEEP_TIME)

except KeyboardInterrupt:
    print("\nCPU load script stopped.")
except Exception as e:
    print(f"An error occurred: {e}")
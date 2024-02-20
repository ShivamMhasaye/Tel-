const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const pidusage = require('pidusage');
const os = require('os');
//const diskusage = require('diskusage');
const net = require('net');
const psListPromise = import('ps-list');
const cpu = require('windows-cpu');
const fs = require('fs');





// InfluxDB connection parameters
const token = '58E4UcSbYsQ1dvWhSyX9z0NMnmuuFBAqD4fJ2BJV7h0lKoO8mUYYGEoK9zQdaCI2h19ey322eV85ZCTPwSTOrQ==';
const org = 'cdacian';
const bucketName = 'PROCESS';

const client = new InfluxDB({
  url: 'http://localhost:8086',
  token: token,
});

const writeCpuUsage = async (socket) => {
    
  try {
    const stats = await pidusage(process.pid);
    const cpuUsagePercentage = stats.cpu / os.cpus().length;

    const cpuUsagePoint = new Point('cpu_usage')
      .tag('host', os.hostname())
      .floatField('value', cpuUsagePercentage);

    socket.write(JSON.stringify(cpuUsagePoint) + '\n');
    console.log('Writing CPU usage to server:', cpuUsagePoint);
  } catch (error) {
    console.error('Error fetching CPU usage:', error);
  }
};

const writeFreeMemory = async (socket) => {
  try {
    const freeMemory = os.freemem();
    console.log('Free Memory:', freeMemory);

    const freeMemoryPoint = new Point('free_memory')
      .tag('host', os.hostname())
      .floatField('value', freeMemory);

    socket.write(JSON.stringify(freeMemoryPoint) + '\n');
    console.log('Writing free memory to server:', freeMemoryPoint);
  } catch (error) {
    console.error('Error fetching free memory:', error);
  }
};let previousNetworkStats = {}; // Define and initialize previousNetworkStats as an empty object

const writeNetworkActivity = async (socket) => {
  try {
    const currentNetworkStats = {};
    const networkInterfaces = os.networkInterfaces();
    
    // Define currentTime outside the loop to ensure it's accessible within the entire function
    const currentTime = Date.now();

    // Iterate over each network interface
    Object.keys(networkInterfaces).forEach((interfaceName) => {
      networkInterfaces[interfaceName].forEach((iface) => {
        // Only consider non-internal interfaces and IPv4 addresses
        if (!iface.internal && iface.family === 'IPv4') {
          // Calculate total bytes received
          const totalBytesReceived = iface.bytesReceived || 0;

          // Calculate difference since last measurement
          let bytesReceivedSinceLastMeasurement = totalBytesReceived;
          if (previousNetworkStats[interfaceName]) {
            bytesReceivedSinceLastMeasurement -= previousNetworkStats[interfaceName].bytesReceived || 0;
          }

          // Update current network stats
          currentNetworkStats[interfaceName] = {
            bytesReceived: totalBytesReceived,
          };

          // Calculate bytes received per second (kbps)
          let bytesReceivedPerSecond = 0;
          const elapsedTimeInSeconds = (currentTime - (previousNetworkStats.timestamp || 0)) / 1000;
          if (elapsedTimeInSeconds > 0) {
            bytesReceivedPerSecond = bytesReceivedSinceLastMeasurement / elapsedTimeInSeconds;
          }

          // Convert bytes to kilobits per second (kbps)
          const kbps = (bytesReceivedPerSecond * 8) / 1024;

          // Check if kbps is a valid number
          if (!isNaN(kbps) && isFinite(kbps)) {
            // Send metrics to server
            const networkActivityPoint = new Point('network_activity')
              .tag('host', os.hostname())
              .tag('interface', interfaceName)
              .floatField('bytes_received_kbps', kbps);

            socket.write(JSON.stringify(networkActivityPoint) + '\n');
            console.log(`Writing network activity for interface ${interfaceName} to server:`, networkActivityPoint);
          } else {
            console.error(`Invalid kbps value (${kbps}) for interface ${interfaceName}`);
          }
        }
      });
    });

    // Update previousNetworkStats after processing all interfaces
    previousNetworkStats = currentNetworkStats;
  } catch (error) {
    console.error('Error in writeNetworkActivity:', error);
  }
};

// Call writeNetworkActivity function here or wherever appropriate


const writeProcesses = async (socket) => {
  try {
    // Wait for psListPromise to resolve and assign its value to psList
    const { default: psList } = await psListPromise;

    // Call psList function to get the list of processes
    const processes = await psList();
    
    // Count the number of processes
    const processCount = processes.length;

    // Create a Point object to represent process count
    const processPoint = new Point('processes')
      .tag('host', os.hostname())
      .intField('value', processCount); // Use intField for integer values

    // Write the process count to the server
    socket.write(JSON.stringify(processPoint) + '\n');
    console.log('Writing process count to server:', processPoint);
  } catch (error) {
    // Handle any errors that occur during the psListPromise or psList call
    console.error('Error fetching process list:', error);
  }
};

const writeCpuLoad = async (socket) => {
  try {
    // Get CPU load average for the past 1 minute
    const cpuLoad = os.loadavg()[0]; // 1 minute load average

    // Create a JSON object with the CPU load
    const cpuLoadData = {
      tags: { host: os.hostname() },
      fields: { value: cpuLoad },
      name: 'cpu_load'
    };

    // Send CPU load data to the server
    socket.write(JSON.stringify(cpuLoadData) + '\n');
    console.log('Writing CPU load to server:', cpuLoadData);
  } catch (error) {
    console.error('Error fetching CPU load:', error);
  }
};
const si = require('systeminformation');

const getTemperatureFromSensor = async () => {
    try {
        const cpuTemperature = await si.cpuTemperature();
        // Check if the temperature is available
        if (cpuTemperature && cpuTemperature.main) {
            return cpuTemperature.main;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching CPU temperature:', error);
        return null;
    }
};

const writeCpuTemperature = async (socket) => {
    try {
        const temperature = await getTemperatureFromSensor();
        if (temperature !== null && !isNaN(temperature)) {
            const cpuTemperaturePoint = new Point('cpu_temperature')
                .tag('host', os.hostname())
                .floatField('value', parseFloat(temperature));

            socket.write(JSON.stringify(cpuTemperaturePoint) + '\n');
            console.log('Writing CPU temperature to server:', cpuTemperaturePoint);
        } else {
            console.error('Invalid CPU temperature value:', temperature);
        }
    } catch (error) {
        console.error('Error writing CPU temperature to server:', error);
    }
};
const getSystemUptime = () => {
  const uptimeSeconds = os.uptime(); // Get system uptime in seconds
  const uptimeMinutes = Math.floor(uptimeSeconds / 60); // Convert seconds to minutes
  const uptimeHours = Math.floor(uptimeMinutes / 60); // Convert minutes to hours
  const uptimeDays = Math.floor(uptimeHours / 24); // Convert hours to days

  // Calculate remaining hours, minutes, and seconds after converting to days
  const remainingHours = uptimeHours % 24;
  const remainingMinutes = uptimeMinutes % 60;
  const remainingSeconds = uptimeSeconds % 60;

  // Construct a string representation of system uptime
  const uptimeString = `${uptimeDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;

  return uptimeString;
};

function getMemoryUsage() {
  const totalMemory = os.totalmem() / (1024 ** 2); // Convert to MB
  const freeMemory = os.freemem() / (1024 ** 2); // Convert to MB
  const usedMemory = totalMemory - freeMemory;

  return `Memory Usage: Used ${usedMemory.toFixed(2)} MB / Free ${freeMemory.toFixed(2)} MB / Total ${totalMemory.toFixed(2)} MB`;
}

// Connect to the server
const SERVER_PORT = 3001;
const SERVER_HOST = '169.254.63.190'; // Replace with your server's IP address
const socket = new net.Socket();

socket.connect(SERVER_PORT, SERVER_HOST, () => {
  console.log('Connected to server');

  // getCDriveUsage()
  //       .then(cDriveUsage => {
  //           // Send disk usage data to the server
  //           socket.write(JSON.stringify({ name: 'c_drive_usage', tags: { host: os.hostname() }, fields: { usage: cDriveUsage } }) + '\n');
  //           console.log('Sent C drive usage to server:', cDriveUsage);
  //       })
      //  .catch(error => {
       //    console.error('Error fetching C drive usage:', error);
       // });
});
//const memoryUsage = getMemoryUsage();
  //socket.write(JSON.stringify({ type: 'memory_usage', data: memoryUsage }) + '\n');
  //console.log('Memory usage data sent to server:', memoryUsage);
 // const systemUptime = getSystemUptime();
  //socket.write(JSON.stringify({ name: 'system_uptime', tags: { host: os.hostname() }, fields: { uptime: systemUptime } }) + '\n');
  //console.log('Sent system uptime to server:', systemUptime);
//});

// Handle errors
socket.on('error', error => {
  console.error('Socket error:', error);
});
// Run the functions every minute (adjust the interval as needed)
setInterval(() => {
 writeCpuUsage(socket);
 writeFreeMemory(socket);
 // writeNetworkActivity(socket);
 // writeCpuTemperature(socket);
 //writeCpuLoad(socket);
 // writeProcesses(socket);
  //getSystemUptime(socket);
 //getCDriveUsage(socket);
 
}, 3 * 1000); // 20 seconds

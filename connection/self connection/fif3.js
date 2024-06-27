const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const pidusage = require('pidusage'); // Import pidusage module
const os = require('os');
// InfluxDB 2.0 connection parameters
const token = '58E4UcSbYsQ1dvWhSyX9z0NMnmuuFBAqD4fJ2BJV7h0lKoO8mUYYGEoK9zQdaCI2h19ey322eV85ZCTPwSTOrQ==';
const org = 'cdacian';
const bucketName = 'taskmanager';


const client = new InfluxDB({
  url: 'http://localhost:8086',
  token: token,
});

const writeCpuUsage = async () => {
  const writeApi = client.getWriteApi(org, bucketName);

  try {
    const stats = await pidusage(process.pid);
    const cpuUsagePercentage = stats.cpu / os.cpus().length;

    const cpuUsagePoint = new Point('cpu_usage')
      .tag('host', os.hostname())
      .floatField('value', cpuUsagePercentage);

    console.log('Writing CPU usage to InfluxDB:', cpuUsagePoint);
    writeApi.writePoint(cpuUsagePoint);
  } catch (error) {
    console.error('Error fetching CPU usage:', error);
  } finally {
    writeApi.close();
  }
};

const writeFreeMemory = async () => {
  const writeApi = client.getWriteApi(org, bucketName);

  try {
    const freeMemory = os.freemem();
    console.log('Free Memory:', freeMemory);

    const freeMemoryPoint = new Point('free_memory')
      .tag('host', os.hostname())
      .floatField('value', freeMemory);

    console.log('Writing free memory to InfluxDB:', freeMemoryPoint);
    writeApi.writePoint(freeMemoryPoint);
  } catch (error) {
    console.error('Error fetching free memory:', error);
  } finally {
    writeApi.close();
  }
};

// Run the functions every minute (adjust the interval as needed)
setInterval(() => {
  writeCpuUsage();
  writeFreeMemory();

}, 3* 1000); // 60 seconds * 1000 milliseconds

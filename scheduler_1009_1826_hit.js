// 代码生成时间: 2025-10-09 18:26:36
const NodeCron = require('node-cron');
const { scheduleJob } = require('node-cron');

// 定时任务调度器类
class Scheduler {
  constructor() {
    // 存储所有的定时任务
    this.jobs = [];
  }

  // 添加一个新的定时任务
  addJob(interval, task) {
    // 错误处理：确保任务和间隔有效
    if (!interval || typeof task !== 'function') {
      throw new Error('Invalid interval or task function.');
    }

    // 创建新的定时任务
    const job = scheduleJob(interval, () => {
      try {
        task();
      } catch (error) {
        console.error('Error executing task:', error);
      }
    });

    // 将任务添加到列表中
    this.jobs.push(job);
  }

  // 移除定时任务
  removeJob(jobId) {
    // 错误处理：确保任务ID有效
    if (typeof jobId !== 'number') {
      throw new Error('Invalid job ID.');
    }

    // 查找并移除任务
    const index = this.jobs.findIndex((job) => job.id === jobId);
    if (index !== -1) {
      this.jobs[index].stop();
      this.jobs.splice(index, 1);
    } else {
      console.error('Job not found.');
    }
  }
}

// 示例：创建调度器实例并添加任务
const scheduler = new Scheduler();

// 定义一个简单的任务
const myTask = () => {
  console.log('Task executed at:', new Date());
};

// 添加任务，每5秒执行一次
scheduler.addJob('*/5 * * * *', myTask);

// 在需要的时候可以通过scheduler.removeJob(jobId)移除任务
// scheduler.removeJob(job.id);

module.exports = Scheduler;
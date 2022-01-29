# Cron Jobs

### Useful Commands
    - ```crontab -l``` - view current cron jobs lined up 
    - ```crontab -e``` - edit cron jobs
        - Every hour (at minute 15):
            * ```15 * * * * /usr/local/bin/node /absolutePath/api/cron/cronjob.js >> /absolutePath/api/cron/logs/cronjob_stdout.log 2>> /absolutePath/api/cron/logs/cronjob_stderr.log```
        - End of day (at 11:17pm):
            * ```17 23 * * * /usr/local/bin/node /absolutePath/api/cron/cronjob_stats.js dateStats >> /absolutePath/api/cron/logs/cronjob_stats_stdout.log 2>> /absolutePath/api/cron/logs/cronjob_stats_stderr.log```
    - ```>``` - overwrite
    - ```>>``` - append
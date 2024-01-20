import moment from 'moment';
import fs from 'fs';

const logMiddleware = (req, res, next) => {
    const fileName = `logs/log_${moment().format("Y_M_D")}.txt`;

    let content = '';
    content += `Time: ${new Date().toISOString()}\n`;
    content += `Method: ${req.method}\n`;
    content += `Route: ${req.url}\n`;

    let errorMessage = '';

    res.on('finish', () => {
        if (res.statusCode >= 400) {
            content += `Status Code: ${res.statusCode}\n\n`;
            content += `Error: ${errorMessage}\n\n`;

            fs.appendFile(fileName, content, err => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }
            });
        }
    });

    res.on('error', err => {
        errorMessage = err.message || 'Unknown error';
    });

    next();
};

export default logMiddleware;
import fs from 'fs/promises';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import os from 'os';


export const generateFile = async (format, content) => {
    const jobId = uuidv4();
    const filename = `${jobId}.${format}`;
    const filepath = path.join(os.tmpdir(), filename);

    await fs.writeFile(filepath, content);

    return filepath;
};

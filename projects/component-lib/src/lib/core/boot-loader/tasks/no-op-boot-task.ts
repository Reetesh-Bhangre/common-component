import { BaseBootloaderTask } from './base-bootloader-task';

export class NoOpBootloaderTask extends BaseBootloaderTask {
    public constructor(id?: string) {
        super(id ? id : 'No-Op-Bootloader-Task');
    }

    public execute(): Promise<any> {
        return Promise.resolve(true);
    }
}

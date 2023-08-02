import { Optional } from '@angular/core';

export abstract class BaseBootloaderTask {
  //
  //  Implement the abstract execute method to create an instance
  //  of BaseBootloaderTask for use by the bootloader:
  //
  //      execute(data: any[]): Promise<any>
  //
  //  This method should return a promise that is resolved or
  //  rejected when the task for this handler is complete.
  //
  //  The rest of this class implements the following flow:
  //
  //      * onCompleted promise is created as class property, will
  //          be resolved or rejected based on the dependencies of
  //          this task and this execute method.
  //      * The start method is called, optionally passing the BootloaderHandlers
  //          this handler depends on. The 'onCompleted' promises from
  //          any passed dependencies are collected.
  //          (if no dependencies are passed, execute is called
  //          immediately after 'start').
  //      * Once the promises from all of the dependencies passed
  //          to 'start' have resolved, execute is called (if any
  //          promises from a dependency are rejected then execute
  //          method is not called and the promise from
  //          this task rejects as well)
  //      * Once the promise from execute is resolved, then the
  //          promise from this task is resolved.
  //
  protected abstract execute(): Promise<any>;

  /* tslint:disable:member-ordering */

  //  Methods that will resolve or reject the onCompleted Promise above
  //  once the execute method of this class is called, and the returned
  //  promise is resolved or rejected.
  private resolve!: (value?: unknown) => void;
  private reject!: (reason?: unknown) => void;

  //
  //
  //  Public interface for BaseBootloaderTask
  //
  //

  public constructor(@Optional() id: string) {
    this.id = id || 'BaseBootloaderTask';
  }

  public id: string;

  //  A promise that can be listened to by consumers, which will
  //  resolve or reject when this task has completed. If one of
  //  the dependencies of this class are rejected, then this
  //  promise will be rejected without execute being called.
  public onCompleted: Promise<any> = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  //
  //
  //  Methods that implement the default functionality for BaseBootloaderTask
  //
  //  Only override these methods if special handling is needed.
  //

  //  References to this tasks dependencies, can be used in execute method.
  private dependencies: BaseBootloaderTask[] | undefined;

  //  Add a requirement task that this task depends.
  public dependsOn(dependencies?: BaseBootloaderTask[]) {
    this.dependencies = dependencies;
  }

  //  Return the number of requirements this task currently depends on.
  public getRequirementCount(): number {
    return this.dependencies ? this.dependencies.length : 0;
  }

  //  Called once the managing bootloader service has created and passed all dependencies
  //  to all of the configured bootloader tasks using the dependsOn method.
  //  Returns the onCompleted promise indicating whether the task has completed or failed.
  public start(): Promise<any> {
    const promises: Promise<any>[] = this.dependencies
      ? this.dependencies.map(dep => dep.onCompleted)
      : [];

    //  Once all of the promises are complete, the execute() method of this
    //  task is called and when the promise is resolved/rejected, the
    //  onCompleted promise for this task is resolved/rejected
    Promise.all(promises)
      .then(() => {
        console.log(
          ` > Bootloader task '${this.id}' starting after ${promises.length} dependencies completed.`
        );
        return this.execute();
      })
      .then(this.resolve.bind(this))
      .catch(this.reject.bind(this));

    return this.onCompleted;
  }
}
